const express = require('express');
const cors = require('cors');
require('dotenv').config();

const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 5001;

// Essential middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Lightweight parser for multipart/form-data text fields in Postman/dev environments
app.use((req, res, next) => {
  const contentType = req.headers['content-type'] || '';
  if (contentType.includes('multipart/form-data')) {
    if (!req.body) req.body = {};
    let rawBody = '';
    req.on('data', chunk => { rawBody += chunk.toString(); });
    req.on('end', () => {
      const matchBoundary = contentType.match(/boundary=(?:"([^"]+)"|([^;]+))/i);
      if (matchBoundary) {
        const boundary = matchBoundary[1] || matchBoundary[2];
        const parts = rawBody.split(`--${boundary}`);
        for (const part of parts) {
          const matchName = part.match(/name="([^"]+)"/);
          if (matchName) {
            const fieldName = matchName[1];
            const content = part.split(/\r?\n\r?\n/)[1];
            if (content !== undefined) {
              req.body[fieldName] = content.replace(/\r?\n$/, '').trim();
            }
          }
        }
      }
      next();
    });
  } else {
    next();
  }
});

// Mount routes (includes /, /hello, /sum, /about, /api/health, /api/users)
app.use('/', routes);

// Modularity: Start server if executed directly, export app for testing
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
