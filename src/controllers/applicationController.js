/**
 * Web Application Controller (MVC UI / Tracking Interface)
 * 
 * Serves the server-rendered HTML management interface for job applications:
 * - list: Renders applications tracking dashboard with filter toolbar & manual submission form (/applications)
 * - detail: Renders single application dossier with candidate card and review workflow panel (/applications/:id)
 * - create: Handles manual application submission (POST /applications)
 * - updateStatus: Advances application review workflow status (POST /applications/:id/status)
 * - deleteAction: Handles application withdrawal/deletion (POST /applications/:id/delete, DELETE /applications/:id)
 */

const ApplicationModel = require('../models/applicationModel');
const JobPostingModel = require('../models/jobPostingModel');
const UserModel = require('../models/userModel');
const ApplicationViews = require('../views/applicationViews');

class ApplicationController {
  /**
   * GET /applications
   * UI Dashboard View: Tabular listing of candidate applications with metrics and registration form.
   */
  static async list(req, res) {
    try {
      const isHtml = req.headers.accept && req.headers.accept.includes('text/html');
      const [applications, jobs, users] = await Promise.all([
        ApplicationModel.getAllWithDetails(req.query),
        JobPostingModel.getAll(),
        UserModel.findAll()
      ]);

      const stats = {
        totalSubmissions: applications.length,
        underReview: applications.filter(a => a.status === 'Under Review').length,
        shortlisted: applications.filter(a => a.status === 'Shortlisted' || a.status === 'Interview Scheduled').length,
        accepted: applications.filter(a => a.status === 'Accepted').length
      };

      if (isHtml || !req.headers.accept || req.headers.accept.includes('*/*')) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.status(200).send(ApplicationViews.renderList(applications, stats, req.query, jobs, users));
      }

      return res.status(200).json({
        status: 'success',
        count: applications.length,
        data: applications
      });
    } catch (err) {
      const isHtml = req.headers.accept && req.headers.accept.includes('text/html');
      if (isHtml || !req.headers.accept || req.headers.accept.includes('*/*')) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.status(500).send(ApplicationViews.renderError(err.message || 'Failed to retrieve applications.', '/applications'));
      }
      return res.status(500).json({ status: 'error', message: err.message });
    }
  }

  /**
   * GET /applications/:id
   * UI Dossier View: Single candidate application dossier with profile, cover letter, resume, and workflow transition.
   */
  static async detail(req, res) {
    const id = parseInt(req.params.id, 10);
    const isHtml = req.headers.accept && req.headers.accept.includes('text/html');

    if (isNaN(id)) {
      if (isHtml || !req.headers.accept || req.headers.accept.includes('*/*')) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.status(400).send(ApplicationViews.renderError('Application ID must be a valid integer.', '/applications'));
      }
      return res.status(400).json({ status: 'error', message: 'Application ID must be a valid integer.' });
    }

    try {
      const application = await ApplicationModel.getByIdWithDetails(id);
      if (!application) {
        if (isHtml || !req.headers.accept || req.headers.accept.includes('*/*')) {
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          return res.status(404).send(ApplicationViews.renderError(`Application with ID #${id} not found.`, '/applications'));
        }
        return res.status(404).json({ status: 'error', message: `Application with ID #${id} not found.` });
      }

      if (isHtml || !req.headers.accept || req.headers.accept.includes('*/*')) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.status(200).send(ApplicationViews.renderDetail(application, req.query));
      }

      return res.status(200).json({ status: 'success', data: application });
    } catch (err) {
      if (isHtml || !req.headers.accept || req.headers.accept.includes('*/*')) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.status(500).send(ApplicationViews.renderError(err.message, '/applications'));
      }
      return res.status(500).json({ status: 'error', message: err.message });
    }
  }

  /**
   * POST /applications
   * Web Form Action: Register and persist candidate application directly in PostgreSQL.
   */
  static async create(req, res) {
    const isHtml = req.headers.accept && req.headers.accept.includes('text/html');
    const isUrlEncoded = req.headers['content-type']?.includes('application/x-www-form-urlencoded');

    try {
      const created = await ApplicationModel.create(req.body);

      if (isHtml || isUrlEncoded) {
        return res.redirect(`/applications?status=created&id=${created.id}`);
      }

      return res.status(201).json({
        status: 'success',
        message: 'Application registered successfully',
        data: created
      });
    } catch (err) {
      if (isHtml || isUrlEncoded) {
        const errorMsg = encodeURIComponent(err.message || 'Failed to submit application.');
        return res.redirect(`/applications?error=${errorMsg}`);
      }
      return res.status(err.statusCode || 400).json({ status: 'error', message: err.message });
    }
  }

  /**
   * POST /applications/:id/status
   * Web Form Action: Update review status and notes for an application.
   */
  static async updateStatus(req, res) {
    const id = parseInt(req.params.id, 10);
    const isHtml = req.headers.accept && req.headers.accept.includes('text/html');
    const isUrlEncoded = req.headers['content-type']?.includes('application/x-www-form-urlencoded');

    if (isNaN(id)) {
      if (isHtml || isUrlEncoded) {
        return res.redirect('/applications?error=Invalid+application+ID');
      }
      return res.status(400).json({ status: 'error', message: 'Invalid application ID.' });
    }

    try {
      const { status, notes } = req.body || {};
      const updated = await ApplicationModel.update(id, { status, notes });

      if (!updated) {
        if (isHtml || isUrlEncoded) {
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          return res.status(404).send(ApplicationViews.renderError(`Application #${id} not found.`, '/applications'));
        }
        return res.status(404).json({ status: 'error', message: `Application #${id} not found.` });
      }

      if (isHtml || isUrlEncoded) {
        return res.redirect(`/applications/${id}?status=updated`);
      }

      return res.status(200).json({
        status: 'success',
        message: 'Application review status updated successfully',
        data: updated
      });
    } catch (err) {
      if (isHtml || isUrlEncoded) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.status(err.statusCode || 400).send(ApplicationViews.renderError(err.message, `/applications/${id}`));
      }
      return res.status(err.statusCode || 400).json({ status: 'error', message: err.message });
    }
  }

  /**
   * POST /applications/:id/delete & DELETE /applications/:id
   * Web Form Action: Delete / withdraw application record from PostgreSQL.
   */
  static async deleteAction(req, res) {
    const id = parseInt(req.params.id, 10);
    const isHtml = req.headers.accept && req.headers.accept.includes('text/html');
    const isUrlEncoded = req.headers['content-type']?.includes('application/x-www-form-urlencoded');

    if (isNaN(id)) {
      if (isHtml || isUrlEncoded) {
        return res.redirect('/applications?error=Invalid+application+ID');
      }
      return res.status(400).json({ status: 'error', message: 'Invalid application ID.' });
    }

    try {
      const deleted = await ApplicationModel.delete(id);
      if (!deleted) {
        if (isHtml || isUrlEncoded) {
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          return res.status(404).send(ApplicationViews.renderError(`Application #${id} not found.`, '/applications'));
        }
        return res.status(404).json({ status: 'error', message: `Application #${id} not found.` });
      }

      if (isHtml || isUrlEncoded) {
        return res.redirect('/applications?status=deleted');
      }

      return res.status(200).json({
        status: 'success',
        message: `Application #${id} deleted successfully.`,
        data: deleted
      });
    } catch (err) {
      if (isHtml || isUrlEncoded) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.status(500).send(ApplicationViews.renderError(err.message, `/applications/${id}`));
      }
      return res.status(500).json({ status: 'error', message: err.message });
    }
  }
}

module.exports = ApplicationController;
