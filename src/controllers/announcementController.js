/**
 * Web Announcement Controller (UI / Management Interface)
 * 
 * Serves the server-rendered HTML management interface for announcements:
 * - list: Renders directory table with creation form (/announcements)
 * - detail: Renders single announcement reading view (/announcements/:id)
 * - newForm: Renders standalone announcement creation page (/announcements/new)
 * - editForm: Renders pre-populated edit form (/announcements/:id/edit)
 * - create: Handles form creation submissions (POST /announcements)
 * - update: Handles form update submissions (POST /announcements/:id/edit, PUT /announcements/:id)
 * - deleteAction: Handles deletion requests (POST /announcements/:id/delete, DELETE /announcements/:id)
 */

const AnnouncementModel = require('../models/announcementModel');
const AnnouncementViews = require('../views/announcementViews');

class AnnouncementController {
  /**
   * GET /announcements
   * UI List View: Table listing announcements with stats and embedded creation form.
   */
  static list(req, res) {
    try {
      const items = AnnouncementModel.getAll(req.query);
      const isHtml = req.headers.accept && req.headers.accept.includes('text/html');

      // Default to HTML view for browsers or generic clients
      if (isHtml || !req.headers.accept || req.headers.accept.includes('*/*')) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.status(200).send(AnnouncementViews.renderList(items, req.query));
      }

      return res.status(200).json({
        status: 'success',
        count: items.length,
        data: items
      });
    } catch (err) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.status(500).send(AnnouncementViews.renderError(err.message || 'Internal server error.'));
    }
  }

  /**
   * GET /announcements/:id
   * UI Detail View: Single announcement reading card with action buttons.
   */
  static detail(req, res) {
    const id = parseInt(req.params.id, 10);
    const isHtml = req.headers.accept && req.headers.accept.includes('text/html');

    if (isNaN(id)) {
      if (isHtml || !req.headers.accept || req.headers.accept.includes('*/*')) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.status(400).send(AnnouncementViews.renderError('Announcement ID must be a valid integer.'));
      }
      return res.status(400).json({ status: 'error', message: 'Announcement ID must be a valid integer.' });
    }

    const item = AnnouncementModel.getById(id);
    if (!item) {
      if (isHtml || !req.headers.accept || req.headers.accept.includes('*/*')) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.status(404).send(AnnouncementViews.renderError(`Announcement with ID #${id} not found.`));
      }
      return res.status(404).json({ status: 'error', message: `Announcement with ID #${id} not found.` });
    }

    if (isHtml || !req.headers.accept || req.headers.accept.includes('*/*')) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.status(200).send(AnnouncementViews.renderDetail(item));
    }

    return res.status(200).json({ status: 'success', data: item });
  }

  /**
   * GET /announcements/new
   * UI Form View: Standalone creation form page.
   */
  static newForm(req, res) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(AnnouncementViews.renderNewForm());
  }

  /**
   * POST /announcements
   * Web Form Action: Create new announcement.
   */
  static create(req, res) {
    const isHtml = req.headers.accept && req.headers.accept.includes('text/html');
    const { title, content, author, category } = req.body || {};

    if (!title || !content) {
      if (isHtml || req.headers['content-type']?.includes('application/x-www-form-urlencoded')) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.status(400).send(AnnouncementViews.renderError('Title and content are required fields.', '/announcements#new-announcement'));
      }
      return res.status(400).json({ status: 'error', message: 'Title and content are required fields.' });
    }

    try {
      const created = AnnouncementModel.create({
        title,
        content,
        author,
        category
      });

      if (isHtml || req.headers['content-type']?.includes('application/x-www-form-urlencoded')) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.status(201).send(AnnouncementViews.renderCreateSuccess(created));
      }

      return res.status(201).json({
        status: 'success',
        message: 'Announcement created successfully',
        data: created
      });
    } catch (err) {
      if (isHtml || req.headers['content-type']?.includes('application/x-www-form-urlencoded')) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.status(err.statusCode || 400).send(AnnouncementViews.renderError(err.message, '/announcements#new-announcement'));
      }
      return res.status(err.statusCode || 400).json({ status: 'error', message: err.message });
    }
  }

  /**
   * GET /announcements/:id/edit
   * UI Form View: Pre-populated edit form page.
   */
  static editForm(req, res) {
    const id = parseInt(req.params.id, 10);
    const isHtml = req.headers.accept && req.headers.accept.includes('text/html');

    if (isNaN(id)) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.status(400).send(AnnouncementViews.renderError('Announcement ID must be a valid integer.'));
    }

    const item = AnnouncementModel.getById(id);
    if (!item) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.status(404).send(AnnouncementViews.renderError(`Announcement with ID #${id} not found.`));
    }

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(AnnouncementViews.renderEditForm(item));
  }

  /**
   * POST /announcements/:id/edit & PUT /announcements/:id
   * Web Form Action: Update announcement record.
   */
  static update(req, res) {
    const id = parseInt(req.params.id, 10);
    const isHtml = req.headers.accept && req.headers.accept.includes('text/html');

    if (isNaN(id)) {
      if (isHtml || req.headers['content-type']?.includes('application/x-www-form-urlencoded')) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.status(400).send(AnnouncementViews.renderError('Announcement ID must be a valid integer.'));
      }
      return res.status(400).json({ status: 'error', message: 'Announcement ID must be a valid integer.' });
    }

    const existing = AnnouncementModel.getById(id);
    if (!existing) {
      if (isHtml || req.headers['content-type']?.includes('application/x-www-form-urlencoded')) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.status(404).send(AnnouncementViews.renderError(`Announcement with ID #${id} not found.`));
      }
      return res.status(404).json({ status: 'error', message: `Announcement with ID #${id} not found.` });
    }

    try {
      const updated = AnnouncementModel.update(id, req.body || {});

      if (isHtml || req.headers['content-type']?.includes('application/x-www-form-urlencoded')) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.status(200).send(AnnouncementViews.renderUpdateSuccess(updated));
      }

      return res.status(200).json({
        status: 'success',
        message: 'Announcement updated successfully',
        data: updated
      });
    } catch (err) {
      if (isHtml || req.headers['content-type']?.includes('application/x-www-form-urlencoded')) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.status(err.statusCode || 400).send(AnnouncementViews.renderError(err.message, `/announcements/${id}/edit`));
      }
      return res.status(err.statusCode || 400).json({ status: 'error', message: err.message });
    }
  }

  /**
   * POST /announcements/:id/delete & DELETE /announcements/:id
   * Web Form Action: Delete announcement record.
   */
  static deleteAction(req, res) {
    const id = parseInt(req.params.id, 10);
    const isHtml = req.headers.accept && req.headers.accept.includes('text/html');

    if (isNaN(id)) {
      if (isHtml || req.headers['content-type']?.includes('application/x-www-form-urlencoded')) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.status(400).send(AnnouncementViews.renderError('Announcement ID must be a valid integer.'));
      }
      return res.status(400).json({ status: 'error', message: 'Announcement ID must be a valid integer.' });
    }

    const deleted = AnnouncementModel.delete(id);
    if (!deleted) {
      if (isHtml || req.headers['content-type']?.includes('application/x-www-form-urlencoded')) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.status(404).send(AnnouncementViews.renderError(`Announcement with ID #${id} not found.`));
      }
      return res.status(404).json({ status: 'error', message: `Announcement with ID #${id} not found.` });
    }

    if (isHtml || req.headers['content-type']?.includes('application/x-www-form-urlencoded')) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.status(200).send(AnnouncementViews.renderDeleteSuccess(deleted));
    }

    return res.status(200).json({
      status: 'success',
      message: `Announcement with ID #${id} deleted successfully.`,
      data: deleted
    });
  }
}

// Aliases
AnnouncementController.getAll = AnnouncementController.list;
AnnouncementController.getById = AnnouncementController.detail;
AnnouncementController.remove = AnnouncementController.deleteAction;

module.exports = AnnouncementController;
