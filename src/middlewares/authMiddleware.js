/**
 * Authentication & Authorization Middleware (RBAC & Ownership Guards)
 *
 * Provides reusable Express middleware for Alumly aligned with ddd.md:
 * - attachCurrentUser: Exposes req.session.user on res.locals.currentUser globally
 * - requireAuth: Blocks unauthenticated access (redirects web to /login, 401 JSON for /api/*)
 * - requireGuest: Redirects already logged-in users away from /login and /register
 * - requireRole(...allowedRoles): Enforces case-insensitive Role-Based Access Control (403)
 * - requireOwnerOrAdmin: Restricts profile mutations to the profile owner or an Admin (403)
 */

const AuthViews = require('../views/authViews');

/**
 * Determine whether a request expects a JSON error response instead of HTML.
 * @param {import('express').Request} req
 * @returns {boolean}
 */
function isApiOrJsonRequest(req) {
  const url = req.originalUrl || req.url || '';
  if (url.startsWith('/api/') || url === '/api') return true;
  if (req.xhr) return true;
  const accept = req.headers.accept || '';
  return accept.includes('application/json') && !accept.includes('text/html');
}

/**
 * Global middleware: safely attaches req.session.user to res.locals.currentUser
 * on every request so all views have consistent auth state.
 */
function attachCurrentUser(req, res, next) {
  const user = req.session && req.session.user ? req.session.user : null;
  res.locals.currentUser = user;
  next();
}

/**
 * Require an authenticated user session.
 * - API/JSON: returns 401 Unauthorized JSON
 * - Web: redirects to /login with a gentle notice and return URL
 */
function requireAuth(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }

  if (isApiOrJsonRequest(req)) {
    return res.status(401).json({
      status: 'error',
      error: 'Authentication required',
      message: 'Authentication required'
    });
  }

  const returnUrl = req.originalUrl || '/';
  const safeNext = returnUrl.startsWith('/') && !returnUrl.startsWith('//') ? returnUrl : '/';
  const msg = encodeURIComponent('Please sign in to continue.');
  return res.redirect(`/login?msg=${msg}&next=${encodeURIComponent(safeNext)}`);
}

/**
 * Restrict route to guests (unauthenticated visitors) only.
 * Already logged-in users are redirected cleanly to /.
 */
function requireGuest(req, res, next) {
  if (req.session && req.session.user) {
    if (isApiOrJsonRequest(req)) {
      return res.status(403).json({
        status: 'error',
        error: 'Already authenticated',
        message: 'You are already signed in.'
      });
    }
    return res.redirect('/');
  }
  return next();
}

/**
 * Factory middleware enforcing Role-Based Access Control (case-insensitive).
 * @param {...string} allowedRoles - Permitted roles (e.g. 'admin', 'alumni', 'faculty', 'teacher')
 */
function requireRole(...allowedRoles) {
  const normalizedRoles = allowedRoles.map((r) => String(r).trim().toLowerCase());

  return function roleGuard(req, res, next) {
    if (!req.session || !req.session.user) {
      return requireAuth(req, res, next);
    }

    const userRole = String(req.session.user.role || '').trim().toLowerCase();
    if (normalizedRoles.includes(userRole)) {
      return next();
    }

    const message = `Your current role (${req.session.user.role || 'member'}) does not have permission to access this resource.`;

    if (isApiOrJsonRequest(req)) {
      return res.status(403).json({
        status: 'error',
        error: 'Forbidden',
        message
      });
    }

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(403).send(
      AuthViews.renderForbiddenPage({
        message,
        requiredRoles: normalizedRoles
      })
    );
  };
}

/**
 * Restrict sensitive user profile mutations (edit/delete /users/:id)
 * strictly to the profile owner (currentUser.id == req.params.id) or an Admin.
 */
function requireOwnerOrAdmin(req, res, next) {
  if (!req.session || !req.session.user) {
    return requireAuth(req, res, next);
  }

  const currentUser = req.session.user;
  const targetId = parseInt(req.params.id, 10);
  const isOwner = !isNaN(targetId) && Number(currentUser.id) === targetId;
  const isAdmin = String(currentUser.role || '').trim().toLowerCase() === 'admin';

  if (isOwner || isAdmin) {
    return next();
  }

  const message = 'You can only edit or delete your own profile unless you are an Administrator.';

  if (isApiOrJsonRequest(req)) {
    return res.status(403).json({
      status: 'error',
      error: 'Forbidden',
      message
    });
  }

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  return res.status(403).send(
    AuthViews.renderForbiddenPage({
      message
    })
  );
}

module.exports = {
  attachCurrentUser,
  requireAuth,
  requireGuest,
  requireRole,
  requireOwnerOrAdmin
};
