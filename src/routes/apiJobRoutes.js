/**
 * API Job Posting Routes
 * 
 * Maps RESTful API endpoints (/api/jobs) to ApiJobController.
 * Includes direct resource collection, single resource, and relational sub-routes.
 */

const express = require('express');
const router = express.Router();
const ApiJobController = require('../controllers/apiJobController');
const asyncHandler = require('../middlewares/asyncHandler');

// REST API collection routes
router.get('/api/jobs', asyncHandler(ApiJobController.getAll));
router.post('/api/jobs', asyncHandler(ApiJobController.create));

// REST API single resource routes by ID
router.get('/api/jobs/:id', asyncHandler(ApiJobController.getById));

// REST API relational sub-routes
router.get('/api/jobs/:id/poster', asyncHandler(ApiJobController.getPoster));
router.get('/api/jobs/:id/applications', asyncHandler(ApiJobController.getApplications));
router.get('/api/jobs/:id/applicants', asyncHandler(ApiJobController.getApplicants));
router.post('/api/jobs/:id/apply', asyncHandler(ApiJobController.apply));
router.put('/api/jobs/:id', asyncHandler(ApiJobController.update));
router.patch('/api/jobs/:id', asyncHandler(ApiJobController.patch));
router.delete('/api/jobs/:id', asyncHandler(ApiJobController.delete));

module.exports = router;
