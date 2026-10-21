/**
 * Announcement Model (PostgreSQL Persistence & Entity Layer)
 * 
 * Provides relational database access and persistence for the Announcement entity
 * backed by PostgreSQL via the connection pool in src/config/db.js.
 * Implements complete CRUD (Create, Read, Update, Delete) operations,
 * schema validation, query filtering, pagination, and data consistency safeguards.
 */

const { query } = require('../config/db');

class AnnouncementModel {
  /**
   * Allowed announcement categories
   */
  static CATEGORIES = ['General', 'Event', 'Career', 'Academic', 'News', 'Urgent'];

  // ==========================================
  // READ (R)
  // ==========================================

  /**
   * Retrieve all announcements from PostgreSQL with optional filtering, search, and pagination.
   * 
   * @param {Object} [filter={}] - Query options
   * @param {string} [filter.category] - Filter by category (e.g. 'Event', 'Career')
   * @param {string} [filter.search] - Search substring in title, content, or author
   * @param {string} [filter.q] - Alternative search parameter
   * @param {string} [filter.author] - Filter by author
   * @param {number|string} [filter.limit] - Limit maximum returned records
   * @param {number|string} [filter.page=1] - Page number for pagination
   * @returns {Promise<Array<Object>>} Matching announcement records
   */
  static async getAll(filter = {}) {
    let sql = `
      SELECT id, title, content, author, author_id AS "authorId", category, 
             created_at AS "createdAt", 
             updated_at AS "updatedAt"
      FROM announcements
    `;

    const conditions = [];
    const params = [];

    // Filter by category
    if (filter.category) {
      params.push(String(filter.category).trim().toLowerCase());
      conditions.push(`LOWER(category) = $${params.length}`);
    }

    // Filter by author
    if (filter.author) {
      params.push(`%${String(filter.author).trim().toLowerCase()}%`);
      conditions.push(`LOWER(author) LIKE $${params.length}`);
    }

    // Filter by authorId
    if (filter.authorId) {
      const authorId = parseInt(filter.authorId, 10);
      if (!isNaN(authorId)) {
        params.push(authorId);
        conditions.push(`author_id = $${params.length}`);
      }
    }

    // Search in title, content, or author
    const searchQuery = filter.search || filter.q;
    if (searchQuery) {
      params.push(`%${String(searchQuery).trim().toLowerCase()}%`);
      const pIdx = params.length;
      conditions.push(`(LOWER(title) LIKE $${pIdx} OR LOWER(content) LIKE $${pIdx} OR LOWER(COALESCE(author, '')) LIKE $${pIdx})`);
    }

    if (conditions.length > 0) {
      sql += ` WHERE ${conditions.join(' AND ')}`;
    }

    // Default sort: newest first (by id descending)
    sql += ` ORDER BY id DESC`;

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
   * Find an announcement by its numeric ID.
   * 
   * @param {number|string} id - Announcement ID
   * @returns {Promise<Object|null>} Matching announcement or null if not found
   */
  static async getById(id) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) return null;

    const sql = `
      SELECT id, title, content, author, author_id AS "authorId", category, 
             created_at AS "createdAt", 
             updated_at AS "updatedAt"
      FROM announcements
      WHERE id = $1
    `;

    const res = await query(sql, [numericId]);
    return res.rows[0] || null;
  }

  /**
   * Retrieve an announcement joined with its author User details (belongsTo relation).
   * 
   * @param {number|string} id - Announcement ID
   * @returns {Promise<Object|null>} Announcement with nested authorUser object
   */
  static async getByIdWithAuthor(id) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) return null;

    const sql = `
      SELECT a.id, a.title, a.content, a.author, a.author_id AS "authorId", a.category,
             a.created_at AS "createdAt", a.updated_at AS "updatedAt",
             u.id AS "u_id", u.name AS "u_name", u.email AS "u_email",
             u.role AS "u_role", u.department AS "u_department"
      FROM announcements a
      LEFT JOIN users u ON a.author_id = u.id
      WHERE a.id = $1
    `;

    const res = await query(sql, [numericId]);
    if (!res.rows[0]) return null;

    const row = res.rows[0];
    const { u_id, u_name, u_email, u_role, u_department, ...announcement } = row;

    announcement.authorUser = u_id ? {
      id: u_id,
      name: u_name,
      email: u_email,
      role: u_role,
      department: u_department
    } : null;

    return announcement;
  }

  /**
   * Retrieve all announcements joined with author User details.
   * 
   * @param {Object} [filter={}] - Query options
   * @returns {Promise<Array<Object>>} Announcements with nested authorUser
   */
  static async getAllWithAuthor(filter = {}) {
    let sql = `
      SELECT a.id, a.title, a.content, a.author, a.author_id AS "authorId", a.category,
             a.created_at AS "createdAt", a.updated_at AS "updatedAt",
             u.id AS "u_id", u.name AS "u_name", u.email AS "u_email",
             u.role AS "u_role", u.department AS "u_department"
      FROM announcements a
      LEFT JOIN users u ON a.author_id = u.id
    `;

    const conditions = [];
    const params = [];

    if (filter.category) {
      params.push(String(filter.category).trim().toLowerCase());
      conditions.push(`LOWER(a.category) = $${params.length}`);
    }

    if (filter.authorId) {
      const authorId = parseInt(filter.authorId, 10);
      if (!isNaN(authorId)) {
        params.push(authorId);
        conditions.push(`a.author_id = $${params.length}`);
      }
    }

    const searchQuery = filter.search || filter.q;
    if (searchQuery) {
      params.push(`%${String(searchQuery).trim().toLowerCase()}%`);
      const pIdx = params.length;
      conditions.push(`(LOWER(a.title) LIKE $${pIdx} OR LOWER(a.content) LIKE $${pIdx} OR LOWER(COALESCE(a.author, '')) LIKE $${pIdx})`);
    }

    if (conditions.length > 0) {
      sql += ` WHERE ${conditions.join(' AND ')}`;
    }

    sql += ` ORDER BY a.id DESC`;

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
    return res.rows.map(row => {
      const { u_id, u_name, u_email, u_role, u_department, ...announcement } = row;
      announcement.authorUser = u_id ? {
        id: u_id,
        name: u_name,
        email: u_email,
        role: u_role,
        department: u_department
      } : null;
      return announcement;
    });
  }

  /**
   * Fetch the User entity who authored the specified announcement.
   * 
   * @param {number|string} announcementId - Announcement ID
   * @returns {Promise<Object|null>} Associated User object or null
   */
  static async getAuthor(announcementId) {
    const item = await this.getById(announcementId);
    if (!item || !item.authorId) return null;

    const sql = `
      SELECT id, name, email, role, department, 
             graduation_year AS "graduationYear",
             created_at AS "createdAt", updated_at AS "updatedAt"
      FROM users
      WHERE id = $1
    `;
    const res = await query(sql, [item.authorId]);
    return res.rows[0] || null;
  }

  // ==========================================
  // CREATE (C)
  // ==========================================

  /**
   * Create and persist a new announcement in PostgreSQL.
   * 
   * @param {Object} data - Announcement attributes
   * @param {string} data.title - Title (required)
   * @param {string} data.content - Body content (required)
   * @param {string} [data.author='Alumni Relations Office'] - Author / publishing department
   * @param {string} [data.category='General'] - Category
   * @returns {Promise<Object>} Newly created announcement record
   * @throws {Error} If validation fails
   */
  static async create(data) {
    const validation = this.validate(data, false);
    if (!validation.isValid) {
      const error = new Error(validation.errors.join('; '));
      error.statusCode = 400;
      throw error;
    }

    const cleanCategory = data.category && this.CATEGORIES.map(c => c.toLowerCase()).includes(data.category.trim().toLowerCase())
      ? this.CATEGORIES.find(c => c.toLowerCase() === data.category.trim().toLowerCase())
      : 'General';

    const cleanAuthorId = data.authorId ? parseInt(data.authorId, 10) : null;

    const sql = `
      INSERT INTO announcements (title, content, author, author_id, category, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
      RETURNING id, title, content, author, author_id AS "authorId", category, 
                created_at AS "createdAt", 
                updated_at AS "updatedAt"
    `;

    const values = [
      data.title.trim(),
      data.content.trim(),
      data.author && data.author.trim() ? data.author.trim() : 'Alumni Relations Office',
      cleanAuthorId && !isNaN(cleanAuthorId) ? cleanAuthorId : null,
      cleanCategory
    ];

    const res = await query(sql, values);
    return res.rows[0];
  }

  // ==========================================
  // UPDATE (U)
  // ==========================================

  /**
   * Update an existing announcement in PostgreSQL by ID.
   * 
   * @param {number|string} id - Announcement ID
   * @param {Object} data - Updated attributes
   * @returns {Promise<Object|null>} Updated announcement or null if not found
   * @throws {Error} If validation fails
   */
  static async update(id, data) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) return null;

    const existing = await this.getById(numericId);
    if (!existing) return null;

    const validation = this.validate(data, true);
    if (!validation.isValid) {
      const error = new Error(validation.errors.join('; '));
      error.statusCode = 400;
      throw error;
    }

    let cleanCategory = existing.category;
    if (data.category && this.CATEGORIES.map(c => c.toLowerCase()).includes(data.category.trim().toLowerCase())) {
      cleanCategory = this.CATEGORIES.find(c => c.toLowerCase() === data.category.trim().toLowerCase());
    }

    const cleanAuthorId = data.authorId !== undefined
      ? (data.authorId ? parseInt(data.authorId, 10) : null)
      : existing.authorId;

    const sql = `
      UPDATE announcements
      SET title = $1,
          content = $2,
          author = $3,
          author_id = $4,
          category = $5,
          updated_at = NOW()
      WHERE id = $6
      RETURNING id, title, content, author, author_id AS "authorId", category, 
                created_at AS "createdAt", 
                updated_at AS "updatedAt"
    `;

    const values = [
      data.title !== undefined && data.title.trim() ? data.title.trim() : existing.title,
      data.content !== undefined && data.content.trim() ? data.content.trim() : existing.content,
      data.author !== undefined && data.author.trim() ? data.author.trim() : existing.author,
      cleanAuthorId,
      cleanCategory,
      numericId
    ];

    const res = await query(sql, values);
    return res.rows[0] || null;
  }

  // ==========================================
  // DELETE (D)
  // ==========================================

  /**
   * Delete an existing announcement from PostgreSQL by ID.
   * 
   * @param {number|string} id - Announcement ID
   * @returns {Promise<Object|null>} Deleted announcement or null if not found
   */
  static async delete(id) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) return null;

    const sql = `
      DELETE FROM announcements
      WHERE id = $1
      RETURNING id, title, content, author, category, 
                created_at AS "createdAt", 
                updated_at AS "updatedAt"
    `;

    const res = await query(sql, [numericId]);
    return res.rows[0] || null;
  }

  // ==========================================
  // UTILITIES & VALIDATION
  // ==========================================

  /**
   * Validate announcement input fields.
   * 
   * @param {Object} data - Attributes to validate
   * @param {boolean} [isPartial=false] - Whether partial fields are allowed (update)
   * @returns {{isValid: boolean, errors: Array<string>}}
   */
  static validate(data, isPartial = false) {
    const errors = [];

    if (!data || typeof data !== 'object') {
      return { isValid: false, errors: ['Request body must be a valid JSON object.'] };
    }

    if (!isPartial) {
      if (!data.title || typeof data.title !== 'string' || !data.title.trim()) {
        errors.push('Field "title" is required and cannot be empty.');
      }
      if (!data.content || typeof data.content !== 'string' || !data.content.trim()) {
        errors.push('Field "content" is required and cannot be empty.');
      }
    } else {
      if (data.title !== undefined && (typeof data.title !== 'string' || !data.title.trim())) {
        errors.push('Field "title" cannot be empty.');
      }
      if (data.content !== undefined && (typeof data.content !== 'string' || !data.content.trim())) {
        errors.push('Field "content" cannot be empty.');
      }
    }

    if (data.category) {
      const cleanCat = String(data.category).trim().toLowerCase();
      const valid = this.CATEGORIES.some(c => c.toLowerCase() === cleanCat);
      if (!valid) {
        errors.push(`Field "category" must be one of: ${this.CATEGORIES.join(', ')}.`);
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Check if an announcement with the specified ID exists in PostgreSQL.
   * 
   * @param {number|string} id - Announcement ID
   * @returns {Promise<boolean>}
   */
  static async exists(id) {
    const announcement = await this.getById(id);
    return announcement !== null;
  }

  /**
   * Return the total count of announcements matching optional filter criteria.
   * 
   * @param {Object} [filter={}] - Filter criteria
   * @returns {Promise<number>}
   */
  static async count(filter = {}) {
    const items = await this.getAll(filter);
    return items.length;
  }
}

// Aliases for compatibility
AnnouncementModel.findAll = AnnouncementModel.getAll;
AnnouncementModel.findById = AnnouncementModel.getById;
AnnouncementModel.remove = AnnouncementModel.delete;

module.exports = AnnouncementModel;
