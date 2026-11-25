/**
 * Admin Controller (Protected Platform Administration)
 *
 * Handles /admin dashboard rendering and full data manipulation for
 * Users, Job Postings, Announcements, and Applications.
 * All routes are protected by requireAuth + requireRole('Admin').
 */

const UserModel = require('../models/userModel');
const JobPostingModel = require('../models/jobPostingModel');
const AnnouncementModel = require('../models/announcementModel');
const ApplicationModel = require('../models/applicationModel');
const AdminViews = require('../views/adminViews');

class AdminController {
  /**
   * GET /admin
   * Render the unified Alumly iOS Glassmorphism Admin Dashboard.
   */
  static async dashboard(req, res) {
    const [users, jobs, announcements, applications] = await Promise.all([
      UserModel.findAll(),
      JobPostingModel.getAllWithPoster(),
      AnnouncementModel.getAll(),
      ApplicationModel.getAllWithDetails()
    ]);

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(
      AdminViews.renderDashboard({
        users,
        jobs,
        announcements,
        applications,
        currentUser: req.session.user,
        query: req.query || {}
      })
    );
  }

  /**
   * POST /admin/users/:id/role
   * Update a user's role inline (Student / Alumni / Faculty / Teacher / Admin).
   */
  static async updateUserRole(req, res) {
    const targetId = parseInt(req.params.id, 10);
    const newRole = req.body?.role ? String(req.body.role).trim().toLowerCase() : '';

    if (isNaN(targetId)) {
      return res.redirect('/admin?tab=users&msg=Invalid%20user%20ID.&type=error');
    }

    if (Number(req.session.user.id) === targetId && newRole !== 'admin') {
      return res.redirect(
        '/admin?tab=users&msg=You%20cannot%20remove%20your%20own%20Admin%20role.&type=error'
      );
    }

    try {
      const updated = await UserModel.patch(targetId, { role: newRole });
      if (!updated) {
        return res.redirect('/admin?tab=users&msg=User%20not%20found.&type=error');
      }
      const msg = encodeURIComponent(`Updated ${updated.name}'s role to ${updated.role}.`);
      return res.redirect(`/admin?tab=users&msg=${msg}&type=success`);
    } catch (err) {
      return res.redirect(`/admin?tab=users&msg=${encodeURIComponent(err.message)}&type=error`);
    }
  }

  /**
   * POST /admin/users/:id/delete
   * Delete a user record (strictly prevents Admin from deleting their own active account).
   */
  static async deleteUser(req, res) {
    const targetId = parseInt(req.params.id, 10);

    if (isNaN(targetId)) {
      return res.redirect('/admin?tab=users&msg=Invalid%20user%20ID.&type=error');
    }

    if (Number(req.session.user.id) === targetId) {
      return res.redirect(
        '/admin?tab=users&msg=You%20cannot%20delete%20your%20own%20active%20Admin%20account.&type=error'
      );
    }

    const deleted = await UserModel.delete(targetId);
    if (!deleted) {
      return res.redirect('/admin?tab=users&msg=User%20not%20found.&type=error');
    }

    const msg = encodeURIComponent(`User "${deleted.name}" has been deleted.`);
    return res.redirect(`/admin?tab=users&msg=${msg}&type=success`);
  }

  /**
   * POST /admin/jobs/:id/delete
   * Delete a job posting from the Admin Panel.
   */
  static async deleteJob(req, res) {
    const jobId = parseInt(req.params.id, 10);
    if (isNaN(jobId)) {
      return res.redirect('/admin?tab=jobs&msg=Invalid%20job%20ID.&type=error');
    }

    const deleted = await JobPostingModel.delete(jobId);
    if (!deleted) {
      return res.redirect('/admin?tab=jobs&msg=Job%20posting%20not%20found.&type=error');
    }

    const msg = encodeURIComponent(`Job posting "${deleted.title}" deleted.`);
    return res.redirect(`/admin?tab=jobs&msg=${msg}&type=success`);
  }

  /**
   * POST /admin/announcements
   * Quick-publish a new institutional announcement from the Admin Panel.
   */
  static async createAnnouncement(req, res) {
    try {
      const created = await AnnouncementModel.create({
        title: req.body?.title,
        content: req.body?.content,
        category: req.body?.category || 'General',
        author: req.body?.author || req.session.user.name || 'Alumni Relations Office',
        authorId: req.session.user.id
      });
      const msg = encodeURIComponent(`Announcement "${created.title}" published.`);
      return res.redirect(`/admin?tab=announcements&msg=${msg}&type=success`);
    } catch (err) {
      return res.redirect(`/admin?tab=announcements&msg=${encodeURIComponent(err.message)}&type=error`);
    }
  }

  /**
   * POST /admin/announcements/:id/delete
   * Delete an announcement from the Admin Panel.
   */
  static async deleteAnnouncement(req, res) {
    const annId = parseInt(req.params.id, 10);
    if (isNaN(annId)) {
      return res.redirect('/admin?tab=announcements&msg=Invalid%20announcement%20ID.&type=error');
    }

    const deleted = await AnnouncementModel.delete(annId);
    if (!deleted) {
      return res.redirect('/admin?tab=announcements&msg=Announcement%20not%20found.&type=error');
    }

    const msg = encodeURIComponent(`Announcement "${deleted.title}" deleted.`);
    return res.redirect(`/admin?tab=announcements&msg=${msg}&type=success`);
  }

  /**
   * POST /admin/applications/:id/status
   * Update an application's recruitment pipeline status from the Admin Panel.
   */
  static async updateApplicationStatus(req, res) {
    const appId = parseInt(req.params.id, 10);
    const status = req.body?.status ? String(req.body.status).trim() : '';

    if (isNaN(appId)) {
      return res.redirect('/admin?tab=applications&msg=Invalid%20application%20ID.&type=error');
    }

    try {
      const updated = await ApplicationModel.patch(appId, { status });
      if (!updated) {
        return res.redirect('/admin?tab=applications&msg=Application%20not%20found.&type=error');
      }
      const msg = encodeURIComponent(`Application #${appId} status updated to "${updated.status}".`);
      return res.redirect(`/admin?tab=applications&msg=${msg}&type=success`);
    } catch (err) {
      return res.redirect(`/admin?tab=applications&msg=${encodeURIComponent(err.message)}&type=error`);
    }
  }

  /**
   * POST /admin/applications/:id/delete
   * Delete an application record from the Admin Panel.
   */
  static async deleteApplication(req, res) {
    const appId = parseInt(req.params.id, 10);
    if (isNaN(appId)) {
      return res.redirect('/admin?tab=applications&msg=Invalid%20application%20ID.&type=error');
    }

    const deleted = await ApplicationModel.delete(appId);
    if (!deleted) {
      return res.redirect('/admin?tab=applications&msg=Application%20not%20found.&type=error');
    }

    const msg = encodeURIComponent(`Application #${appId} removed.`);
    return res.redirect(`/admin?tab=applications&msg=${msg}&type=success`);
  }
}

module.exports = AdminController;
