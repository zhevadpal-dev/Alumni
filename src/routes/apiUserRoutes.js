/**
 * API User Routes
 * Maps RESTful API endpoints (/api/users) to ApiUserController.
 */

const express = require('express');
const router = express.Router();
const ApiUserController = require('../controllers/apiUserController');

// REST API collection routes
router.get('/api/users', ApiUserController.getAllUsers);
router.post('/api/users', ApiUserController.createUser);

// REST API single resource routes by ID
router.get('/api/users/:id', ApiUserController.getUserById);
router.put('/api/users/:id', ApiUserController.updateUserPut);
router.patch('/api/users/:id', ApiUserController.updateUserPatch);
router.delete('/api/users/:id', ApiUserController.deleteUser);

module.exports = router;
