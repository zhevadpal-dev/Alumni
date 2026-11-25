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
const { requireGuest } = require('../middlewares/authMiddleware');

router.get('/register', requireGuest, asyncHandler(AuthController.renderRegister));
router.post('/register', requireGuest, asyncHandler(AuthController.handleRegister));
router.get('/login', requireGuest, asyncHandler(AuthController.renderLogin));
router.post('/login', requireGuest, asyncHandler(AuthController.handleLogin));
router.post('/logout', asyncHandler(AuthController.handleLogout));
router.get('/logout', asyncHandler(AuthController.handleLogout));

module.exports = router;
