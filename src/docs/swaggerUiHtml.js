/**
 * Generates standalone Swagger UI HTML page with interactive OpenAPI 3.0 playground
 */
function getSwaggerHtml(spec) {
  const specJson = JSON.stringify(spec);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Alumni Tracking System API - Swagger Documentation</title>
  <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui.css" />
  <link rel="icon" type="image/png" href="https://unpkg.com/swagger-ui-dist@5.11.0/favicon-32x32.png" sizes="32x32" />
  <style>
    html {
      box-sizing: border-box;
      overflow: -moz-scrollbars-vertical;
      overflow-y: scroll;
    }
    *, *:before, *:after {
      box-sizing: inherit;
    }
    body {
      margin: 0;
      background: #fafafa;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }
    .topbar {
      display: none !important;
    }
    .swagger-ui .info {
      margin: 30px 0;
    }
    .swagger-ui .info .title {
      color: #1a73e8;
    }
    .header-banner {
      background: linear-gradient(135deg, #1f2937, #111827);
      color: white;
      padding: 16px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    }
    .header-banner h1 {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .header-banner a {
      color: #60a5fa;
      text-decoration: none;
      font-size: 0.9rem;
      font-weight: 500;
      border: 1px solid #374151;
      padding: 6px 14px;
      border-radius: 6px;
      transition: all 0.2s ease;
    }
    .header-banner a:hover {
      background: #374151;
      color: #93c5fd;
    }
  </style>
</head>
<body>
  <div class="header-banner">
    <h1>🎓 Alumni Tracking System API</h1>
    <a href="/api/swagger.json" target="_blank">📄 Raw OpenAPI JSON</a>
  </div>

  <div id="swagger-ui"></div>

  <script src="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-bundle.js"></script>
  <script src="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-standalone-preset.js"></script>
  <script>
    window.onload = function() {
      const spec = ${specJson};

      window.ui = SwaggerUIBundle({
        spec: spec,
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIStandalonePreset
        ],
        plugins: [
          SwaggerUIBundle.plugins.DownloadUrl
        ],
        layout: "StandaloneLayout"
      });
    };
  </script>
</body>
</html>`;
}

module.exports = { getSwaggerHtml };
