/**
 * Web Application Tracking Routes
 * 
 * Maps web UI / management endpoints (/applications) to ApplicationController.
 */

const express = require('express');
const router = express.Router();
const ApplicationController = require('../controllers/applicationController');
const asyncHandler = require('../middlewares/asyncHandler');
const { requireAuth, requireRole } = require('../middlewares/authMiddleware');

const REVIEWER_ROLES = ['alumni', 'faculty', 'teacher', 'admin'];

// 1. READ (Authenticated applications dashboard)
router.get('/applications', requireAuth, asyncHandler(ApplicationController.list));

// 2. CREATE (Authenticated application submission)
router.post('/applications', requireAuth, asyncHandler(ApplicationController.create));

// 3. READ (Authenticated single application dossier view)
router.get('/applications/:id', requireAuth, asyncHandler(ApplicationController.detail));

// 4. UPDATE (Advance application review status — reviewer roles only)
router.post('/applications/:id/status', requireAuth, requireRole(...REVIEWER_ROLES), asyncHandler(ApplicationController.updateStatus));
router.put('/applications/:id/status', requireAuth, requireRole(...REVIEWER_ROLES), asyncHandler(ApplicationController.updateStatus));

// 5. DELETE (Withdraw or remove application record — authenticated)
router.post('/applications/:id/delete', requireAuth, asyncHandler(ApplicationController.deleteAction));
router.delete('/applications/:id', requireAuth, asyncHandler(ApplicationController.deleteAction));

module.exports = router;
