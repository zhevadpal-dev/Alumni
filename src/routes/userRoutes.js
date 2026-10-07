/**
 * User Routes
 * Maps REST API endpoints (/api/users) to ApiUserController,
 * and web endpoints (/users) to UserController.
 */

const express = require('express');
const router = express.Router();

const UserController = require('../controllers/userController');
const ApiUserController = require('../controllers/apiUserController');

// ==========================================
// 1. REST API Endpoints (ApiUserController)
// ==========================================
router.get('/api/users', ApiUserController.getAllUsers);
router.post('/api/users', ApiUserController.createUser);
router.get('/api/users/:id', ApiUserController.getUserById);
router.put('/api/users/:id', ApiUserController.updateUserPut);
router.patch('/api/users/:id', ApiUserController.updateUserPatch);
router.delete('/api/users/:id', ApiUserController.deleteUser);

// ==========================================
// 2. Web / MVC Endpoints (UserController)
// ==========================================
router.get('/users', UserController.getAllUsers);
router.post('/users', UserController.createUser);
router.get('/users/:id', UserController.getUserById);
router.put('/users/:id', UserController.updateUserPut);
router.patch('/users/:id', UserController.updateUserPatch);
router.delete('/users/:id', UserController.deleteUser);

module.exports = router;
