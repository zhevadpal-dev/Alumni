/**
 * Swagger Routes
 * Maps API documentation UI and OpenAPI JSON endpoints to SwaggerController.
 */

const express = require('express');
const router = express.Router();
const SwaggerController = require('../controllers/swaggerController');

// Interactive Swagger UI playground
router.get(['/api/swagger', '/swagger', '/api-docs'], SwaggerController.getSwaggerUI);

// Raw OpenAPI 3.0 specification JSON
router.get(['/api/swagger.json', '/swagger.json'], SwaggerController.getSwaggerJson);

module.exports = router;
