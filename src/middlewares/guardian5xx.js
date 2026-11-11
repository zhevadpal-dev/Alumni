/**
 * 5xx Guardian Middleware (Global Error Handler)
 * 
 * Intercepts all unhandled errors, exceptions, and crashes occurring in the request lifecycle.
 * Placed at the very end of the Express middleware stack (strictly after all routes and 404 Guardian).
 * 
 * - Logs complete error details (stack trace) to terminal (console.error) for debugging.
 * - Appends persistent error records (timestamp, message, stack, request path) to `logs/error.logs`.
 * - Emits a consistent, structured 500 JSON response to the client.
 * - Prevents raw HTML stack traces from leaking to clients.
 */

const fs = require('fs');
const path = require('path');

// Root logs directory and error log file path
const logsDir = path.resolve(__dirname, '../../logs');
const errorLogFile = path.join(logsDir, 'error.logs');

/**
 * Append error details to logs/error.logs
 * 
 * @param {Error} err - Captured error object
 * @param {Object} req - Incoming Express request
 * @param {number} statusCode - Determined HTTP status code
 */
function appendErrorToFile(err, req, statusCode) {
  try {
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }

    const timestamp = new Date().toISOString();
    const method = req ? (req.method || 'UNKNOWN') : 'UNKNOWN';
    const requestPath = req ? (req.originalUrl || req.url || 'UNKNOWN') : 'UNKNOWN';
    const errorMessage = err ? (err.message || String(err)) : 'Unknown error';
    const stackTrace = err && err.stack ? err.stack : 'No stack trace available';

    const logEntry = `[${timestamp}] [STATUS ${statusCode}] ${method} ${requestPath}\n` +
      `Message: ${errorMessage}\n` +
      `Stack Trace:\n${stackTrace}\n` +
      `--------------------------------------------------------------------------------\n`;

    fs.appendFile(errorLogFile, logEntry, 'utf8', (appendErr) => {
      if (appendErr) {
        console.error('[Error Logger] Failed to append error to logs/error.logs:', appendErr.message);
      }
    });
  } catch (fileErr) {
    console.error('[Error Logger] Unexpected file system error:', fileErr.message);
  }
}

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

  // Append error details to file (logs/error.logs)
  appendErrorToFile(err, req, statusCode);

  const message = statusCode === 500
    ? 'Internal Server Error'
    : (err.message || 'Bad Request');

  return res.status(statusCode).json({
    status: 'error',
    message
  });
}

module.exports = guardian5xx;
