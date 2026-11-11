/**
 * API User Routes
 * Maps RESTful API endpoints (/api/users) to ApiUserController.
 */

const express = require('express');
const router = express.Router();
const ApiUserController = require('../controllers/apiUserController');
const asyncHandler = require('../middlewares/asyncHandler');

// REST API collection routes
router.get('/api/users', asyncHandler(ApiUserController.getAllUsers));
router.post('/api/users', asyncHandler(ApiUserController.createUser));

// REST API single resource routes by ID
router.get('/api/users/:id', asyncHandler(ApiUserController.getUserById));
router.put('/api/users/:id', asyncHandler(ApiUserController.updateUserPut));
router.patch('/api/users/:id', asyncHandler(ApiUserController.updateUserPatch));
router.delete('/api/users/:id', asyncHandler(ApiUserController.deleteUser));

// REST API relational sub-routes
router.get('/api/users/:id/announcements', asyncHandler(ApiUserController.getUserAnnouncements));
router.get('/api/users/:id/jobs', asyncHandler(ApiUserController.getUserJobs));
router.get('/api/users/:id/applications', asyncHandler(ApiUserController.getUserApplications));
router.get('/api/users/:id/applied-jobs', asyncHandler(ApiUserController.getUserAppliedJobs));
router.get('/api/users/:id/relations', asyncHandler(ApiUserController.getUserRelations));

module.exports = router;
