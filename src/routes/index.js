/**
 * Main Application Router
 * Aggregates all modular route handlers across the MVC architecture.
 */

const express = require('express');
const router = express.Router();

const coreRoutes = require('./coreRoutes');
const healthRoutes = require('./healthRoutes');
const swaggerRoutes = require('./swaggerRoutes');
const userRoutes = require('./userRoutes');

// Mount sub-routers
router.use(coreRoutes);
router.use(healthRoutes);
router.use(swaggerRoutes);
router.use(userRoutes);

module.exports = router;
