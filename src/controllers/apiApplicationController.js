/**
 * API Application Controller (RESTful JSON Endpoints)
 * 
 * Exclusively handles API requests targeting `/api/applications`.
 * Manages the Many-to-Many action entity connecting Users (applicants) and JobPostings.
 * Implements complete CRUD with proper HTTP status codes:
 * - getAll: 200 OK (with userId, jobId, status filtering, withDetails, and pagination)
 * - getById: 200 OK (includes applicant User and target JobPosting details) or 404 Not Found
 * - create: 201 Created, 400 Bad Request, or 409 Conflict (composite uniqueness)
 * - update: 200 OK, 400 Bad Request, or 404 Not Found
 * - patch: 200 OK, 400 Bad Request, or 404 Not Found (e.g. status transition)
 * - delete: 200 OK or 404 Not Found (withdraw application)
 * 
 * References: docs/ddd.md (Section 3.4, 4, 6.4, 8)
 */

const ApplicationModel = require('../models/applicationModel');

class ApiApplicationController {
  /**
   * GET /api/applications
   * Retrieve all job applications with optional filtering and pagination.
   * Query params: userId, jobId, status, withDetails ('true' for nested objects), limit, page.
   */
  static async getAll(req, res) {
    try {
      const withDetails = req.query.withDetails === 'true' || req.query.includeDetails === 'true';
      const items = withDetails
        ? await ApplicationModel.getAllWithDetails(req.query)
        : await ApplicationModel.getAll(req.query);

      return res.status(200).json({
        status: 'success',
        count: items.length,
        data: items
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message || 'Internal server error while fetching applications.'
      });
    }
  }

  /**
   * GET /api/applications/:id
   * Retrieve a single application by ID with nested applicant and job posting details.
   */
  static async getById(req, res) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({
        status: 'error',
        message: 'Application ID must be a valid integer.'
      });
    }

    try {
      const item = await ApplicationModel.getByIdWithDetails(id);
      if (!item) {
        return res.status(404).json({
          status: 'error',
          message: `Application with ID ${id} not found.`
        });
      }

      return res.status(200).json({
        status: 'success',
        data: item
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message || 'Internal server error while fetching application.'
      });
    }
  }

  /**
   * POST /api/applications
   * Submit a new job application.
   * Enforces Many-to-Many uniqueness (user cannot apply twice to the same job).
   */
  static async create(req, res) {
    try {
      const newApp = await ApplicationModel.create(req.body);
      return res.status(201).json({
        status: 'success',
        message: 'Application submitted successfully.',
        data: newApp
      });
    } catch (err) {
      return res.status(err.statusCode || 400).json({
        status: 'error',
        message: err.message
      });
    }
  }

  /**
   * PUT /api/applications/:id
   * Fully update an existing application record.
   */
  static async update(req, res) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({
        status: 'error',
        message: 'Application ID must be a valid integer.'
      });
    }

    try {
      const updated = await ApplicationModel.update(id, req.body);
      if (!updated) {
        return res.status(404).json({
          status: 'error',
          message: `Application with ID ${id} not found.`
        });
      }

      return res.status(200).json({
        status: 'success',
        message: 'Application updated successfully.',
        data: updated
      });
    } catch (err) {
      return res.status(err.statusCode || 400).json({
        status: 'error',
        message: err.message
      });
    }
  }

  /**
   * PATCH /api/applications/:id
   * Partially update an existing application record (e.g., status progression).
   */
  static async patch(req, res) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({
        status: 'error',
        message: 'Application ID must be a valid integer.'
      });
    }

    try {
      const updated = await ApplicationModel.patch(id, req.body);
      if (!updated) {
        return res.status(404).json({
          status: 'error',
          message: `Application with ID ${id} not found.`
        });
      }

      return res.status(200).json({
        status: 'success',
        message: 'Application modified successfully.',
        data: updated
      });
    } catch (err) {
      return res.status(err.statusCode || 400).json({
        status: 'error',
        message: err.message
      });
    }
  }

  /**
   * DELETE /api/applications/:id
   * Delete or withdraw an existing job application.
   */
  static async delete(req, res) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({
        status: 'error',
        message: 'Application ID must be a valid integer.'
      });
    }

    try {
      const deleted = await ApplicationModel.delete(id);
      if (!deleted) {
        return res.status(404).json({
          status: 'error',
          message: `Application with ID ${id} not found.`
        });
      }

      return res.status(200).json({
        status: 'success',
        message: `Application #${id} deleted successfully.`,
        data: deleted
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message || 'Internal server error while deleting application.'
      });
    }
  }
}

// REST Resource Aliases
ApiApplicationController.index = ApiApplicationController.getAll;
ApiApplicationController.show = ApiApplicationController.getById;
ApiApplicationController.store = ApiApplicationController.create;
ApiApplicationController.destroy = ApiApplicationController.delete;

module.exports = ApiApplicationController;
