/**
 * Application Model (PostgreSQL Persistence & Entity Layer)
 * 
 * Provides relational database access and persistence for the Application entity
 * serving as the Many-to-Many action join table between Users (candidates)
 * and JobPostings (career opportunities).
 * 
 * References: docs/ddd.md (Section 3.4, 4, 6.4, 8)
 */

const { query } = require('../config/db');

class ApplicationModel {
  /**
   * Allowed application review and lifecycle statuses
   */
  static STATUSES = [
    'Submitted',
    'Under Review',
    'Shortlisted',
    'Interview Scheduled',
    'Accepted',
    'Rejected',
    'Withdrawn'
  ];

  // ==========================================
  // READ (R)
  // ==========================================

  /**
   * Retrieve all applications from PostgreSQL with optional filtering and pagination.
   * 
   * @param {Object} [filter={}] - Query options
   * @param {number|string} [filter.userId] - Filter by applicant user ID
   * @param {number|string} [filter.jobId] - Filter by job posting ID
   * @param {string} [filter.status] - Filter by application status
   * @param {number|string} [filter.limit] - Maximum returned records
   * @param {number|string} [filter.page=1] - Page number for pagination
   * @returns {Promise<Array<Object>>} Matching application records
   */
  static async getAll(filter = {}) {
    let sql = `
      SELECT id, 
             user_id AS "userId", 
             job_id AS "jobId", 
             status, 
             cover_letter AS "coverLetter", 
             resume_url AS "resumeUrl", 
             notes,
             applied_at AS "appliedAt", 
             created_at AS "createdAt", 
             updated_at AS "updatedAt"
      FROM applications
    `;

    const conditions = [];
    const params = [];

    // Filter by userId
    if (filter.userId) {
      const uId = parseInt(filter.userId, 10);
      if (!isNaN(uId)) {
        params.push(uId);
        conditions.push(`user_id = $${params.length}`);
      }
    }

    // Filter by jobId
    if (filter.jobId) {
      const jId = parseInt(filter.jobId, 10);
      if (!isNaN(jId)) {
        params.push(jId);
        conditions.push(`job_id = $${params.length}`);
      }
    }

    // Filter by status
    if (filter.status) {
      params.push(String(filter.status).trim().toLowerCase());
      conditions.push(`LOWER(status) = $${params.length}`);
    }

    if (conditions.length > 0) {
      sql += ` WHERE ${conditions.join(' AND ')}`;
    }

    sql += ` ORDER BY applied_at DESC, id DESC`;

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
   * Find an application by its primary key ID.
   * 
   * @param {number|string} id - Application ID
   * @returns {Promise<Object|null>} Matching application or null
   */
  static async getById(id) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) return null;

    const sql = `
      SELECT id, 
             user_id AS "userId", 
             job_id AS "jobId", 
             status, 
             cover_letter AS "coverLetter", 
             resume_url AS "resumeUrl", 
             notes,
             applied_at AS "appliedAt", 
             created_at AS "createdAt", 
             updated_at AS "updatedAt"
      FROM applications
      WHERE id = $1
    `;

    const res = await query(sql, [numericId]);
    return res.rows[0] || null;
  }

  /**
   * Check if a user has already submitted an application for a specific job posting.
   * 
   * @param {number|string} userId - Applicant User ID
   * @param {number|string} jobId - Job Posting ID
   * @returns {Promise<Object|null>} Existing application or null
   */
  static async getByUserAndJob(userId, jobId) {
    const uId = parseInt(userId, 10);
    const jId = parseInt(jobId, 10);
    if (isNaN(uId) || isNaN(jId)) return null;

    const sql = `
      SELECT id, 
             user_id AS "userId", 
             job_id AS "jobId", 
             status, 
             cover_letter AS "coverLetter", 
             resume_url AS "resumeUrl", 
             notes,
             applied_at AS "appliedAt", 
             created_at AS "createdAt", 
             updated_at AS "updatedAt"
      FROM applications
      WHERE user_id = $1 AND job_id = $2
    `;

    const res = await query(sql, [uId, jId]);
    return res.rows[0] || null;
  }

  /**
   * Retrieve an application joined with applicant User and JobPosting details.
   * 
   * @param {number|string} id - Application ID
   * @returns {Promise<Object|null>} Application with nested applicant and job objects
   */
  static async getByIdWithDetails(id) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) return null;

    const sql = `
      SELECT a.id, 
             a.user_id AS "userId", 
             a.job_id AS "jobId", 
             a.status, 
             a.cover_letter AS "coverLetter", 
             a.resume_url AS "resumeUrl", 
             a.notes,
             a.applied_at AS "appliedAt", 
             a.created_at AS "createdAt", 
             a.updated_at AS "updatedAt",
             u.id AS "u_id",
             u.name AS "u_name",
             u.email AS "u_email",
             u.role AS "u_role",
             u.department AS "u_department",
             u.graduation_year AS "u_graduationYear",
             jp.id AS "jp_id",
             jp.title AS "jp_title",
             jp.company AS "jp_company",
             jp.location AS "jp_location",
             jp.job_type AS "jp_jobType",
             jp.status AS "jp_status"
      FROM applications a
      JOIN users u ON a.user_id = u.id
      JOIN job_postings jp ON a.job_id = jp.id
      WHERE a.id = $1
    `;

    const res = await query(sql, [numericId]);
    if (!res.rows[0]) return null;

    const row = res.rows[0];
    return {
      id: row.id,
      userId: row.userId,
      jobId: row.jobId,
      status: row.status,
      coverLetter: row.coverLetter,
      resumeUrl: row.resumeUrl,
      notes: row.notes,
      appliedAt: row.appliedAt,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
      applicant: {
        id: row.u_id,
        name: row.u_name,
        email: row.u_email,
        role: row.u_role,
        department: row.u_department,
        graduationYear: row.u_graduationYear
      },
      job: {
        id: row.jp_id,
        title: row.jp_title,
        company: row.jp_company,
        location: row.jp_location,
        jobType: row.jp_jobType,
        status: row.jp_status
      }
    };
  }

  /**
   * Retrieve all applications with nested applicant and job posting objects.
   * 
   * @param {Object} [filter={}] - Query options
   * @returns {Promise<Array<Object>>}
   */
  static async getAllWithDetails(filter = {}) {
    let sql = `
      SELECT a.id, 
             a.user_id AS "userId", 
             a.job_id AS "jobId", 
             a.status, 
             a.cover_letter AS "coverLetter", 
             a.resume_url AS "resumeUrl", 
             a.notes,
             a.applied_at AS "appliedAt", 
             a.created_at AS "createdAt", 
             a.updated_at AS "updatedAt",
             u.id AS "u_id",
             u.name AS "u_name",
             u.email AS "u_email",
             u.role AS "u_role",
             u.department AS "u_department",
             u.graduation_year AS "u_graduationYear",
             jp.id AS "jp_id",
             jp.title AS "jp_title",
             jp.company AS "jp_company",
             jp.location AS "jp_location",
             jp.job_type AS "jp_jobType",
             jp.status AS "jp_status"
      FROM applications a
      JOIN users u ON a.user_id = u.id
      JOIN job_postings jp ON a.job_id = jp.id
    `;

    const conditions = [];
    const params = [];

    if (filter.userId) {
      const uId = parseInt(filter.userId, 10);
      if (!isNaN(uId)) {
        params.push(uId);
        conditions.push(`a.user_id = $${params.length}`);
      }
    }

    if (filter.jobId) {
      const jId = parseInt(filter.jobId, 10);
      if (!isNaN(jId)) {
        params.push(jId);
        conditions.push(`a.job_id = $${params.length}`);
      }
    }

    if (filter.status) {
      params.push(String(filter.status).trim().toLowerCase());
      conditions.push(`LOWER(a.status) = $${params.length}`);
    }

    if (conditions.length > 0) {
      sql += ` WHERE ${conditions.join(' AND ')}`;
    }

    sql += ` ORDER BY a.applied_at DESC, a.id DESC`;

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
    return res.rows.map(row => ({
      id: row.id,
      userId: row.userId,
      jobId: row.jobId,
      status: row.status,
      coverLetter: row.coverLetter,
      resumeUrl: row.resumeUrl,
      notes: row.notes,
      appliedAt: row.appliedAt,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
      applicant: {
        id: row.u_id,
        name: row.u_name,
        email: row.u_email,
        role: row.u_role,
        department: row.u_department,
        graduationYear: row.u_graduationYear
      },
      job: {
        id: row.jp_id,
        title: row.jp_title,
        company: row.jp_company,
        location: row.jp_location,
        jobType: row.jp_jobType,
        status: row.jp_status
      }
    }));
  }

  // ==========================================
  // CREATE (C)
  // ==========================================

  /**
   * Submit a new job application.
   * Enforces Many-to-Many uniqueness (user cannot apply twice to the same job).
   * 
   * @param {Object} data - Application attributes
   * @param {number|string} data.userId - Applicant User ID (required)
   * @param {number|string} data.jobId - Target Job Posting ID (required)
   * @param {string} [data.status='Submitted'] - Initial status
   * @param {string} [data.coverLetter] - Candidate cover note
   * @param {string} [data.resumeUrl] - URL to CV / resume
   * @param {string} [data.notes] - Reviewer notes
   * @returns {Promise<Object>} Newly created application record
   * @throws {Error} If validation fails or duplicate application exists
   */
  static async create(data) {
    const validation = this.validate(data, false);
    if (!validation.isValid) {
      const error = new Error(validation.errors.join('; '));
      error.statusCode = 400;
      throw error;
    }

    const userId = parseInt(data.userId, 10);
    const jobId = parseInt(data.jobId, 10);

    // Prevent duplicate applications
    const existing = await this.getByUserAndJob(userId, jobId);
    if (existing) {
      const error = new Error(`User #${userId} has already submitted an application for Job #${jobId}.`);
      error.statusCode = 409;
      throw error;
    }

    let cleanStatus = 'Submitted';
    if (data.status) {
      const match = this.STATUSES.find(s => s.toLowerCase() === String(data.status).trim().toLowerCase());
      if (match) cleanStatus = match;
    }

    const sql = `
      INSERT INTO applications (
        user_id, job_id, status, cover_letter, resume_url, notes,
        applied_at, created_at, updated_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW(), NOW())
      RETURNING id, 
                user_id AS "userId", 
                job_id AS "jobId", 
                status, 
                cover_letter AS "coverLetter", 
                resume_url AS "resumeUrl", 
                notes,
                applied_at AS "appliedAt", 
                created_at AS "createdAt", 
                updated_at AS "updatedAt"
    `;

    const values = [
      userId,
      jobId,
      cleanStatus,
      data.coverLetter && data.coverLetter.trim() ? data.coverLetter.trim() : null,
      data.resumeUrl && data.resumeUrl.trim() ? data.resumeUrl.trim() : null,
      data.notes && data.notes.trim() ? data.notes.trim() : null
    ];

    try {
      const res = await query(sql, values);
      return res.rows[0];
    } catch (dbErr) {
      if (dbErr.code === '23505') {
        const error = new Error(`User #${userId} has already applied to Job #${jobId}.`);
        error.statusCode = 409;
        throw error;
      }
      if (dbErr.code === '23503') {
        const error = new Error('Referenced user or job posting does not exist.');
        error.statusCode = 404;
        throw error;
      }
      throw dbErr;
    }
  }

  // ==========================================
  // UPDATE (U)
  // ==========================================

  /**
   * Update an existing application (e.g. status transition or notes).
   * 
   * @param {number|string} id - Application ID
   * @param {Object} data - Attributes to update
   * @returns {Promise<Object|null>} Updated application or null
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

    let cleanStatus = existing.status;
    if (data.status) {
      const match = this.STATUSES.find(s => s.toLowerCase() === String(data.status).trim().toLowerCase());
      if (match) cleanStatus = match;
    }

    const sql = `
      UPDATE applications
      SET status = $1,
          cover_letter = $2,
          resume_url = $3,
          notes = $4,
          updated_at = NOW()
      WHERE id = $5
      RETURNING id, 
                user_id AS "userId", 
                job_id AS "jobId", 
                status, 
                cover_letter AS "coverLetter", 
                resume_url AS "resumeUrl", 
                notes,
                applied_at AS "appliedAt", 
                created_at AS "createdAt", 
                updated_at AS "updatedAt"
    `;

    const values = [
      cleanStatus,
      data.coverLetter !== undefined ? (data.coverLetter ? data.coverLetter.trim() : null) : existing.coverLetter,
      data.resumeUrl !== undefined ? (data.resumeUrl ? data.resumeUrl.trim() : null) : existing.resumeUrl,
      data.notes !== undefined ? (data.notes ? data.notes.trim() : null) : existing.notes,
      numericId
    ];

    const res = await query(sql, values);
    return res.rows[0] || null;
  }

  /**
   * Partially update an existing application.
   */
  static async patch(id, partialData) {
    return this.update(id, partialData);
  }

  // ==========================================
  // DELETE (D)
  // ==========================================

  /**
   * Delete or withdraw an application by ID.
   * 
   * @param {number|string} id - Application ID
   * @returns {Promise<Object|null>}
   */
  static async delete(id) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) return null;

    const existing = await this.getById(numericId);
    if (!existing) return null;

    const sql = `
      DELETE FROM applications
      WHERE id = $1
      RETURNING id, user_id AS "userId", job_id AS "jobId", status
    `;

    const res = await query(sql, [numericId]);
    return res.rows[0] || null;
  }

  // ==========================================
  // UTILITIES & VALIDATION
  // ==========================================

  /**
   * Check whether an application exists by ID.
   * 
   * @param {number|string} id - Application ID
   * @returns {Promise<boolean>}
   */
  static async exists(id) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) return false;

    const res = await query('SELECT 1 FROM applications WHERE id = $1', [numericId]);
    return res.rows.length > 0;
  }

  /**
   * Count total applications matching filter criteria.
   * 
   * @param {Object} [filter={}] - Filter criteria
   * @returns {Promise<number>}
   */
  static async count(filter = {}) {
    let sql = 'SELECT COUNT(*) FROM applications';
    const conditions = [];
    const params = [];

    if (filter.userId) {
      params.push(parseInt(filter.userId, 10));
      conditions.push(`user_id = $${params.length}`);
    }

    if (filter.jobId) {
      params.push(parseInt(filter.jobId, 10));
      conditions.push(`job_id = $${params.length}`);
    }

    if (filter.status) {
      params.push(String(filter.status).trim().toLowerCase());
      conditions.push(`LOWER(status) = $${params.length}`);
    }

    if (conditions.length > 0) {
      sql += ` WHERE ${conditions.join(' AND ')}`;
    }

    const res = await query(sql, params);
    return parseInt(res.rows[0].count, 10);
  }

  /**
   * Validate application payload.
   * 
   * @param {Object} data 
   * @param {boolean} [isUpdate=false] 
   * @returns {{ isValid: boolean, errors: string[] }}
   */
  static validate(data, isUpdate = false) {
    const errors = [];

    if (!data || typeof data !== 'object') {
      return { isValid: false, errors: ['Application data must be an object.'] };
    }

    if (!isUpdate) {
      if (!data.userId || isNaN(parseInt(data.userId, 10))) {
        errors.push('Field "userId" is required and must be a valid integer.');
      }
      if (!data.jobId || isNaN(parseInt(data.jobId, 10))) {
        errors.push('Field "jobId" is required and must be a valid integer.');
      }
    }

    if (data.status) {
      const normalized = String(data.status).trim().toLowerCase();
      const valid = this.STATUSES.map(s => s.toLowerCase());
      if (!valid.includes(normalized)) {
        errors.push(`Invalid status "${data.status}". Allowed values: ${this.STATUSES.join(', ')}.`);
      }
    }

    if (data.resumeUrl && typeof data.resumeUrl === 'string' && data.resumeUrl.trim()) {
      const url = data.resumeUrl.trim();
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        errors.push('Field "resumeUrl" must start with http:// or https://.');
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

// Aliases
ApplicationModel.findAll = ApplicationModel.getAll;
ApplicationModel.findById = ApplicationModel.getById;
ApplicationModel.remove = ApplicationModel.delete;

module.exports = ApplicationModel;
