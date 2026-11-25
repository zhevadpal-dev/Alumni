/**
 * Web Announcement Routes
 * Maps web UI / management endpoints (/announcements) to AnnouncementController.
 */

const express = require('express');
const router = express.Router();
const AnnouncementController = require('../controllers/announcementController');
const asyncHandler = require('../middlewares/asyncHandler');
const { requireAuth, requireRole } = require('../middlewares/authMiddleware');

const ANNOUNCEMENT_AUTHOR_ROLES = ['faculty', 'teacher', 'admin'];

// 1. READ (Public read-only Announcements browsing)
router.get('/announcements', asyncHandler(AnnouncementController.list));

// 2. CREATE (Role-restricted: Faculty, Teacher, Admin)
router.get('/announcements/new', requireAuth, requireRole(...ANNOUNCEMENT_AUTHOR_ROLES), asyncHandler(AnnouncementController.newForm));
router.post('/announcements', requireAuth, requireRole(...ANNOUNCEMENT_AUTHOR_ROLES), asyncHandler(AnnouncementController.create));

// 3. READ (Public read-only single announcement detail view)
router.get('/announcements/:id', asyncHandler(AnnouncementController.detail));

// 4. UPDATE (Role-restricted: Faculty, Teacher, Admin)
router.get('/announcements/:id/edit', requireAuth, requireRole(...ANNOUNCEMENT_AUTHOR_ROLES), asyncHandler(AnnouncementController.editForm));
router.post('/announcements/:id/edit', requireAuth, requireRole(...ANNOUNCEMENT_AUTHOR_ROLES), asyncHandler(AnnouncementController.update));
router.put('/announcements/:id', requireAuth, requireRole(...ANNOUNCEMENT_AUTHOR_ROLES), asyncHandler(AnnouncementController.update));
router.patch('/announcements/:id', requireAuth, requireRole(...ANNOUNCEMENT_AUTHOR_ROLES), asyncHandler(AnnouncementController.update));

// 5. DELETE (Role-restricted: Faculty, Teacher, Admin)
router.post('/announcements/:id/delete', requireAuth, requireRole(...ANNOUNCEMENT_AUTHOR_ROLES), asyncHandler(AnnouncementController.deleteAction));
router.delete('/announcements/:id', requireAuth, requireRole(...ANNOUNCEMENT_AUTHOR_ROLES), asyncHandler(AnnouncementController.deleteAction));

module.exports = router;
