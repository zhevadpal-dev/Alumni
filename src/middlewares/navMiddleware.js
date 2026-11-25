/**
 * Role-Based Dynamic Navigation Middleware
 *
 * Computes `res.locals.navItems` and `res.locals.currentPath` dynamically on
 * every incoming request based on the visitor's authenticated role:
 * - Guest (logged out): Home, Job Board, Announcements, About
 * - Student:            Home, Alumni Directory, Job Board, My Applications, Announcements
 * - Alumni / Faculty / Teacher: Home, Alumni Directory, Job Board, Post Job, Announcements
 * - Admin:              Home, Alumni Directory, Job Board, Applications, Announcements, Admin Panel
 */

const { setRequestNavState } = require('./session');

const ROLE_NAV_CONFIG = {
  guest: [
    { label: 'Home', href: '/' },
    { label: 'Job Board', href: '/jobs' },
    { label: 'Announcements', href: '/announcements' },
    { label: 'About', href: '/about' }
  ],
  student: [
    { label: 'Home', href: '/' },
    { label: 'Alumni Directory', href: '/users' },
    { label: 'Job Board', href: '/jobs' },
    { label: 'My Applications', href: '/applications' },
    { label: 'Announcements', href: '/announcements' }
  ],
  alumni: [
    { label: 'Home', href: '/' },
    { label: 'Alumni Directory', href: '/users' },
    { label: 'Job Board', href: '/jobs' },
    { label: 'Post Job', href: '/jobs/new' },
    { label: 'Announcements', href: '/announcements' }
  ],
  admin: [
    { label: 'Home', href: '/' },
    { label: 'Alumni Directory', href: '/users' },
    { label: 'Job Board', href: '/jobs' },
    { label: 'Applications', href: '/applications' },
    { label: 'Announcements', href: '/announcements' },
    { label: 'Admin Panel', href: '/admin' }
  ]
};

/**
 * Resolve navigation menu items for a given user role.
 * @param {string|null|undefined} role
 * @returns {Array<{label: string, href: string}>}
 */
function getNavItemsForRole(role) {
  if (!role) return ROLE_NAV_CONFIG.guest;
  const normalized = String(role).trim().toLowerCase();
  if (normalized === 'admin') return ROLE_NAV_CONFIG.admin;
  if (normalized === 'student') return ROLE_NAV_CONFIG.student;
  if (normalized === 'alumni' || normalized === 'faculty' || normalized === 'teacher') {
    return ROLE_NAV_CONFIG.alumni;
  }
  return ROLE_NAV_CONFIG.guest;
}

/**
 * Express middleware: populates res.locals.navItems, res.locals.currentPath,
 * and stores them in AsyncLocalStorage so all view partials read them automatically.
 */
function navMiddleware(req, res, next) {
  const user = (req.session && req.session.user) || res.locals.currentUser || null;
  const navItems = getNavItemsForRole(user ? user.role : null);
  const currentPath = req.path || '/';

  res.locals.navItems = navItems;
  res.locals.currentPath = currentPath;
  setRequestNavState({ navItems, currentPath });

  next();
}

module.exports = {
  navMiddleware,
  getNavItemsForRole,
  ROLE_NAV_CONFIG
};
