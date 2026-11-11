/**
 * API Application Routes
 * 
 * Maps RESTful API endpoints (/api/applications) to ApiApplicationController.
 * Manages job application submissions and review workflow.
 * 
 * References: docs/ddd.md (Section 3.4, 4, 6.4, 8)
 */

const express = require('express');
const router = express.Router();
const ApiApplicationController = require('../controllers/apiApplicationController');
const asyncHandler = require('../middlewares/asyncHandler');

// REST API collection routes
router.get('/api/applications', asyncHandler(ApiApplicationController.getAll));
router.post('/api/applications', asyncHandler(ApiApplicationController.create));

// REST API single resource routes by ID
router.get('/api/applications/:id', asyncHandler(ApiApplicationController.getById));
router.put('/api/applications/:id', asyncHandler(ApiApplicationController.update));
router.patch('/api/applications/:id', asyncHandler(ApiApplicationController.patch));
router.delete('/api/applications/:id', asyncHandler(ApiApplicationController.delete));

module.exports = router;
