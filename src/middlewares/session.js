/**
 * Signed HTTP-Only Cookie Session Middleware
 *
 * Manages persistent, tamper-proof user sessions using HMAC-SHA256 signed
 * HTTP-only cookies and Node's built-in AsyncLocalStorage so `res.locals.currentUser`
 * and `getCurrentUser()` are automatically available to every route and view.
 */

const crypto = require('crypto');
const { AsyncLocalStorage } = require('async_hooks');
const { query } = require('../config/db');

const COOKIE_NAME = 'alumly_session';
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days
const SESSION_SECRET =
  process.env.SESSION_SECRET ||
  process.env.JWT_SECRET ||
  'alumly-session-secret-change-in-production';

const sessionStorage = new AsyncLocalStorage();

function base64UrlEncode(str) {
  return Buffer.from(str, 'utf8')
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

function base64UrlDecode(str) {
  const padded = str.replace(/-/g, '+').replace(/_/g, '/');
  const padLen = (4 - (padded.length % 4)) % 4;
  return Buffer.from(padded + '='.repeat(padLen), 'base64').toString('utf8');
}

function signData(encodedPayload) {
  return crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(encodedPayload)
    .digest('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

function createSessionToken(user) {
  const payload = {
    id: user.id,
    full_name: user.name || user.full_name,
    name: user.name || user.full_name,
    email: user.email,
    role: user.role || 'alumni',
    exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_SECONDS
  };
  const encoded = base64UrlEncode(JSON.stringify(payload));
  const signature = signData(encoded);
  return `${encoded}.${signature}`;
}

function verifySessionToken(token) {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;

  const [encoded, providedSig] = parts;
  const expectedSig = signData(encoded);

  const providedBuf = Buffer.from(providedSig, 'utf8');
  const expectedBuf = Buffer.from(expectedSig, 'utf8');
  if (providedBuf.length !== expectedBuf.length) return null;
  if (!crypto.timingSafeEqual(providedBuf, expectedBuf)) return null;

  try {
    const parsed = JSON.parse(base64UrlDecode(encoded));
    if (!parsed || !parsed.id || !parsed.email) return null;
    if (parsed.exp && parsed.exp < Math.floor(Date.now() / 1000)) return null;
    return {
      id: parsed.id,
      full_name: parsed.full_name || parsed.name,
      name: parsed.name || parsed.full_name,
      email: parsed.email,
      role: parsed.role || 'alumni'
    };
  } catch (_) {
    return null;
  }
}

function parseCookies(cookieHeader) {
  const cookies = {};
  if (!cookieHeader || typeof cookieHeader !== 'string') return cookies;
  const pairs = cookieHeader.split(';');
  for (const pair of pairs) {
    const eqIdx = pair.indexOf('=');
    if (eqIdx === -1) continue;
    const key = pair.slice(0, eqIdx).trim();
    const val = pair.slice(eqIdx + 1).trim();
    if (key) {
      try {
        cookies[key] = decodeURIComponent(val);
      } catch (_) {
        cookies[key] = val;
      }
    }
  }
  return cookies;
}

/**
 * Retrieve the currently logged-in user for the active HTTP request context.
 * @returns {{id: number, full_name: string, name: string, email: string, role: string}|null}
 */
function getCurrentUser() {
  const store = sessionStorage.getStore();
  return store ? store.currentUser : null;
}

/**
 * Store computed dynamic navigation state in the active request context.
 * @param {{navItems: Array<{label: string, href: string}>, currentPath: string}} navState
 */
function setRequestNavState(navState) {
  const store = sessionStorage.getStore();
  if (store) {
    store.navItems = navState.navItems;
    store.currentPath = navState.currentPath;
  }
}

/**
 * Retrieve computed dynamic navigation items & currentPath for the active request.
 * @returns {{navItems: Array<{label: string, href: string}>|null, currentPath: string}}
 */
function getRequestNavState() {
  const store = sessionStorage.getStore();
  return {
    navItems: store && store.navItems ? store.navItems : null,
    currentPath: store && store.currentPath ? store.currentPath : '/'
  };
}

/**
 * Express middleware: parses signed session cookie, exposes res.locals.currentUser,
 * req.session, req.loginUser(user), and req.logoutUser().
 */
async function sessionMiddleware(req, res, next) {
  const cookies = parseCookies(req.headers.cookie);
  let currentUser = verifySessionToken(cookies[COOKIE_NAME]);

  // Sync live role & profile name from PostgreSQL so role promotions take effect immediately
  if (currentUser && currentUser.id) {
    try {
      const dbRes = await query(
        'SELECT id, name, email, role FROM users WHERE id = $1 LIMIT 1',
        [currentUser.id]
      );
      if (dbRes.rows[0]) {
        const fresh = dbRes.rows[0];
        currentUser = {
          id: fresh.id,
          full_name: fresh.name,
          name: fresh.name,
          email: fresh.email,
          role: fresh.role || 'alumni'
        };
      } else {
        currentUser = null;
      }
    } catch (_) {
      // Keep verified cookie payload if DB lookup temporarily fails
    }
  }

  const context = { currentUser };
  req.session = { user: currentUser };
  res.locals.currentUser = currentUser;

  req.loginUser = (user) => {
    const sessionUser = {
      id: user.id,
      full_name: user.name || user.full_name,
      name: user.name || user.full_name,
      email: user.email,
      role: user.role || 'alumni'
    };
    const token = createSessionToken(sessionUser);
    const secureFlag = process.env.NODE_ENV === 'production' ? '; Secure' : '';
    res.setHeader(
      'Set-Cookie',
      `${COOKIE_NAME}=${encodeURIComponent(token)}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${SESSION_MAX_AGE_SECONDS}${secureFlag}`
    );
    context.currentUser = sessionUser;
    req.session.user = sessionUser;
    res.locals.currentUser = sessionUser;
  };

  req.logoutUser = () => {
    const secureFlag = process.env.NODE_ENV === 'production' ? '; Secure' : '';
    res.setHeader(
      'Set-Cookie',
      `${COOKIE_NAME}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0${secureFlag}`
    );
    context.currentUser = null;
    req.session.user = null;
    res.locals.currentUser = null;
  };

  sessionStorage.run(context, () => next());
}

module.exports = {
  sessionMiddleware,
  getCurrentUser,
  setRequestNavState,
  getRequestNavState,
  COOKIE_NAME
};
