/**
 * 404 Guardian Middleware
 * 
 * Intercepts all incoming HTTP requests that do not match any defined routes.
 * Placed after all valid route definitions to return a consistent, structured JSON 404 response.
 */

function guardian404(req, res, next) {
  if (res.headersSent) {
    return next();
  }

  return res.status(404).json({
    status: 'error',
    message: 'Route not found',
    path: req.originalUrl || req.url,
    method: req.method
  });
}

module.exports = guardian404;
