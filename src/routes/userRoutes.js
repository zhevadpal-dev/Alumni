/**
 * User Web / MVC Routes
 * Maps web user endpoints (/users) to UserController.
 */

const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// Web user directory and creation routes
router.get('/users', UserController.getAllUsers);
router.post('/users', UserController.createUser);

// Web user profile and modification routes by ID
router.get('/users/:id', UserController.getUserById);
router.put('/users/:id', UserController.updateUserPut);
router.patch('/users/:id', UserController.updateUserPatch);
router.delete('/users/:id', UserController.deleteUser);

module.exports = router;
