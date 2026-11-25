/**
 * Auth / Registration Routes
 *
 * Maps public account registration endpoints:
 * - GET /register  -> Render Alumly iOS Glassmorphism Register Page
 * - POST /register -> Validate, hash password, create Alumni or Student account
 */

const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const asyncHandler = require('../middlewares/asyncHandler');

router.get('/register', asyncHandler(AuthController.renderRegister));
router.post('/register', asyncHandler(AuthController.handleRegister));
router.post('/logout', asyncHandler(AuthController.handleLogout));
router.get('/logout', asyncHandler(AuthController.handleLogout));

module.exports = router;
