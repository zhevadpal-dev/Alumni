/**
 * Personal Workspace Routes
 *
 * Maps data-isolated, user-specific endpoints:
 * - GET /my-applications (Any authenticated user)
 * - GET /my-jobs         (Alumni, Faculty, Teacher, Admin)
 * - GET /profile         (Any authenticated user -> /users/:id)
 */

const express = require('express');
const router = express.Router();
const WorkspaceController = require('../controllers/workspaceController');
const asyncHandler = require('../middlewares/asyncHandler');
const { requireAuth, requireRole } = require('../middlewares/authMiddleware');

const JOB_PUBLISHER_ROLES = ['alumni', 'faculty', 'teacher', 'admin'];

router.get('/my-applications', requireAuth, asyncHandler(WorkspaceController.myApplications));
router.get('/my-jobs', requireAuth, requireRole(...JOB_PUBLISHER_ROLES), asyncHandler(WorkspaceController.myJobs));
router.get('/profile', requireAuth, asyncHandler(WorkspaceController.profileShortcut));

module.exports = router;
