/**
 * User Model (In-Memory Data Access & Entity Layer)
 * 
 * Provides an in-memory data store simulating a database table without requiring
 * an external database connection. Implements full CRUD (Create, Read, Update, Delete)
 * operations, schema validation, query filtering, pagination, and data consistency safeguards.
 */

// Initial seed data for development and testing
const initialSeedUsers = [
  {
    id: 1,
    name: 'Sample Alumni',
    email: 'alumni@example.com',
    role: 'alumni',
    department: 'Computer Science',
    graduationYear: 2023,
    createdAt: new Date().toISOString()
  }
];

// In-memory data store array (mutable state)
let users = JSON.parse(JSON.stringify(initialSeedUsers));

class UserModel {
  /**
   * Allowed user roles within the platform
   */
  static ROLES = ['alumni', 'student', 'faculty', 'admin'];

  // ==========================================
  // CREATE (C)
  // ==========================================

  /**
   * Create and persist a new user record in memory.
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
   * @returns {Object} Newly created and persisted user object
   * @throws {Error} If validation fails or email already exists
   */
  static create(userData) {
    const validation = this.validate(userData, false);
    if (!validation.isValid) {
      const error = new Error(validation.errors.join('; '));
      error.statusCode = 400;
      throw error;
    }

    const cleanEmail = userData.email.trim().toLowerCase();
    if (this.findByEmail(cleanEmail)) {
      const error = new Error('A user with this email already exists.');
      error.statusCode = 409;
      throw error;
    }

    // Auto-generate incrementing ID based on existing records
    const nextId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;

    const newUser = {
      id: nextId,
      name: userData.name.trim(),
      email: cleanEmail,
      role: userData.role && this.ROLES.includes(userData.role.trim().toLowerCase())
        ? userData.role.trim().toLowerCase()
        : 'alumni',
      department: userData.department ? userData.department.trim() : null,
      graduationYear: userData.graduationYear ? Number(userData.graduationYear) : null,
      phone: userData.phone ? userData.phone.trim() : null,
      company: userData.company ? userData.company.trim() : null,
      jobTitle: userData.jobTitle ? userData.jobTitle.trim() : null,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    return { ...newUser };
  }

  // ==========================================
  // READ (R)
  // ==========================================

  /**
   * Retrieve all user records with optional filtering, search, and pagination.
   * 
   * @param {Object} [filter={}] - Query options
   * @param {string} [filter.role] - Filter by role
   * @param {string} [filter.department] - Filter by department
   * @param {number|string} [filter.graduationYear] - Filter by graduation year
   * @param {string} [filter.search] - Search substring in name or email
   * @param {string} [filter.q] - Alternative search query parameter
   * @param {number|string} [filter.limit] - Limit maximum returned records
   * @param {number|string} [filter.page=1] - Page number for pagination
   * @returns {Array<Object>} Array of matching user records
   */
  static findAll(filter = {}) {
    let result = [...users];

    // Filter by role
    if (filter.role) {
      const targetRole = String(filter.role).trim().toLowerCase();
      result = result.filter(u => u.role && u.role.toLowerCase() === targetRole);
    }

    // Filter by department
    if (filter.department) {
      const targetDept = String(filter.department).trim().toLowerCase();
      result = result.filter(u => u.department && u.department.toLowerCase().includes(targetDept));
    }

    // Filter by graduation year
    if (filter.graduationYear) {
      const targetYear = Number(filter.graduationYear);
      if (!isNaN(targetYear)) {
        result = result.filter(u => u.graduationYear === targetYear);
      }
    }

    // Free text search in name or email
    const searchQuery = filter.search || filter.q;
    if (searchQuery) {
      const queryLower = String(searchQuery).trim().toLowerCase();
      result = result.filter(u =>
        (u.name && u.name.toLowerCase().includes(queryLower)) ||
        (u.email && u.email.toLowerCase().includes(queryLower)) ||
        (u.department && u.department.toLowerCase().includes(queryLower)) ||
        (u.company && u.company.toLowerCase().includes(queryLower))
      );
    }

    // Pagination: page and limit
    if (filter.limit) {
      const limit = Math.max(1, parseInt(filter.limit, 10));
      const page = filter.page ? Math.max(1, parseInt(filter.page, 10)) : 1;
      const startIndex = (page - 1) * limit;
      result = result.slice(startIndex, startIndex + limit);
    }

    return result.map(u => ({ ...u }));
  }

  /**
   * Find a single user by numeric ID.
   * 
   * @param {number|string} id - User ID
   * @returns {Object|null} Matching user record or null if not found
   */
  static findById(id) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) return null;

    const user = users.find(u => u.id === numericId);
    return user ? { ...user } : null;
  }

  /**
   * Find a single user by email address (case-insensitive).
   * 
   * @param {string} email - Email address
   * @returns {Object|null} Matching user record or null if not found
   */
  static findByEmail(email) {
    if (!email || typeof email !== 'string') return null;
    const cleanEmail = email.trim().toLowerCase();
    const user = users.find(u => u.email.toLowerCase() === cleanEmail);
    return user ? { ...user } : null;
  }

  /**
   * Check if a user with the specified ID exists in the store.
   * 
   * @param {number|string} id - User ID
   * @returns {boolean} True if user exists, false otherwise
   */
  static exists(id) {
    return this.findById(id) !== null;
  }

  /**
   * Return the total count of user records matching optional filter criteria.
   * 
   * @param {Object} [filter={}] - Filter criteria
   * @returns {number}
   */
  static count(filter = {}) {
    return this.findAll(filter).length;
  }

  // ==========================================
  // UPDATE (U)
  // ==========================================

  /**
   * Completely replace/update an existing user record (PUT semantics).
   * Requires mandatory fields (name, email).
   * 
   * @param {number|string} id - User ID
   * @param {Object} updateData - Replacement user data
   * @returns {Object|null} Updated user record or null if not found
   * @throws {Error} If validation fails or email conflicts with another user
   */
  static update(id, updateData) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) return null;

    const userIndex = users.findIndex(u => u.id === numericId);
    if (userIndex === -1) return null;

    const validation = this.validate(updateData, false);
    if (!validation.isValid) {
      const error = new Error(validation.errors.join('; '));
      error.statusCode = 400;
      throw error;
    }

    const cleanEmail = updateData.email.trim().toLowerCase();
    const emailOwner = this.findByEmail(cleanEmail);
    if (emailOwner && emailOwner.id !== numericId) {
      const error = new Error('Email address is already in use by another user.');
      error.statusCode = 409;
      throw error;
    }

    users[userIndex] = {
      ...users[userIndex],
      name: updateData.name.trim(),
      email: cleanEmail,
      role: updateData.role && this.ROLES.includes(updateData.role.trim().toLowerCase())
        ? updateData.role.trim().toLowerCase()
        : 'alumni',
      department: updateData.department ? updateData.department.trim() : null,
      graduationYear: updateData.graduationYear ? Number(updateData.graduationYear) : null,
      phone: updateData.phone ? updateData.phone.trim() : null,
      company: updateData.company ? updateData.company.trim() : null,
      jobTitle: updateData.jobTitle ? updateData.jobTitle.trim() : null,
      updatedAt: new Date().toISOString()
    };

    return { ...users[userIndex] };
  }

  /**
   * Partially update an existing user record (PATCH semantics).
   * Only modifies the specific fields provided in patchData.
   * 
   * @param {number|string} id - User ID
   * @param {Object} patchData - Partial attributes to update
   * @returns {Object|null} Updated user record or null if not found
   * @throws {Error} If validation fails or email conflicts with another user
   */
  static patch(id, patchData) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) return null;

    const userIndex = users.findIndex(u => u.id === numericId);
    if (userIndex === -1) return null;

    const validation = this.validate(patchData, true);
    if (!validation.isValid) {
      const error = new Error(validation.errors.join('; '));
      error.statusCode = 400;
      throw error;
    }

    if (patchData.email) {
      const cleanEmail = patchData.email.trim().toLowerCase();
      const emailOwner = this.findByEmail(cleanEmail);
      if (emailOwner && emailOwner.id !== numericId) {
        const error = new Error('Email address is already in use by another user.');
        error.statusCode = 409;
        throw error;
      }
      users[userIndex].email = cleanEmail;
    }

    if (patchData.name !== undefined) {
      users[userIndex].name = patchData.name.trim();
    }
    if (patchData.role !== undefined) {
      const cleanRole = patchData.role.trim().toLowerCase();
      if (this.ROLES.includes(cleanRole)) {
        users[userIndex].role = cleanRole;
      }
    }
    if (patchData.department !== undefined) {
      users[userIndex].department = patchData.department ? patchData.department.trim() : null;
    }
    if (patchData.graduationYear !== undefined) {
      users[userIndex].graduationYear = patchData.graduationYear ? Number(patchData.graduationYear) : null;
    }
    if (patchData.phone !== undefined) {
      users[userIndex].phone = patchData.phone ? patchData.phone.trim() : null;
    }
    if (patchData.company !== undefined) {
      users[userIndex].company = patchData.company ? patchData.company.trim() : null;
    }
    if (patchData.jobTitle !== undefined) {
      users[userIndex].jobTitle = patchData.jobTitle ? patchData.jobTitle.trim() : null;
    }

    users[userIndex].updatedAt = new Date().toISOString();

    return { ...users[userIndex] };
  }

  // ==========================================
  // DELETE (D)
  // ==========================================

  /**
   * Delete an existing user record by numeric ID.
   * 
   * @param {number|string} id - User ID
   * @returns {Object|null} The deleted user record, or null if not found
   */
  static delete(id) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) return null;

    const userIndex = users.findIndex(u => u.id === numericId);
    if (userIndex === -1) return null;

    const [deletedUser] = users.splice(userIndex, 1);
    return { ...deletedUser };
  }

  /**
   * Delete a user by email address.
   * 
   * @param {string} email - Email address
   * @returns {Object|null} The deleted user record, or null if not found
   */
  static deleteByEmail(email) {
    const user = this.findByEmail(email);
    if (!user) return null;
    return this.delete(user.id);
  }

  /**
   * Reset in-memory storage to initial seed state (useful for tests or teardown).
   * 
   * @returns {void}
   */
  static reset() {
    users = JSON.parse(JSON.stringify(initialSeedUsers));
  }

  // ==========================================
  // SCHEMA VALIDATION & UTILITIES
  // ==========================================

  /**
   * Validate user input fields.
   * 
   * @param {Object} data - Attributes to validate
   * @param {boolean} [isPartial=false] - Whether partial attributes are acceptable (PATCH)
   * @returns {{isValid: boolean, errors: Array<string>}} Validation result
   */
  static validate(data, isPartial = false) {
    const errors = [];

    if (!data || typeof data !== 'object') {
      return { isValid: false, errors: ['Request payload must be a non-empty object.'] };
    }

    // Required fields check (for non-partial requests: create, update)
    if (!isPartial) {
      if (!data.name || typeof data.name !== 'string' || !data.name.trim()) {
        errors.push('Field "name" is required and cannot be empty.');
      }
      if (!data.email || typeof data.email !== 'string' || !data.email.trim()) {
        errors.push('Field "email" is required and cannot be empty.');
      }
    }

    // Format check if email is provided
    if (data.email !== undefined) {
      if (typeof data.email !== 'string' || !this.isValidEmail(data.email)) {
        errors.push('Field "email" must be a valid email address (e.g. user@example.com).');
      }
    }

    // Role check if provided
    if (data.role !== undefined) {
      const cleanRole = String(data.role).trim().toLowerCase();
      if (!this.ROLES.includes(cleanRole)) {
        errors.push(`Field "role" must be one of: ${this.ROLES.join(', ')}.`);
      }
    }

    // Graduation year check if provided
    if (data.graduationYear !== undefined && data.graduationYear !== null && data.graduationYear !== '') {
      const year = Number(data.graduationYear);
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
   * Simple RFC-compliant email regex validator.
   * 
   * @param {string} email
   * @returns {boolean}
   */
  static isValidEmail(email) {
    if (!email || typeof email !== 'string') return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  }
}

module.exports = UserModel;
