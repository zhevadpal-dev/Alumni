/**
 * API Announcement Controller (RESTful JSON Endpoints)
 * 
 * Exclusively handles API requests targeting `/api/announcements`.
 * Implements full CRUD with proper HTTP status codes:
 * - getAll: 200 OK (with search, category filtering, and pagination)
 * - getById: 200 OK or 404 Not Found
 * - create: 201 Created or 400 Bad Request
 * - update: 200 OK, 400 Bad Request, or 404 Not Found
 * - remove: 200 OK / 204 No Content, or 404 Not Found
 */

const AnnouncementModel = require('../models/announcementModel');

class ApiAnnouncementController {
  /**
   * GET /api/announcements
   * Retrieve all announcements with optional filtering by category, search, author, and pagination.
   */
  static async getAll(req, res) {
    try {
      const items = await AnnouncementModel.getAll(req.query);
      return res.status(200).json({
        status: 'success',
        count: items.length,
        data: items
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message || 'Internal server error while fetching announcements.'
      });
    }
  }

  /**
   * GET /api/announcements/:id
   * Retrieve a single announcement by its numeric ID.
   */
  static async getById(req, res) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({
        status: 'error',
        message: 'Announcement ID must be a valid integer.'
      });
    }

    try {
      const item = await AnnouncementModel.getById(id);
      if (!item) {
        return res.status(404).json({
          status: 'error',
          message: `Announcement with ID ${id} not found.`
        });
      }

      return res.status(200).json({
        status: 'success',
        data: item
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message || 'Internal server error while fetching announcement.'
      });
    }
  }

  /**
   * POST /api/announcements
   * Create a new announcement in PostgreSQL.
   */
  static async create(req, res) {
    const { title, content, author, category } = req.body || {};

    if (!title || !content) {
      return res.status(400).json({
        status: 'error',
        message: 'Fields "title" and "content" are required.'
      });
    }

    try {
      const created = await AnnouncementModel.create({
        title,
        content,
        author,
        category
      });

      return res.status(201).json({
        status: 'success',
        message: 'Announcement created successfully',
        data: created
      });
    } catch (err) {
      return res.status(err.statusCode || 400).json({
        status: 'error',
        message: err.message
      });
    }
  }

  /**
   * PUT /api/announcements/:id & PATCH /api/announcements/:id
   * Update an existing announcement in PostgreSQL.
   */
  static async update(req, res) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({
        status: 'error',
        message: 'Announcement ID must be a valid integer.'
      });
    }

    try {
      const updated = await AnnouncementModel.update(id, req.body || {});
      if (!updated) {
        return res.status(404).json({
          status: 'error',
          message: `Announcement with ID ${id} not found.`
        });
      }

      return res.status(200).json({
        status: 'success',
        message: 'Announcement updated successfully',
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
   * DELETE /api/announcements/:id
   * Delete an existing announcement from PostgreSQL by ID.
   */
  static async remove(req, res) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({
        status: 'error',
        message: 'Announcement ID must be a valid integer.'
      });
    }

    try {
      const deleted = await AnnouncementModel.delete(id);
      if (!deleted) {
        return res.status(404).json({
          status: 'error',
          message: `Announcement with ID ${id} not found.`
        });
      }

      // Support 204 No Content if client requests via query or header, default 200 with deleted item
      if (req.query.status === '204' || req.headers['prefer'] === 'return=minimal') {
        return res.status(204).send();
      }

      return res.status(200).json({
        status: 'success',
        message: `Announcement with ID ${id} has been successfully deleted.`,
        data: deleted
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message || 'Internal server error while deleting announcement.'
      });
    }
  }

  // ==========================================
  // RELATIONAL SUB-ROUTES
  // ==========================================

  /**
   * GET /api/announcements/:id/author
   * Retrieve the User entity who authored this announcement.
   */
  static async getAuthor(req, res) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({
        status: 'error',
        message: 'Announcement ID must be a valid integer.'
      });
    }

    try {
      const item = await AnnouncementModel.getById(id);
      if (!item) {
        return res.status(404).json({
          status: 'error',
          message: `Announcement with ID ${id} not found.`
        });
      }

      if (!item.authorId) {
        return res.status(404).json({
          status: 'error',
          message: `Announcement with ID ${id} does not have an associated author user.`
        });
      }

      const author = await AnnouncementModel.getAuthor(id);
      if (!author) {
        return res.status(404).json({
          status: 'error',
          message: `Author user with ID ${item.authorId} was not found.`
        });
      }

      return res.status(200).json({
        status: 'success',
        announcementId: id,
        data: author
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message || 'Internal server error while fetching announcement author.'
      });
    }
  }
}

// REST Resource Aliases
ApiAnnouncementController.index = ApiAnnouncementController.getAll;
ApiAnnouncementController.show = ApiAnnouncementController.getById;
ApiAnnouncementController.store = ApiAnnouncementController.create;
ApiAnnouncementController.patch = ApiAnnouncementController.update;
ApiAnnouncementController.destroy = ApiAnnouncementController.remove;

module.exports = ApiAnnouncementController;
