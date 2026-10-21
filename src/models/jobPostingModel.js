/**
 * Job Posting Model (PostgreSQL Persistence & Entity Layer)
 * 
 * Provides relational database access and persistence for the JobPosting entity
 * backed by PostgreSQL via the connection pool in src/config/db.js.
 * Implements complete CRUD (Create, Read, Update, Delete) operations,
 * schema validation, relational queries, search filtering, and pagination.
 * 
 * Reference: docs/ddd.md (Section 3.3, 4, 6.3, 8)
 */

const { query } = require('../config/db');

class JobPostingModel {
  /**
   * Allowed employment types
   */
  static JOB_TYPES = ['Full-Time', 'Part-Time', 'Contract', 'Internship', 'Remote'];

  /**
   * Allowed job posting lifecycle statuses
   */
  static STATUSES = ['Active', 'Closed', 'Draft', 'Expired'];

  // ==========================================
  // READ (R)
  // ==========================================

  /**
   * Retrieve all job postings from PostgreSQL with optional filtering, search, and pagination.
   * 
   * @param {Object} [filter={}] - Query options
   * @param {string} [filter.status] - Filter by status ('Active', 'Closed', 'Draft', 'Expired')
   * @param {string} [filter.jobType] - Filter by employment type
   * @param {number|string} [filter.posterId] - Filter by poster user ID
   * @param {string} [filter.company] - Filter by company substring
   * @param {string} [filter.location] - Filter by location substring
   * @param {string} [filter.search] - Search substring in title, company, description, requirements
   * @param {string} [filter.q] - Alternative search parameter
   * @param {number|string} [filter.limit] - Limit maximum returned records
   * @param {number|string} [filter.page=1] - Page number for pagination
   * @returns {Promise<Array<Object>>} Matching job posting records
   */
  static async getAll(filter = {}) {
    let sql = `
      SELECT id, title, company, location,
             job_type AS "jobType",
             description, requirements,
             salary_range AS "salaryRange",
             application_url AS "applicationUrl",
             contact_email AS "contactEmail",
             poster_id AS "posterId",
             status, deadline,
             created_at AS "createdAt",
             updated_at AS "updatedAt"
      FROM job_postings
    `;

    const conditions = [];
    const params = [];

    // Filter by status
    if (filter.status) {
      params.push(String(filter.status).trim().toLowerCase());
      conditions.push(`LOWER(status) = $${params.length}`);
    }

    // Filter by jobType
    if (filter.jobType) {
      params.push(String(filter.jobType).trim().toLowerCase());
      conditions.push(`LOWER(job_type) = $${params.length}`);
    }

    // Filter by posterId
    if (filter.posterId) {
      const posterId = parseInt(filter.posterId, 10);
      if (!isNaN(posterId)) {
        params.push(posterId);
        conditions.push(`poster_id = $${params.length}`);
      }
    }

    // Filter by company
    if (filter.company) {
      params.push(`%${String(filter.company).trim().toLowerCase()}%`);
      conditions.push(`LOWER(company) LIKE $${params.length}`);
    }

    // Filter by location
    if (filter.location) {
      params.push(`%${String(filter.location).trim().toLowerCase()}%`);
      conditions.push(`LOWER(location) LIKE $${params.length}`);
    }

    // Search in title, company, description, requirements
    const searchQuery = filter.search || filter.q;
    if (searchQuery) {
      params.push(`%${String(searchQuery).trim().toLowerCase()}%`);
      const pIdx = params.length;
      conditions.push(`(
        LOWER(title) LIKE $${pIdx} OR 
        LOWER(company) LIKE $${pIdx} OR 
        LOWER(description) LIKE $${pIdx} OR 
        LOWER(COALESCE(requirements, '')) LIKE $${pIdx}
      )`);
    }

    if (conditions.length > 0) {
      sql += ` WHERE ${conditions.join(' AND ')}`;
    }

    // Default sort: newest first
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
   * Find a job posting by its numeric ID.
   * 
   * @param {number|string} id - Job posting ID
   * @returns {Promise<Object|null>} Matching job posting or null if not found
   */
  static async getById(id) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) return null;

    const sql = `
      SELECT id, title, company, location,
             job_type AS "jobType",
             description, requirements,
             salary_range AS "salaryRange",
             application_url AS "applicationUrl",
             contact_email AS "contactEmail",
             poster_id AS "posterId",
             status, deadline,
             created_at AS "createdAt",
             updated_at AS "updatedAt"
      FROM job_postings
      WHERE id = $1
    `;

    const res = await query(sql, [numericId]);
    return res.rows[0] || null;
  }

  /**
   * Retrieve a job posting joined with its author/poster user details.
   * Demonstrates the belongsTo relational join (JobPosting -> User).
   * 
   * @param {number|string} id - Job posting ID
   * @returns {Promise<Object|null>} Job posting record with nested poster user object
   */
  static async getByIdWithPoster(id) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) return null;

    const sql = `
      SELECT jp.id, jp.title, jp.company, jp.location,
             jp.job_type AS "jobType",
             jp.description, jp.requirements,
             jp.salary_range AS "salaryRange",
             jp.application_url AS "applicationUrl",
             jp.contact_email AS "contactEmail",
             jp.poster_id AS "posterId",
             jp.status, jp.deadline,
             jp.created_at AS "createdAt",
             jp.updated_at AS "updatedAt",
             u.id AS "u_id",
             u.name AS "u_name",
             u.email AS "u_email",
             u.role AS "u_role",
             u.department AS "u_department",
             u.graduation_year AS "u_graduationYear"
      FROM job_postings jp
      LEFT JOIN users u ON jp.poster_id = u.id
      WHERE jp.id = $1
    `;

    const res = await query(sql, [numericId]);
    if (!res.rows[0]) return null;

    const row = res.rows[0];
    const { u_id, u_name, u_email, u_role, u_department, u_graduationYear, ...posting } = row;

    posting.poster = u_id ? {
      id: u_id,
      name: u_name,
      email: u_email,
      role: u_role,
      department: u_department,
      graduationYear: u_graduationYear
    } : null;

    return posting;
  }

  /**
   * Retrieve all job postings joined with their author/poster user details.
   * 
   * @param {Object} [filter={}] - Query options
   * @returns {Promise<Array<Object>>} Job postings with nested poster objects
   */
  static async getAllWithPoster(filter = {}) {
    let sql = `
      SELECT jp.id, jp.title, jp.company, jp.location,
             jp.job_type AS "jobType",
             jp.description, jp.requirements,
             jp.salary_range AS "salaryRange",
             jp.application_url AS "applicationUrl",
             jp.contact_email AS "contactEmail",
             jp.poster_id AS "posterId",
             jp.status, jp.deadline,
             jp.created_at AS "createdAt",
             jp.updated_at AS "updatedAt",
             u.id AS "u_id",
             u.name AS "u_name",
             u.email AS "u_email",
             u.role AS "u_role",
             u.department AS "u_department",
             u.graduation_year AS "u_graduationYear"
      FROM job_postings jp
      LEFT JOIN users u ON jp.poster_id = u.id
    `;

    const conditions = [];
    const params = [];

    if (filter.status) {
      params.push(String(filter.status).trim().toLowerCase());
      conditions.push(`LOWER(jp.status) = $${params.length}`);
    }

    if (filter.jobType) {
      params.push(String(filter.jobType).trim().toLowerCase());
      conditions.push(`LOWER(jp.job_type) = $${params.length}`);
    }

    if (filter.posterId) {
      const posterId = parseInt(filter.posterId, 10);
      if (!isNaN(posterId)) {
        params.push(posterId);
        conditions.push(`jp.poster_id = $${params.length}`);
      }
    }

    const searchQuery = filter.search || filter.q;
    if (searchQuery) {
      params.push(`%${String(searchQuery).trim().toLowerCase()}%`);
      const pIdx = params.length;
      conditions.push(`(
        LOWER(jp.title) LIKE $${pIdx} OR 
        LOWER(jp.company) LIKE $${pIdx} OR 
        LOWER(jp.description) LIKE $${pIdx}
      )`);
    }

    if (conditions.length > 0) {
      sql += ` WHERE ${conditions.join(' AND ')}`;
    }

    sql += ` ORDER BY jp.id DESC`;

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
      const { u_id, u_name, u_email, u_role, u_department, u_graduationYear, ...posting } = row;
      posting.poster = u_id ? {
        id: u_id,
        name: u_name,
        email: u_email,
        role: u_role,
        department: u_department,
        graduationYear: u_graduationYear
      } : null;
      return posting;
    });
  }

  /**
   * Fetch the User entity who posted the specified job posting.
   * 
   * @param {number|string} jobPostingId - Job posting ID
   * @returns {Promise<Object|null>} Associated User object or null
   */
  static async getPoster(jobPostingId) {
    const posting = await this.getById(jobPostingId);
    if (!posting || !posting.posterId) return null;

    const sql = `
      SELECT id, name, email, role, department, 
             graduation_year AS "graduationYear",
             created_at AS "createdAt", updated_at AS "updatedAt"
      FROM users
      WHERE id = $1
    `;
    const res = await query(sql, [posting.posterId]);
    return res.rows[0] || null;
  }

  /**
   * Fetch all applications submitted for this job posting (1-to-Many).
   * Includes details of applicant User.
   * 
   * @param {number|string} jobPostingId - Job posting ID
   * @param {Object} [filter={}] - Query options
   * @returns {Promise<Array<Object>>} Applications list with applicant user details
   */
  static async getApplications(jobPostingId, filter = {}) {
    const numericId = parseInt(jobPostingId, 10);
    if (isNaN(numericId)) return [];

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
             u.name AS "applicantName",
             u.email AS "applicantEmail",
             u.role AS "applicantRole",
             u.department AS "applicantDepartment",
             u.graduation_year AS "applicantGraduationYear"
      FROM applications a
      JOIN users u ON a.user_id = u.id
      WHERE a.job_id = $1
    `;

    const params = [numericId];

    if (filter.status) {
      params.push(String(filter.status).trim().toLowerCase());
      sql += ` AND LOWER(a.status) = $${params.length}`;
    }

    sql += ` ORDER BY a.applied_at DESC, a.id DESC`;

    const res = await query(sql, params);
    return res.rows;
  }

  /**
   * Fetch all applicant Users for this job posting (Many-to-Many through applications).
   * 
   * @param {number|string} jobPostingId - Job posting ID
   * @param {Object} [filter={}] - Query options
   * @returns {Promise<Array<Object>>} Applicant users list with application metadata
   */
  static async getApplicants(jobPostingId, filter = {}) {
    const numericId = parseInt(jobPostingId, 10);
    if (isNaN(numericId)) return [];

    let sql = `
      SELECT u.id,
             u.name,
             u.email,
             u.role,
             u.department,
             u.graduation_year AS "graduationYear",
             a.id AS "applicationId",
             a.status AS "applicationStatus",
             a.cover_letter AS "coverLetter",
             a.resume_url AS "resumeUrl",
             a.applied_at AS "appliedAt"
      FROM users u
      JOIN applications a ON a.user_id = u.id
      WHERE a.job_id = $1
    `;

    const params = [numericId];

    if (filter.status) {
      params.push(String(filter.status).trim().toLowerCase());
      sql += ` AND LOWER(a.status) = $${params.length}`;
    }

    sql += ` ORDER BY a.applied_at DESC, u.id ASC`;

    const res = await query(sql, params);
    return res.rows;
  }

  // ==========================================
  // CREATE (C)
  // ==========================================

  /**
   * Create and persist a new job posting in PostgreSQL.
   * 
   * @param {Object} data - Job posting attributes
   * @param {string} data.title - Position title (required)
   * @param {string} data.company - Company name (required)
   * @param {string} [data.location='Remote'] - Location or Remote
   * @param {string} [data.jobType='Full-Time'] - Employment type classification
   * @param {string} data.description - Role overview & duties (required)
   * @param {string} [data.requirements] - Prerequisites / qualifications
   * @param {string} [data.salaryRange] - Compensation range
   * @param {string} [data.applicationUrl] - Application URL
   * @param {string} [data.contactEmail] - Contact email address
   * @param {number|string} [data.posterId] - ID of user posting the job
   * @param {string} [data.status='Active'] - Lifecycle status ('Active', 'Closed', 'Draft', 'Expired')
   * @param {string|Date} [data.deadline] - Application deadline date
   * @returns {Promise<Object>} Newly created job posting record
   * @throws {Error} If validation fails
   */
  static async create(data) {
    const validation = this.validate(data, false);
    if (!validation.isValid) {
      const error = new Error(validation.errors.join('; '));
      error.statusCode = 400;
      throw error;
    }

    const cleanJobType = data.jobType && this.JOB_TYPES.map(j => j.toLowerCase()).includes(data.jobType.trim().toLowerCase())
      ? this.JOB_TYPES.find(j => j.toLowerCase() === data.jobType.trim().toLowerCase())
      : 'Full-Time';

    const cleanStatus = data.status && this.STATUSES.map(s => s.toLowerCase()).includes(data.status.trim().toLowerCase())
      ? this.STATUSES.find(s => s.toLowerCase() === data.status.trim().toLowerCase())
      : 'Active';

    const cleanPosterId = data.posterId ? parseInt(data.posterId, 10) : null;

    const sql = `
      INSERT INTO job_postings (
        title, company, location, job_type, description, requirements,
        salary_range, application_url, contact_email, poster_id, status, deadline,
        created_at, updated_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW(), NOW())
      RETURNING id, title, company, location,
                job_type AS "jobType",
                description, requirements,
                salary_range AS "salaryRange",
                application_url AS "applicationUrl",
                contact_email AS "contactEmail",
                poster_id AS "posterId",
                status, deadline,
                created_at AS "createdAt",
                updated_at AS "updatedAt"
    `;

    const values = [
      data.title.trim(),
      data.company.trim(),
      data.location && data.location.trim() ? data.location.trim() : 'Remote',
      cleanJobType,
      data.description.trim(),
      data.requirements && data.requirements.trim() ? data.requirements.trim() : null,
      data.salaryRange && data.salaryRange.trim() ? data.salaryRange.trim() : null,
      data.applicationUrl && data.applicationUrl.trim() ? data.applicationUrl.trim() : null,
      data.contactEmail && data.contactEmail.trim() ? data.contactEmail.trim().toLowerCase() : null,
      cleanPosterId && !isNaN(cleanPosterId) ? cleanPosterId : null,
      cleanStatus,
      data.deadline ? new Date(data.deadline) : null
    ];

    const res = await query(sql, values);
    return res.rows[0];
  }

  // ==========================================
  // UPDATE (U)
  // ==========================================

  /**
   * Update an existing job posting in PostgreSQL by ID.
   * 
   * @param {number|string} id - Job posting ID
   * @param {Object} data - Updated attributes
   * @returns {Promise<Object|null>} Updated job posting or null if not found
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

    let cleanJobType = existing.jobType;
    if (data.jobType && this.JOB_TYPES.map(j => j.toLowerCase()).includes(data.jobType.trim().toLowerCase())) {
      cleanJobType = this.JOB_TYPES.find(j => j.toLowerCase() === data.jobType.trim().toLowerCase());
    }

    let cleanStatus = existing.status;
    if (data.status && this.STATUSES.map(s => s.toLowerCase()).includes(data.status.trim().toLowerCase())) {
      cleanStatus = this.STATUSES.find(s => s.toLowerCase() === data.status.trim().toLowerCase());
    }

    const cleanPosterId = data.posterId !== undefined
      ? (data.posterId ? parseInt(data.posterId, 10) : null)
      : existing.posterId;

    const sql = `
      UPDATE job_postings
      SET title = $1,
          company = $2,
          location = $3,
          job_type = $4,
          description = $5,
          requirements = $6,
          salary_range = $7,
          application_url = $8,
          contact_email = $9,
          poster_id = $10,
          status = $11,
          deadline = $12,
          updated_at = NOW()
      WHERE id = $13
      RETURNING id, title, company, location,
                job_type AS "jobType",
                description, requirements,
                salary_range AS "salaryRange",
                application_url AS "applicationUrl",
                contact_email AS "contactEmail",
                poster_id AS "posterId",
                status, deadline,
                created_at AS "createdAt",
                updated_at AS "updatedAt"
    `;

    const values = [
      data.title !== undefined && data.title.trim() ? data.title.trim() : existing.title,
      data.company !== undefined && data.company.trim() ? data.company.trim() : existing.company,
      data.location !== undefined && data.location.trim() ? data.location.trim() : existing.location,
      cleanJobType,
      data.description !== undefined && data.description.trim() ? data.description.trim() : existing.description,
      data.requirements !== undefined ? (data.requirements ? data.requirements.trim() : null) : existing.requirements,
      data.salaryRange !== undefined ? (data.salaryRange ? data.salaryRange.trim() : null) : existing.salaryRange,
      data.applicationUrl !== undefined ? (data.applicationUrl ? data.applicationUrl.trim() : null) : existing.applicationUrl,
      data.contactEmail !== undefined ? (data.contactEmail ? data.contactEmail.trim().toLowerCase() : null) : existing.contactEmail,
      cleanPosterId,
      cleanStatus,
      data.deadline !== undefined ? (data.deadline ? new Date(data.deadline) : null) : existing.deadline,
      numericId
    ];

    const res = await query(sql, values);
    return res.rows[0] || null;
  }

  /**
   * Partially modify an existing job posting (PATCH semantics).
   * 
   * @param {number|string} id - Job posting ID
   * @param {Object} partialData - Subset of fields to update
   * @returns {Promise<Object|null>} Updated job posting
   */
  static async patch(id, partialData) {
    return this.update(id, partialData);
  }

  // ==========================================
  // DELETE (D)
  // ==========================================

  /**
   * Delete an existing job posting from PostgreSQL by ID.
   * 
   * @param {number|string} id - Job posting ID
   * @returns {Promise<Object|null>} Deleted record or null if not found
   */
  static async delete(id) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) return null;

    const existing = await this.getById(numericId);
    if (!existing) return null;

    const sql = `
      DELETE FROM job_postings
      WHERE id = $1
      RETURNING id, title, company, location,
                job_type AS "jobType",
                status
    `;

    const res = await query(sql, [numericId]);
    return res.rows[0] || null;
  }

  // ==========================================
  // UTILITIES & VALIDATION
  // ==========================================

  /**
   * Check whether a job posting exists by ID.
   * 
   * @param {number|string} id - Job posting ID
   * @returns {Promise<boolean>}
   */
  static async exists(id) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) return false;

    const res = await query('SELECT 1 FROM job_postings WHERE id = $1', [numericId]);
    return res.rows.length > 0;
  }

  /**
   * Count job postings matching filter criteria.
   * 
   * @param {Object} [filter={}] - Filter criteria
   * @returns {Promise<number>}
   */
  static async count(filter = {}) {
    let sql = 'SELECT COUNT(*) FROM job_postings';
    const conditions = [];
    const params = [];

    if (filter.status) {
      params.push(String(filter.status).trim().toLowerCase());
      conditions.push(`LOWER(status) = $${params.length}`);
    }

    if (filter.jobType) {
      params.push(String(filter.jobType).trim().toLowerCase());
      conditions.push(`LOWER(job_type) = $${params.length}`);
    }

    if (filter.posterId) {
      const posterId = parseInt(filter.posterId, 10);
      if (!isNaN(posterId)) {
        params.push(posterId);
        conditions.push(`poster_id = $${params.length}`);
      }
    }

    if (conditions.length > 0) {
      sql += ` WHERE ${conditions.join(' AND ')}`;
    }

    const res = await query(sql, params);
    return parseInt(res.rows[0].count, 10);
  }

  /**
   * Validate job posting payload against domain rules.
   * 
   * @param {Object} data - Payload to validate
   * @param {boolean} [isUpdate=false] - Whether this is an update validation
   * @returns {{ isValid: boolean, errors: string[] }}
   */
  static validate(data, isUpdate = false) {
    const errors = [];

    if (!data || typeof data !== 'object') {
      return { isValid: false, errors: ['Job posting data must be an object.'] };
    }

    // Required fields on creation
    if (!isUpdate) {
      if (!data.title || typeof data.title !== 'string' || !data.title.trim()) {
        errors.push('Field "title" is required and cannot be empty.');
      }
      if (!data.company || typeof data.company !== 'string' || !data.company.trim()) {
        errors.push('Field "company" is required and cannot be empty.');
      }
      if (!data.description || typeof data.description !== 'string' || !data.description.trim()) {
        errors.push('Field "description" is required and cannot be empty.');
      }
    } else {
      if (data.title !== undefined && (typeof data.title !== 'string' || !data.title.trim())) {
        errors.push('Field "title" cannot be empty.');
      }
      if (data.company !== undefined && (typeof data.company !== 'string' || !data.company.trim())) {
        errors.push('Field "company" cannot be empty.');
      }
      if (data.description !== undefined && (typeof data.description !== 'string' || !data.description.trim())) {
        errors.push('Field "description" cannot be empty.');
      }
    }

    // Validate jobType whitelist
    if (data.jobType) {
      const normalized = String(data.jobType).trim().toLowerCase();
      const valid = this.JOB_TYPES.map(j => j.toLowerCase());
      if (!valid.includes(normalized)) {
        errors.push(`Invalid jobType "${data.jobType}". Allowed values: ${this.JOB_TYPES.join(', ')}.`);
      }
    }

    // Validate status whitelist
    if (data.status) {
      const normalized = String(data.status).trim().toLowerCase();
      const valid = this.STATUSES.map(s => s.toLowerCase());
      if (!valid.includes(normalized)) {
        errors.push(`Invalid status "${data.status}". Allowed values: ${this.STATUSES.join(', ')}.`);
      }
    }

    // Validate contactEmail format
    if (data.contactEmail && typeof data.contactEmail === 'string' && data.contactEmail.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.contactEmail.trim())) {
        errors.push('Invalid contactEmail format.');
      }
    }

    // Validate applicationUrl protocol
    if (data.applicationUrl && typeof data.applicationUrl === 'string' && data.applicationUrl.trim()) {
      const url = data.applicationUrl.trim();
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        errors.push('Field "applicationUrl" must start with http:// or https://.');
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

// Aliases for unified repository patterns
JobPostingModel.findAll = JobPostingModel.getAll;
JobPostingModel.findById = JobPostingModel.getById;
JobPostingModel.remove = JobPostingModel.delete;

module.exports = JobPostingModel;
