/**
 * User Model (PostgreSQL Persistence & Entity Layer)
 * 
 * Provides relational database access and persistence for the User entity
 * backed by PostgreSQL via the connection pool in src/config/db.js.
 * Implements complete CRUD (Create, Read, Update, Delete) operations,
 * schema validation, query filtering, pagination, and data consistency safeguards.
 */

const { query } = require('../config/db');

class UserModel {
  /**
   * Allowed user roles within the platform
   */
  static ROLES = ['alumni', 'student', 'faculty', 'teacher', 'admin'];

  // ==========================================
  // CREATE (C)
  // ==========================================

  /**
   * Create and persist a new user record in PostgreSQL.
   * 
   * @param {Object} userData - User record attributes
   * @param {string} userData.name - Full name of the user (required)
   * @param {string} userData.email - Unique email address (required)
   * @param {string} [userData.role='alumni'] - User role (alumni, student, faculty, admin)
   * @param {string} [userData.department] - Academic department
   * @param {number} [userData.graduationYear] - Year of graduation
   * @param {string} [userData.phone] - Contact phone number
   * @param {string} [userData.company] - Current employer
   * @param {string} [userData.jobTitle] - Professional title
   * @returns {Promise<Object>} Newly created user record
   * @throws {Error} If validation fails or email already exists
   */
  static async create(userData) {
    const validation = this.validate(userData, false);
    if (!validation.isValid) {
      const error = new Error(validation.errors.join('; '));
      error.statusCode = 400;
      throw error;
    }

    const cleanEmail = userData.email.trim().toLowerCase();
    const existing = await this.findByEmail(cleanEmail);
    if (existing) {
      const error = new Error('A user with this email already exists.');
      error.statusCode = 409;
      throw error;
    }

    const sql = `
      INSERT INTO users (name, email, role, department, graduation_year, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
      RETURNING id, name, email, role, department, 
                graduation_year AS "graduationYear", 
                created_at AS "createdAt", 
                updated_at AS "updatedAt"
    `;

    const values = [
      userData.name.trim(),
      cleanEmail,
      userData.role && this.ROLES.includes(userData.role.trim().toLowerCase())
        ? userData.role.trim().toLowerCase()
        : 'alumni',
      userData.department && userData.department.trim() ? userData.department.trim() : null,
      userData.graduationYear ? parseInt(userData.graduationYear, 10) : null
    ];

    const res = await query(sql, values);
    return res.rows[0];
  }

  // ==========================================
  // READ (R)
  // ==========================================

  /**
   * Retrieve all user records from PostgreSQL with optional filtering, search, and pagination.
   * 
   * @param {Object} [filter={}] - Query options
   * @param {string} [filter.role] - Filter by role (alumni, student, faculty, admin)
   * @param {string} [filter.department] - Filter by department
   * @param {string} [filter.search] - Case-insensitive substring search in name, email, department
   * @param {string} [filter.q] - Alternative search query parameter
   * @param {number|string} [filter.limit] - Limit maximum returned records
   * @param {number|string} [filter.page=1] - Page number for pagination
   * @returns {Promise<Array<Object>>} Matching user records
   */
  static async findAll(filter = {}) {
    let sql = `
      SELECT id, name, email, role, department, 
             graduation_year AS "graduationYear", 
             created_at AS "createdAt", 
             updated_at AS "updatedAt"
      FROM users
    `;

    const conditions = [];
    const params = [];

    // Filter by role
    if (filter.role) {
      params.push(String(filter.role).trim().toLowerCase());
      conditions.push(`LOWER(role) = $${params.length}`);
    }

    // Filter by department
    if (filter.department) {
      params.push(`%${String(filter.department).trim().toLowerCase()}%`);
      conditions.push(`LOWER(department) LIKE $${params.length}`);
    }

    // Free-text search
    const searchQuery = filter.search || filter.q;
    if (searchQuery) {
      params.push(`%${String(searchQuery).trim().toLowerCase()}%`);
      const pIdx = params.length;
      conditions.push(`(LOWER(name) LIKE $${pIdx} OR LOWER(email) LIKE $${pIdx} OR LOWER(COALESCE(department, '')) LIKE $${pIdx})`);
    }

    if (conditions.length > 0) {
      sql += ` WHERE ${conditions.join(' AND ')}`;
    }

    sql += ` ORDER BY id ASC`;

    // Pagination
    if (filter.limit) {
      const limit = Math.max(1, parseInt(filter.limit, 10));
      const page = filter.page ? Math.max(1, parseInt(filter.page, 10)) : 1;
      const offset = (page - 1) * limit;

      params.push(limit);
      sql += ` LIMIT $${params.length}`;

      params.push(offset);
      sql += ` OFFSET $${params.length}`;
    }

    const res = await query(sql, params);
    return res.rows;
  }

  /**
   * Find a single user record by its numeric primary key ID.
   * 
   * @param {number|string} id - User ID
   * @returns {Promise<Object|null>} Matching user record or null if not found
   */
  static async findById(id) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) return null;

    const sql = `
      SELECT id, name, email, role, department, 
             graduation_year AS "graduationYear", 
             created_at AS "createdAt", 
             updated_at AS "updatedAt"
      FROM users
      WHERE id = $1
    `;

    const res = await query(sql, [numericId]);
    return res.rows[0] || null;
  }

  /**
   * Find a single user record by email address (case-insensitive).
   * 
   * @param {string} email - Email address
   * @returns {Promise<Object|null>} Matching user record or null if not found
   */
  static async findByEmail(email) {
    if (!email || typeof email !== 'string') return null;

    const sql = `
      SELECT id, name, email, role, department, 
             graduation_year AS "graduationYear", 
             created_at AS "createdAt", 
             updated_at AS "updatedAt"
      FROM users
      WHERE LOWER(email) = LOWER($1)
    `;

    const res = await query(sql, [email.trim()]);
    return res.rows[0] || null;
  }

  // ==========================================
  // UPDATE (U)
  // ==========================================

  /**
   * Replace all fields of an existing user record (PUT semantics).
   * 
   * @param {number|string} id - User ID
   * @param {Object} userData - Complete updated user payload
   * @returns {Promise<Object|null>} Updated user record or null if not found
   * @throws {Error} If validation fails or email conflicts with another user
   */
  static async update(id, userData) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) return null;

    const existing = await this.findById(numericId);
    if (!existing) return null;

    const validation = this.validate(userData, false);
    if (!validation.isValid) {
      const error = new Error(validation.errors.join('; '));
      error.statusCode = 400;
      throw error;
    }

    const cleanEmail = userData.email.trim().toLowerCase();
    const emailConflict = await this.findByEmail(cleanEmail);
    if (emailConflict && emailConflict.id !== numericId) {
      const error = new Error('Another user is already registered with this email.');
      error.statusCode = 409;
      throw error;
    }

    const sql = `
      UPDATE users
      SET name = $1,
          email = $2,
          role = $3,
          department = $4,
          graduation_year = $5,
          updated_at = NOW()
      WHERE id = $6
      RETURNING id, name, email, role, department, 
                graduation_year AS "graduationYear", 
                created_at AS "createdAt", 
                updated_at AS "updatedAt"
    `;

    const values = [
      userData.name.trim(),
      cleanEmail,
      userData.role && this.ROLES.includes(userData.role.trim().toLowerCase())
        ? userData.role.trim().toLowerCase()
        : existing.role,
      userData.department !== undefined ? (userData.department ? userData.department.trim() : null) : existing.department,
      userData.graduationYear !== undefined ? (userData.graduationYear ? parseInt(userData.graduationYear, 10) : null) : existing.graduationYear,
      numericId
    ];

    const res = await query(sql, values);
    return res.rows[0] || null;
  }

  /**
   * Partially update specific fields of an existing user record (PATCH semantics).
   * 
   * @param {number|string} id - User ID
   * @param {Object} partialData - Subset of user fields to modify
   * @returns {Promise<Object|null>} Updated user record or null if not found
   * @throws {Error} If validation fails or email conflicts
   */
  static async patch(id, partialData) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) return null;

    const existing = await this.findById(numericId);
    if (!existing) return null;

    const validation = this.validate(partialData, true);
    if (!validation.isValid) {
      const error = new Error(validation.errors.join('; '));
      error.statusCode = 400;
      throw error;
    }

    if (partialData.email) {
      const cleanEmail = partialData.email.trim().toLowerCase();
      const emailConflict = await this.findByEmail(cleanEmail);
      if (emailConflict && emailConflict.id !== numericId) {
        const error = new Error('Another user is already registered with this email.');
        error.statusCode = 409;
        throw error;
      }
    }

    const updatedData = {
      name: partialData.name !== undefined ? partialData.name : existing.name,
      email: partialData.email !== undefined ? partialData.email : existing.email,
      role: partialData.role !== undefined ? partialData.role : existing.role,
      department: partialData.department !== undefined ? partialData.department : existing.department,
      graduationYear: partialData.graduationYear !== undefined ? partialData.graduationYear : existing.graduationYear
    };

    return this.update(numericId, updatedData);
  }

  // ==========================================
  // DELETE (D)
  // ==========================================

  /**
   * Delete a user record by numeric ID.
   * 
   * @param {number|string} id - User ID
   * @returns {Promise<Object|null>} Deleted user record or null if not found
   */
  static async delete(id) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) return null;

    const sql = `
      DELETE FROM users
      WHERE id = $1
      RETURNING id, name, email, role, department, 
                graduation_year AS "graduationYear", 
                created_at AS "createdAt", 
                updated_at AS "updatedAt"
    `;

    const res = await query(sql, [numericId]);
    return res.rows[0] || null;
  }

  /**
   * Delete a user record by email address.
   * 
   * @param {string} email - User email
   * @returns {Promise<Object|null>} Deleted user record or null if not found
   */
  static async deleteByEmail(email) {
    if (!email || typeof email !== 'string') return null;

    const sql = `
      DELETE FROM users
      WHERE LOWER(email) = LOWER($1)
      RETURNING id, name, email, role, department, 
                graduation_year AS "graduationYear", 
                created_at AS "createdAt", 
                updated_at AS "updatedAt"
    `;

    const res = await query(sql, [email.trim()]);
    return res.rows[0] || null;
  }

  // ==========================================
  // UTILITIES & VALIDATION
  // ==========================================

  /**
   * Validate user input fields against domain constraints.
   * 
   * @param {Object} data - User input payload
   * @param {boolean} [isPartial=false] - Whether partial fields are allowed (PATCH)
   * @returns {{isValid: boolean, errors: Array<string>}}
   */
  static validate(data, isPartial = false) {
    const errors = [];

    if (!data || typeof data !== 'object') {
      return { isValid: false, errors: ['Request body must be a valid JSON object or form data.'] };
    }

    // Name validation
    if (!isPartial || data.name !== undefined) {
      if (!data.name || typeof data.name !== 'string' || !data.name.trim()) {
        errors.push('Field "name" is required and cannot be empty.');
      }
    }

    // Email validation
    if (!isPartial || data.email !== undefined) {
      if (!data.email || typeof data.email !== 'string' || !data.email.trim()) {
        errors.push('Field "email" is required and cannot be empty.');
      } else if (!this.isValidEmail(data.email.trim())) {
        errors.push('Field "email" must be a structurally valid email address.');
      }
    }

    // Role validation
    if (data.role !== undefined) {
      const cleanRole = String(data.role).trim().toLowerCase();
      if (!this.ROLES.includes(cleanRole)) {
        errors.push(`Field "role" must be one of: ${this.ROLES.join(', ')}.`);
      }
    }

    // Graduation year validation
    if (data.graduationYear !== undefined && data.graduationYear !== null && data.graduationYear !== '') {
      const year = parseInt(data.graduationYear, 10);
      if (isNaN(year) || year < 1900 || year > 2100) {
        errors.push('Field "graduationYear" must be a valid 4-digit year between 1900 and 2100.');
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Check if an email matches standard RFC format
   * @param {string} email
   * @returns {boolean}
   */
  static isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Check if a user with the specified ID exists in the database.
   * 
   * @param {number|string} id - User ID
   * @returns {Promise<boolean>}
   */
  static async exists(id) {
    const user = await this.findById(id);
    return user !== null;
  }

  /**
   * Count users matching optional filter criteria.
   * 
   * @param {Object} [filter={}] - Filter criteria
   * @returns {Promise<number>}
   */
  static async count(filter = {}) {
    const users = await this.findAll(filter);
    return users.length;
  }
}

// Aliases for compatibility
UserModel.getAll = UserModel.findAll;
UserModel.getById = UserModel.findById;
UserModel.remove = UserModel.delete;

module.exports = UserModel;
