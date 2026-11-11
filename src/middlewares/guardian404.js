/**
 * 404 Guardian Middleware
 * 
 * Intercepts all incoming HTTP requests that do not match any defined routes.
 * Placed after all valid route definitions to return:
 * - Structured JSON 404 response for API requests (`/api/*` or `Accept: application/json`)
 * - User-friendly generic 404 HTML Error Page for web browser / UI requests
 */

const path = require('path');
const fs = require('fs');

const VIEW_404_PATH = path.resolve(__dirname, '../views/404.html');

function guardian404(req, res, next) {
  if (res.headersSent) {
    return next();
  }

  const requestedPath = req.originalUrl || req.url || '';
  const isApiRequest = requestedPath.startsWith('/api/') || requestedPath === '/api';
  const acceptsJsonOnly = req.xhr || (
    req.headers.accept &&
    req.headers.accept.includes('application/json') &&
    !req.headers.accept.includes('text/html')
  );

  // 1. API routes (/api/*) & JSON-only requests -> Structured JSON 404
  if (isApiRequest || acceptsJsonOnly) {
    return res.status(404).json({
      status: 'error',
      message: 'Route not found',
      path: requestedPath,
      method: req.method
    });
  }

  // 2. All other web routes (UI/browser requests) -> 404 HTML Error Page
  if (fs.existsSync(VIEW_404_PATH)) {
    return res.status(404).sendFile(VIEW_404_PATH);
  }

  // Fallback inline HTML if view file is missing
  return res.status(404).send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>404 - Page Not Found</title>
      <style>
        body { font-family: sans-serif; text-align: center; padding: 50px; background: #f8fafc; color: #0f172a; }
        h1 { font-size: 2.5rem; margin-bottom: 12px; }
        p { color: #64748b; margin-bottom: 24px; }
        a { display: inline-block; background: #2563eb; color: #fff; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: 600; }
      </style>
    </head>
    <body>
      <h1>404 - Page Not Found</h1>
      <p>We're sorry, but the page you are looking for does not exist.</p>
      <a href="/">Return to Homepage</a>
    </body>
    </html>
  `);
}

module.exports = guardian404;
