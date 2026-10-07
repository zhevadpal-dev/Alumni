/**
 * User Routes
 * Maps user endpoints to UserController handlers.
 */

const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// List users and create user
router.get(['/api/users', '/users'], UserController.getAllUsers);
router.post(['/api/users', '/users'], UserController.createUser);

// User operations by ID
router.get(['/api/users/:id', '/users/:id'], UserController.getUserById);
router.put(['/api/users/:id', '/users/:id'], UserController.updateUserPut);
router.patch(['/api/users/:id', '/users/:id'], UserController.updateUserPatch);
router.delete(['/api/users/:id', '/users/:id'], UserController.deleteUser);

module.exports = router;
