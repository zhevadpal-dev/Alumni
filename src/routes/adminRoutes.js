/**
 * Admin Panel Routes (/admin)
 *
 * Strictly protected by requireAuth + requireRole('Admin').
 * Provides unified management for Users, Job Postings, Announcements, and Applications.
 */

const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');
const asyncHandler = require('../middlewares/asyncHandler');
const { requireAuth, requireRole } = require('../middlewares/authMiddleware');

const adminOnly = [requireAuth, requireRole('Admin')];

// Admin Dashboard
router.get('/admin', ...adminOnly, asyncHandler(AdminController.dashboard));

// Users Management
router.post('/admin/users/:id/role', ...adminOnly, asyncHandler(AdminController.updateUserRole));
router.post('/admin/users/:id/delete', ...adminOnly, asyncHandler(AdminController.deleteUser));

// Jobs Management
router.post('/admin/jobs/:id/delete', ...adminOnly, asyncHandler(AdminController.deleteJob));

// Announcements Management
router.post('/admin/announcements', ...adminOnly, asyncHandler(AdminController.createAnnouncement));
router.post('/admin/announcements/:id/delete', ...adminOnly, asyncHandler(AdminController.deleteAnnouncement));

// Applications Management
router.post('/admin/applications/:id/status', ...adminOnly, asyncHandler(AdminController.updateApplicationStatus));
router.post('/admin/applications/:id/delete', ...adminOnly, asyncHandler(AdminController.deleteApplication));

module.exports = router;
