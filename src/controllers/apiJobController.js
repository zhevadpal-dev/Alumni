/**
 * API Job Postings Controller (RESTful JSON Endpoints)
 * 
 * Exclusively handles API requests targeting `/api/jobs`.
 * Implements complete CRUD with proper HTTP status codes:
 * - getAll: 200 OK (with search, status, jobType, company filtering, and pagination)
 * - getById: 200 OK (includes poster relations) or 404 Not Found
 * - getPoster: 200 OK or 404 Not Found
 * - create: 201 Created or 400 Bad Request
 * - update: 200 OK, 400 Bad Request, or 404 Not Found
 * - patch: 200 OK, 400 Bad Request, or 404 Not Found
 * - delete: 200 OK / 204 No Content, or 404 Not Found
 * 
 * References: docs/ddd.md (Section 3.3, 4, 6.3, 8)
 */

const JobPostingModel = require('../models/jobPostingModel');
const ApplicationModel = require('../models/applicationModel');

class ApiJobController {
  /**
   * GET /api/jobs
   * Retrieve all job postings with optional filtering, search, and pagination.
   */
  static async getAll(req, res) {
    try {
      const withPoster = req.query.withPoster === 'true' || req.query.includePoster === 'true';
      const items = withPoster
        ? await JobPostingModel.getAllWithPoster(req.query)
        : await JobPostingModel.getAll(req.query);

      return res.status(200).json({
        status: 'success',
        count: items.length,
        data: items
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message || 'Internal server error while fetching job postings.'
      });
    }
  }

  /**
   * GET /api/jobs/:id
   * Retrieve a single job posting by ID (joined with poster details).
   */
  static async getById(req, res) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({
        status: 'error',
        message: 'Job posting ID must be a valid integer.'
      });
    }

    try {
      const item = await JobPostingModel.getByIdWithPoster(id);
      if (!item) {
        return res.status(404).json({
          status: 'error',
          message: `Job posting with ID ${id} not found.`
        });
      }

      return res.status(200).json({
        status: 'success',
        data: item
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message || 'Internal server error while fetching job posting.'
      });
    }
  }

  /**
   * GET /api/jobs/:id/poster
   * Retrieve the user entity who posted the specified job posting (Relational Sub-Route).
   */
  static async getPoster(req, res) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({
        status: 'error',
        message: 'Job posting ID must be a valid integer.'
      });
    }

    try {
      const job = await JobPostingModel.getById(id);
      if (!job) {
        return res.status(404).json({
          status: 'error',
          message: `Job posting with ID ${id} not found.`
        });
      }

      if (!job.posterId) {
        return res.status(404).json({
          status: 'error',
          message: `Job posting with ID ${id} does not have an associated poster user.`
        });
      }

      const poster = await JobPostingModel.getPoster(id);
      if (!poster) {
        return res.status(404).json({
          status: 'error',
          message: `Poster user with ID ${job.posterId} was not found.`
        });
      }

      return res.status(200).json({
        status: 'success',
        jobId: id,
        data: poster
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message || 'Internal server error while fetching job poster.'
      });
    }
  }

  /**
   * POST /api/jobs
   * Create a new job posting in PostgreSQL.
   */
  static async create(req, res) {
    const payload = req.body || {};
    try {
      const created = await JobPostingModel.create(payload);
      return res.status(201).json({
        status: 'success',
        message: 'Job posting created successfully.',
        data: created
      });
    } catch (err) {
      const statusCode = err.statusCode || 400;
      return res.status(statusCode).json({
        status: 'error',
        message: err.message || 'Failed to create job posting.'
      });
    }
  }

  /**
   * PUT /api/jobs/:id
   * Update an existing job posting (full update).
   */
  static async update(req, res) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({
        status: 'error',
        message: 'Job posting ID must be a valid integer.'
      });
    }

    try {
      const updated = await JobPostingModel.update(id, req.body || {});
      if (!updated) {
        return res.status(404).json({
          status: 'error',
          message: `Job posting with ID ${id} not found.`
        });
      }

      return res.status(200).json({
        status: 'success',
        message: 'Job posting updated successfully.',
        data: updated
      });
    } catch (err) {
      const statusCode = err.statusCode || 400;
      return res.status(statusCode).json({
        status: 'error',
        message: err.message || 'Failed to update job posting.'
      });
    }
  }

  /**
   * PATCH /api/jobs/:id
   * Partially modify an existing job posting.
   */
  static async patch(req, res) {
    return ApiJobController.update(req, res);
  }

  /**
   * DELETE /api/jobs/:id
   * Delete an existing job posting by ID.
   */
  static async delete(req, res) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({
        status: 'error',
        message: 'Job posting ID must be a valid integer.'
      });
    }

    try {
      const deleted = await JobPostingModel.delete(id);
      if (!deleted) {
        return res.status(404).json({
          status: 'error',
          message: `Job posting with ID ${id} not found.`
        });
      }

      return res.status(200).json({
        status: 'success',
        message: `Job posting with ID ${id} was deleted successfully.`,
        data: deleted
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message || 'Internal server error while deleting job posting.'
      });
    }
  }

  /**
   * GET /api/jobs/:id/applications
   * Retrieve all applications submitted for this job posting (1-to-Many).
   */
  static async getApplications(req, res) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({
        status: 'error',
        message: 'Job posting ID must be a valid integer.'
      });
    }

    try {
      const exists = await JobPostingModel.exists(id);
      if (!exists) {
        return res.status(404).json({
          status: 'error',
          message: `Job posting with ID ${id} not found.`
        });
      }

      const applications = await JobPostingModel.getApplications(id, req.query);
      return res.status(200).json({
        status: 'success',
        jobId: id,
        count: applications.length,
        data: applications
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message || 'Internal server error while fetching job applications.'
      });
    }
  }

  /**
   * GET /api/jobs/:id/applicants
   * Retrieve all applicant users for this job posting (Many-to-Many).
   */
  static async getApplicants(req, res) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({
        status: 'error',
        message: 'Job posting ID must be a valid integer.'
      });
    }

    try {
      const exists = await JobPostingModel.exists(id);
      if (!exists) {
        return res.status(404).json({
          status: 'error',
          message: `Job posting with ID ${id} not found.`
        });
      }

      const applicants = await JobPostingModel.getApplicants(id, req.query);
      return res.status(200).json({
        status: 'success',
        jobId: id,
        count: applicants.length,
        data: applicants
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message || 'Internal server error while fetching job applicants.'
      });
    }
  }

  /**
   * POST /api/jobs/:id/apply
   * Submit an application for this specific job posting.
   */
  static async apply(req, res) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({
        status: 'error',
        message: 'Job posting ID must be a valid integer.'
      });
    }

    try {
      const exists = await JobPostingModel.exists(id);
      if (!exists) {
        return res.status(404).json({
          status: 'error',
          message: `Job posting with ID ${id} not found.`
        });
      }

      const applicationData = {
        ...req.body,
        jobId: id
      };

      const application = await ApplicationModel.create(applicationData);
      return res.status(201).json({
        status: 'success',
        message: 'Application submitted successfully for this job posting.',
        data: application
      });
    } catch (err) {
      return res.status(err.statusCode || 400).json({
        status: 'error',
        message: err.message
      });
    }
  }
}

module.exports = ApiJobController;
