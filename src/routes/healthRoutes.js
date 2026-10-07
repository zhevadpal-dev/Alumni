/**
 * Health Routes
 * Maps system health telemetry endpoints to HealthController.
 */

const express = require('express');
const router = express.Router();
const HealthController = require('../controllers/healthController');

// Health check endpoints
router.get(['/api/health', '/health'], HealthController.getHealth);

module.exports = router;
