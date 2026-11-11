/**
 * 5xx Guardian Middleware (Global Error Handler)
 * 
 * Intercepts all unhandled errors, exceptions, and crashes occurring in the request lifecycle.
 * Placed at the very end of the Express middleware stack (strictly after all routes and 404 Guardian).
 * 
 * - Logs complete error details (stack trace) to terminal (console.error) for debugging.
 * - Emits a consistent, structured 500 JSON response to the client.
 * - Prevents raw HTML stack traces from leaking to clients.
 */

function guardian5xx(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  // Determine status code (default to 500 Internal Server Error)
  const statusCode = (typeof err.statusCode === 'number' && err.statusCode >= 400 && err.statusCode < 500)
    ? err.statusCode
    : (typeof err.status === 'number' && err.status >= 400 && err.status < 500)
      ? err.status
      : 500;

  // Log actual error details to the terminal for debugging purposes
  if (statusCode >= 500) {
    console.error(`[500 Internal Server Error] ${req.method} ${req.originalUrl || req.url}:`, err.stack || err);
  } else {
    console.error(`[${statusCode} Error] ${req.method} ${req.originalUrl || req.url}:`, err.message || err);
  }

  const message = statusCode === 500
    ? 'Internal Server Error'
    : (err.message || 'Bad Request');

  return res.status(statusCode).json({
    status: 'error',
    message
  });
}

module.exports = guardian5xx;
