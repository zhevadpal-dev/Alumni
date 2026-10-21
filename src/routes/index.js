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
const apiJobRoutes = require('./apiJobRoutes');
const jobRoutes = require('./jobRoutes');
const apiApplicationRoutes = require('./apiApplicationRoutes');
const applicationRoutes = require('./applicationRoutes');

// Mount modular sub-routers
router.use(coreRoutes);
router.use(healthRoutes);
router.use(swaggerRoutes);
router.use(apiUserRoutes);
router.use(userRoutes);
router.use(apiAnnouncementRoutes);
router.use(announcementRoutes);
router.use(apiJobRoutes);
router.use(jobRoutes);
router.use(apiApplicationRoutes);
router.use(applicationRoutes);

module.exports = router;
