/**
 * Web Announcement Routes
 * Maps web UI / management endpoints (/announcements) to AnnouncementController.
 */

const express = require('express');
const router = express.Router();
const AnnouncementController = require('../controllers/announcementController');

// 1. READ (List view with embedded creation form)
router.get('/announcements', AnnouncementController.list);

// 2. CREATE (Standalone creation form & POST action)
router.get('/announcements/new', AnnouncementController.newForm);
router.post('/announcements', AnnouncementController.create);

// 3. READ (Single announcement detail view)
router.get('/announcements/:id', AnnouncementController.detail);

// 4. UPDATE (Edit form view & update actions)
router.get('/announcements/:id/edit', AnnouncementController.editForm);
router.post('/announcements/:id/edit', AnnouncementController.update);
router.put('/announcements/:id', AnnouncementController.update);
router.patch('/announcements/:id', AnnouncementController.update);

// 5. DELETE (Delete action via web form POST or DELETE verb)
router.post('/announcements/:id/delete', AnnouncementController.deleteAction);
router.delete('/announcements/:id', AnnouncementController.deleteAction);

module.exports = router;
