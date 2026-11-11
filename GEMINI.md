# Project Automation & Workflow Rules

These rules must be strictly followed whenever working on the Alumni Tracking System codebase:

## 1. Route Definition Protocol
Whenever a new route/endpoint is created, modified, or removed:
1. **Swagger / OpenAPI Update:**
   - Always update `src/docs/swaggerSpec.js` to define the route, HTTP method, parameters, request body schema, status codes, and response objects.
   - Ensure it is visible at `GET /api/swagger` and `GET /api/swagger.json`.
2. **README.md Synchronization:**
   - Always update the API Endpoints table in `README.md` to document the endpoint method, path, description, and request/output examples.
3. **Postman Collection Update:**
   - Update both `alumni-api.postman_collection.json` and the Postman v3 collection in `Alumni Tracking System API/`.
4. **Live Container Reload:**
   - Restart the app container (`docker compose restart app`) so changes take effect immediately on the live server.
5. **Git Commit & Push:**
   - Automatically stage all modified and created files (`git add -A`).
   - Create a descriptive semantic commit (e.g. `feat: add ... endpoint`).
   - Push to `origin main` immediately.

## 2. Middleware & Error Handling Protocol
Whenever modifying middleware, controllers, or request pipeline:
1. **Request Duration Logging:**
   - Global logger (`src/middlewares/logger.js`) must intercept every incoming request and log in the standard format:
     `[time] [method] [route] [res.type] [duration]`
2. **404 Route Guardian:**
   - Fallback middleware (`src/middlewares/guardian404.js`) must be placed strictly after all valid routes.
   - API requests (`/api/*` or `Accept: application/json`) must receive a structured JSON 404 response.
   - Web browser requests must render the generic 404 HTML Error Page (`src/views/404.html`) with a 404 HTTP status code.
3. **5xx Global Error Guardian & Async Handling:**
   - Global error handler (`src/middlewares/guardian5xx.js`) must preserve the 4-parameter Express signature `(err, req, res, next)`.
   - Placed at the very end of Express middleware chain, strictly after 404 Guardian.
   - Log complete stack traces to `console.error` and append structured error records to `logs/error.logs`.
   - Return structured JSON `{ "status": "error", "message": "Internal Server Error" }` with 500 status code, preventing raw HTML leakage.
   - All async route handlers must be wrapped with `src/middlewares/asyncHandler.js` or safely forward errors via `next(err)`.
4. **Log File Isolation:**
   - Generated log files (`logs/`, `*.logs`, `*.log`) must remain excluded in `.gitignore` and never committed to source control.

