/**
 * Web Job Posting Routes
 * 
 * Maps web UI / management endpoints (/jobs) to JobController.
 */

const express = require('express');
const router = express.Router();
const JobController = require('../controllers/jobController');
const asyncHandler = require('../middlewares/asyncHandler');
const { requireAuth, requireRole } = require('../middlewares/authMiddleware');

const JOB_PUBLISHER_ROLES = ['alumni', 'faculty', 'teacher', 'admin'];

// 1. READ (Public read-only Job Board browsing)
router.get('/jobs', asyncHandler(JobController.list));

// 2. CREATE (Role-restricted: Alumni, Faculty, Teacher, Admin)
router.get('/jobs/new', requireAuth, requireRole(...JOB_PUBLISHER_ROLES), asyncHandler(JobController.newForm));
router.post('/jobs', requireAuth, requireRole(...JOB_PUBLISHER_ROLES), asyncHandler(JobController.create));

// 3. READ (Public read-only single job detail view)
router.get('/jobs/:id', asyncHandler(JobController.detail));

// 4. UPDATE (Role-restricted: Alumni, Faculty, Teacher, Admin)
router.get('/jobs/:id/edit', requireAuth, requireRole(...JOB_PUBLISHER_ROLES), asyncHandler(JobController.editForm));
router.post('/jobs/:id/edit', requireAuth, requireRole(...JOB_PUBLISHER_ROLES), asyncHandler(JobController.update));
router.put('/jobs/:id', requireAuth, requireRole(...JOB_PUBLISHER_ROLES), asyncHandler(JobController.update));

// 5. DELETE (Role-restricted: Alumni, Faculty, Teacher, Admin)
router.post('/jobs/:id/delete', requireAuth, requireRole(...JOB_PUBLISHER_ROLES), asyncHandler(JobController.deleteAction));
router.delete('/jobs/:id', requireAuth, requireRole(...JOB_PUBLISHER_ROLES), asyncHandler(JobController.deleteAction));

// 6. APPLY (Any authenticated user can submit an application)
router.post('/jobs/:id/apply', requireAuth, asyncHandler(JobController.apply));

module.exports = router;
