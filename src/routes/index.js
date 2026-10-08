/**
 * Main Application Router
 * Aggregates all modular route handlers across the MVC architecture.
 */

const express = require('express');
const router = express.Router();

const coreRoutes = require('./coreRoutes');
const healthRoutes = require('./healthRoutes');
const swaggerRoutes = require('./swaggerRoutes');
const apiUserRoutes = require('./apiUserRoutes');
const userRoutes = require('./userRoutes');
const apiAnnouncementRoutes = require('./apiAnnouncementRoutes');
const announcementRoutes = require('./announcementRoutes');

// Mount modular sub-routers
router.use(coreRoutes);
router.use(healthRoutes);
router.use(swaggerRoutes);
router.use(apiUserRoutes);
router.use(userRoutes);
router.use(apiAnnouncementRoutes);
router.use(announcementRoutes);

module.exports = router;
