/**
 * API Announcement Routes
 * Maps RESTful API endpoints (/api/announcements) to ApiAnnouncementController.
 */

const express = require('express');
const router = express.Router();
const ApiAnnouncementController = require('../controllers/apiAnnouncementController');
const asyncHandler = require('../middlewares/asyncHandler');

// REST API collection routes
router.get('/api/announcements', asyncHandler(ApiAnnouncementController.getAll));
router.post('/api/announcements', asyncHandler(ApiAnnouncementController.create));

// REST API single resource routes by ID
router.get('/api/announcements/:id', asyncHandler(ApiAnnouncementController.getById));
router.put('/api/announcements/:id', asyncHandler(ApiAnnouncementController.update));
router.patch('/api/announcements/:id', asyncHandler(ApiAnnouncementController.update));
router.delete('/api/announcements/:id', asyncHandler(ApiAnnouncementController.remove));

// REST API relational sub-route
router.get('/api/announcements/:id/author', asyncHandler(ApiAnnouncementController.getAuthor));

module.exports = router;
