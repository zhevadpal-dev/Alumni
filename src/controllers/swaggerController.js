/**
 * Swagger Controller (API Documentation & Playground)
 * Serves the interactive Swagger UI and the OpenAPI 3.0 specification.
 */

const swaggerSpec = require('../docs/swaggerSpec');
const { getSwaggerHtml } = require('../docs/swaggerUiHtml');

class SwaggerController {
  /**
   * GET /api/swagger, /swagger, /api-docs
   * Serves interactive Swagger UI HTML or negotiated JSON
   */
  static getSwaggerUI(req, res) {
    if (
      req.query.format === 'json' ||
      (req.headers.accept &&
        req.headers.accept.includes('application/json') &&
        !req.headers.accept.includes('text/html'))
    ) {
      return res.status(200).json(swaggerSpec);
    }

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(getSwaggerHtml(swaggerSpec));
  }

  /**
   * GET /api/swagger.json, /swagger.json
   * Returns raw OpenAPI 3.0 specification JSON
   */
  static getSwaggerJson(req, res) {
    return res.status(200).json(swaggerSpec);
  }
}

module.exports = SwaggerController;
