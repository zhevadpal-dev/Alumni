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
