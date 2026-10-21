/**
 * API Job Posting Routes
 * 
 * Maps RESTful API endpoints (/api/jobs) to ApiJobController.
 * Includes direct resource collection, single resource, and relational sub-routes.
 */

const express = require('express');
const router = express.Router();
const ApiJobController = require('../controllers/apiJobController');

// REST API collection routes
router.get('/api/jobs', ApiJobController.getAll);
router.post('/api/jobs', ApiJobController.create);

// REST API single resource routes by ID
router.get('/api/jobs/:id', ApiJobController.getById);
router.get('/api/jobs/:id/poster', ApiJobController.getPoster);
router.put('/api/jobs/:id', ApiJobController.update);
router.patch('/api/jobs/:id', ApiJobController.patch);
router.delete('/api/jobs/:id', ApiJobController.delete);

module.exports = router;
