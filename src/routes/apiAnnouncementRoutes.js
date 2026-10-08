/**
 * API Announcement Routes
 * Maps RESTful API endpoints (/api/announcements) to ApiAnnouncementController.
 */

const express = require('express');
const router = express.Router();
const ApiAnnouncementController = require('../controllers/apiAnnouncementController');

// REST API collection routes
router.get('/api/announcements', ApiAnnouncementController.getAll);
router.post('/api/announcements', ApiAnnouncementController.create);

// REST API single resource routes by ID
router.get('/api/announcements/:id', ApiAnnouncementController.getById);
router.put('/api/announcements/:id', ApiAnnouncementController.update);
router.patch('/api/announcements/:id', ApiAnnouncementController.update);
router.delete('/api/announcements/:id', ApiAnnouncementController.remove);

module.exports = router;
