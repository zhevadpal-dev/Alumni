/**
 * Workspace Controller
 *
 * Serves personalized, data-isolated user workspaces strictly scoped to
 * `req.session.user.id`:
 * - GET /my-applications : Logged-in user's own job applications
 * - GET /my-jobs         : Logged-in Alumni/Faculty/Admin's own posted jobs
 * - GET /profile         : Personal profile shortcut -> /users/:id
 */

const UserModel = require('../models/userModel');
const JobPostingModel = require('../models/jobPostingModel');
const WorkspaceViews = require('../views/workspaceViews');

class WorkspaceController {
  /**
   * GET /my-applications
   * Strictly filters applications by req.session.user.id.
   */
  static async myApplications(req, res) {
    const user = req.session.user;
    const applications = await UserModel.getApplications(user.id);

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(
      WorkspaceViews.renderMyApplicationsPage({
        user,
        applications,
        query: req.query || {}
      })
    );
  }

  /**
   * GET /my-jobs
   * Strictly filters job postings by poster_id = req.session.user.id.
   */
  static async myJobs(req, res) {
    const user = req.session.user;
    const jobs = await JobPostingModel.getByPosterWithApplicantCount(user.id);

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(
      WorkspaceViews.renderMyJobsPage({
        user,
        jobs,
        query: req.query || {}
      })
    );
  }

  /**
   * GET /profile
   * Cleanly redirects authenticated users to their own profile detail page.
   */
  static async profileShortcut(req, res) {
    return res.redirect(`/users/${req.session.user.id}`);
  }
}

module.exports = WorkspaceController;
