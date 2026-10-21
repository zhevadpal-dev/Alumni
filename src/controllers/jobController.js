/**
 * Web Job Posting Controller (MVC UI / Management Interface)
 * 
 * Serves the server-rendered HTML management interface for career opportunities:
 * - list: Renders directory board with metrics, filters, and quick-post form (/jobs)
 * - detail: Renders single job view with applicant list and candidate apply form (/jobs/:id)
 * - newForm: Renders standalone job posting creation page (/jobs/new)
 * - editForm: Renders pre-populated edit form (/jobs/:id/edit)
 * - create: Handles web creation submissions (POST /jobs)
 * - update: Handles edit submissions (POST /jobs/:id/edit, PUT /jobs/:id)
 * - deleteAction: Handles deletion requests (POST /jobs/:id/delete, DELETE /jobs/:id)
 * - apply: Handles candidate job application submissions (POST /jobs/:id/apply)
 */

const JobPostingModel = require('../models/jobPostingModel');
const ApplicationModel = require('../models/applicationModel');
const UserModel = require('../models/userModel');
const JobViews = require('../views/jobViews');

class JobController {
  /**
   * GET /jobs
   * UI List View: Table/Cards of job opportunities with metrics, search filter, and quick-post form.
   */
  static async list(req, res) {
    try {
      const isHtml = req.headers.accept && req.headers.accept.includes('text/html');
      const [jobs, users, applications] = await Promise.all([
        JobPostingModel.getAllWithPoster(req.query),
        UserModel.findAll(),
        ApplicationModel.getAll()
      ]);

      const stats = {
        totalApplications: applications.length
      };

      if (isHtml || !req.headers.accept || req.headers.accept.includes('*/*')) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.status(200).send(JobViews.renderList(jobs, stats, req.query, users));
      }

      return res.status(200).json({
        status: 'success',
        count: jobs.length,
        data: jobs
      });
    } catch (err) {
      const isHtml = req.headers.accept && req.headers.accept.includes('text/html');
      if (isHtml || !req.headers.accept || req.headers.accept.includes('*/*')) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.status(500).send(JobViews.renderError(err.message || 'Failed to load job listings.', '/jobs'));
      }
      return res.status(500).json({ status: 'error', message: err.message });
    }
  }

  /**
   * GET /jobs/:id
   * UI Detail View: Single job opportunity overview with embedded candidate application form and received applications.
   */
  static async detail(req, res) {
    const id = parseInt(req.params.id, 10);
    const isHtml = req.headers.accept && req.headers.accept.includes('text/html');

    if (isNaN(id)) {
      if (isHtml || !req.headers.accept || req.headers.accept.includes('*/*')) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.status(400).send(JobViews.renderError('Job posting ID must be a valid integer.', '/jobs'));
      }
      return res.status(400).json({ status: 'error', message: 'Job posting ID must be a valid integer.' });
    }

    try {
      const job = await JobPostingModel.getByIdWithPoster(id);
      if (!job) {
        if (isHtml || !req.headers.accept || req.headers.accept.includes('*/*')) {
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          return res.status(404).send(JobViews.renderError(`Job posting with ID #${id} not found.`, '/jobs'));
        }
        return res.status(404).json({ status: 'error', message: `Job posting with ID #${id} not found.` });
      }

      const [applications, users] = await Promise.all([
        JobPostingModel.getApplications(id),
        UserModel.findAll()
      ]);

      if (isHtml || !req.headers.accept || req.headers.accept.includes('*/*')) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.status(200).send(JobViews.renderDetail(job, applications, users, req.query));
      }

      return res.status(200).json({ status: 'success', data: job, applications });
    } catch (err) {
      if (isHtml || !req.headers.accept || req.headers.accept.includes('*/*')) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.status(500).send(JobViews.renderError(err.message, '/jobs'));
      }
      return res.status(500).json({ status: 'error', message: err.message });
    }
  }

  /**
   * GET /jobs/new
   * UI Form View: Standalone job opportunity creation form.
   */
  static async newForm(req, res) {
    try {
      const users = await UserModel.findAll();
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.status(200).send(JobViews.renderNewForm(users, req.query));
    } catch (err) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.status(500).send(JobViews.renderError(err.message, '/jobs'));
    }
  }

  /**
   * POST /jobs
   * Web Form Action: Create and persist new job posting in PostgreSQL.
   */
  static async create(req, res) {
    const isHtml = req.headers.accept && req.headers.accept.includes('text/html');
    const isUrlEncoded = req.headers['content-type']?.includes('application/x-www-form-urlencoded');

    try {
      const body = { ...req.body };
      if (body.posterId === '' || body.posterId === undefined) {
        delete body.posterId;
      }

      const created = await JobPostingModel.create(body);

      if (isHtml || isUrlEncoded) {
        return res.redirect(`/jobs?status=created&id=${created.id}`);
      }

      return res.status(201).json({
        status: 'success',
        message: 'Job posting created successfully',
        data: created
      });
    } catch (err) {
      if (isHtml || isUrlEncoded) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.status(err.statusCode || 400).send(JobViews.renderError(err.message, '/jobs/new'));
      }
      return res.status(err.statusCode || 400).json({ status: 'error', message: err.message });
    }
  }

  /**
   * GET /jobs/:id/edit
   * UI Form View: Pre-populated edit form for existing job posting.
   */
  static async editForm(req, res) {
    const id = parseInt(req.params.id, 10);
    const isHtml = req.headers.accept && req.headers.accept.includes('text/html');

    if (isNaN(id)) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.status(400).send(JobViews.renderError('Job posting ID must be a valid integer.', '/jobs'));
    }

    try {
      const [job, users] = await Promise.all([
        JobPostingModel.getById(id),
        UserModel.findAll()
      ]);

      if (!job) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.status(404).send(JobViews.renderError(`Job posting #${id} not found.`, '/jobs'));
      }

      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.status(200).send(JobViews.renderEditForm(job, users, req.query));
    } catch (err) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.status(500).send(JobViews.renderError(err.message, '/jobs'));
    }
  }

  /**
   * POST /jobs/:id/edit & PUT /jobs/:id
   * Web Form Action: Update existing job posting attributes in PostgreSQL.
   */
  static async update(req, res) {
    const id = parseInt(req.params.id, 10);
    const isHtml = req.headers.accept && req.headers.accept.includes('text/html');
    const isUrlEncoded = req.headers['content-type']?.includes('application/x-www-form-urlencoded');

    if (isNaN(id)) {
      if (isHtml || isUrlEncoded) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.status(400).send(JobViews.renderError('Job posting ID must be a valid integer.', '/jobs'));
      }
      return res.status(400).json({ status: 'error', message: 'Job posting ID must be a valid integer.' });
    }

    try {
      const body = { ...req.body };
      if (body.posterId === '') {
        body.posterId = null;
      }

      const updated = await JobPostingModel.update(id, body);
      if (!updated) {
        if (isHtml || isUrlEncoded) {
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          return res.status(404).send(JobViews.renderError(`Job posting #${id} not found.`, '/jobs'));
        }
        return res.status(404).json({ status: 'error', message: `Job posting #${id} not found.` });
      }

      if (isHtml || isUrlEncoded) {
        return res.redirect(`/jobs/${id}?status=updated`);
      }

      return res.status(200).json({
        status: 'success',
        message: 'Job posting updated successfully',
        data: updated
      });
    } catch (err) {
      if (isHtml || isUrlEncoded) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.status(err.statusCode || 400).send(JobViews.renderError(err.message, `/jobs/${id}/edit`));
      }
      return res.status(err.statusCode || 400).json({ status: 'error', message: err.message });
    }
  }

  /**
   * POST /jobs/:id/delete & DELETE /jobs/:id
   * Web Form Action: Delete job posting from PostgreSQL.
   */
  static async deleteAction(req, res) {
    const id = parseInt(req.params.id, 10);
    const isHtml = req.headers.accept && req.headers.accept.includes('text/html');
    const isUrlEncoded = req.headers['content-type']?.includes('application/x-www-form-urlencoded');

    if (isNaN(id)) {
      if (isHtml || isUrlEncoded) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.status(400).send(JobViews.renderError('Job posting ID must be a valid integer.', '/jobs'));
      }
      return res.status(400).json({ status: 'error', message: 'Job posting ID must be a valid integer.' });
    }

    try {
      const deleted = await JobPostingModel.delete(id);
      if (!deleted) {
        if (isHtml || isUrlEncoded) {
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          return res.status(404).send(JobViews.renderError(`Job posting #${id} not found.`, '/jobs'));
        }
        return res.status(404).json({ status: 'error', message: `Job posting #${id} not found.` });
      }

      if (isHtml || isUrlEncoded) {
        return res.redirect('/jobs?status=deleted');
      }

      return res.status(200).json({
        status: 'success',
        message: `Job posting #${id} deleted successfully.`,
        data: deleted
      });
    } catch (err) {
      if (isHtml || isUrlEncoded) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.status(500).send(JobViews.renderError(err.message, `/jobs/${id}`));
      }
      return res.status(500).json({ status: 'error', message: err.message });
    }
  }

  /**
   * POST /jobs/:id/apply
   * Web Form Action: Submit a candidate job application for this position.
   */
  static async apply(req, res) {
    const jobId = parseInt(req.params.id, 10);
    const isHtml = req.headers.accept && req.headers.accept.includes('text/html');
    const isUrlEncoded = req.headers['content-type']?.includes('application/x-www-form-urlencoded');

    if (isNaN(jobId)) {
      if (isHtml || isUrlEncoded) {
        return res.redirect('/jobs?error=Invalid+job+posting+ID');
      }
      return res.status(400).json({ status: 'error', message: 'Invalid job posting ID.' });
    }

    try {
      const { userId, coverLetter, resumeUrl, notes } = req.body || {};
      if (!userId) {
        if (isHtml || isUrlEncoded) {
          return res.redirect(`/jobs/${jobId}?error=Please+select+a+candidate+profile+to+apply#apply-form`);
        }
        return res.status(400).json({ status: 'error', message: 'Candidate user ID is required.' });
      }

      const application = await ApplicationModel.create({
        userId: parseInt(userId, 10),
        jobId,
        status: 'Submitted',
        coverLetter,
        resumeUrl,
        notes
      });

      if (isHtml || isUrlEncoded) {
        return res.redirect(`/jobs/${jobId}?status=applied#apply-form`);
      }

      return res.status(201).json({
        status: 'success',
        message: 'Application submitted successfully',
        data: application
      });
    } catch (err) {
      if (isHtml || isUrlEncoded) {
        const errorMsg = encodeURIComponent(err.message || 'Failed to submit application.');
        return res.redirect(`/jobs/${jobId}?error=${errorMsg}#apply-form`);
      }
      return res.status(err.statusCode || 400).json({ status: 'error', message: err.message });
    }
  }
}

module.exports = JobController;
