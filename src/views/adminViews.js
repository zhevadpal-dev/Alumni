/**
 * Admin Views (Presentation Layer)
 *
 * Renders the unified Alumly iOS Glassmorphism Admin Panel (/admin) with
 * live KPI summary cards, pill tab switching, and full CRUD management tables
 * for Users, Job Postings, Announcements, and Applications.
 */

const { getHeadTags, BRAND_SVG_ICON, renderUserSessionControls, renderAdminNavItem } = require('./styles');

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const VALID_TABS = ['users', 'jobs', 'announcements', 'applications'];
const APPLICATION_STATUSES = [
  'Submitted',
  'Under Review',
  'Shortlisted',
  'Interview Scheduled',
  'Accepted',
  'Rejected',
  'Withdrawn'
];

class AdminViews {
  static renderDashboard({
    users = [],
    jobs = [],
    announcements = [],
    applications = [],
    currentUser = {},
    query = {}
  }) {
    const activeTab = VALID_TABS.includes(String(query.tab || '').toLowerCase())
      ? String(query.tab).toLowerCase()
      : 'users';

    const activeJobsCount = jobs.filter(
      (j) => String(j.status || '').toLowerCase() === 'active'
    ).length;

    const flashHtml = query.msg
      ? `<div class="${query.type === 'error' ? 'glass-alert-error' : 'glass-alert-success'}" role="status" aria-live="polite">
          <div class="${query.type === 'error' ? 'glass-alert-icon' : 'glass-alert-success-icon'}" aria-hidden="true">${query.type === 'error' ? '!' : '✓'}</div>
          <div class="glass-alert-body"><p>${escapeHtml(query.msg)}</p></div>
        </div>`
      : '';

    const userRows = users
      .map((u) => {
        const isSelf = Number(currentUser.id) === Number(u.id);
        const roleLower = String(u.role || 'alumni').toLowerCase();
        return `
          <tr>
            <td>
              <div class="admin-cell-primary">
                <a href="/users/${u.id}" class="admin-item-link">${escapeHtml(u.name)}</a>
                ${isSelf ? '<span class="admin-self-tag">You</span>' : ''}
              </div>
              <div class="admin-cell-sub">${escapeHtml(u.email)}</div>
            </td>
            <td>
              <div class="admin-cell-primary">${escapeHtml(u.department || '—')}</div>
              <div class="admin-cell-sub">${u.graduationYear ? `Class of ${escapeHtml(u.graduationYear)}` : '—'}</div>
            </td>
            <td>
              <form action="/admin/users/${u.id}/role" method="POST" class="admin-inline-form">
                <select name="role" class="admin-inline-select" aria-label="Role for ${escapeHtml(u.name)}" ${isSelf ? 'disabled title="Cannot change your own Admin role"' : ''}>
                  <option value="student" ${roleLower === 'student' ? 'selected' : ''}>Student</option>
                  <option value="alumni" ${roleLower === 'alumni' ? 'selected' : ''}>Alumni</option>
                  <option value="faculty" ${roleLower === 'faculty' ? 'selected' : ''}>Faculty</option>
                  <option value="teacher" ${roleLower === 'teacher' ? 'selected' : ''}>Teacher</option>
                  <option value="admin" ${roleLower === 'admin' ? 'selected' : ''}>Admin</option>
                </select>
                ${!isSelf ? '<button type="submit" class="btn-admin-save">Save</button>' : ''}
              </form>
            </td>
            <td class="admin-actions-cell">
              <a href="/users/${u.id}/edit" class="btn-glass-pill btn-edit">Edit</a>
              ${
                isSelf
                  ? '<span class="admin-protected-label" title="You cannot delete your own active Admin account">Active Session</span>'
                  : `<form action="/admin/users/${u.id}/delete" method="POST" style="margin:0;" onsubmit="return confirm('Delete user ${escapeHtml(u.name)}? This also removes their applications.');">
                      <button type="submit" class="btn-glass-pill btn-delete">Delete</button>
                    </form>`
              }
            </td>
          </tr>
        `;
      })
      .join('');

    const jobRows = jobs
      .map((j) => {
        const statusLower = String(j.status || 'Active').toLowerCase();
        return `
          <tr>
            <td>
              <div class="admin-cell-primary">
                <a href="/jobs/${j.id}" class="admin-item-link">${escapeHtml(j.title)}</a>
              </div>
              <div class="admin-cell-sub">${escapeHtml(j.company)} &bull; ${escapeHtml(j.location || 'Remote')}</div>
            </td>
            <td><span class="badge" style="background: rgba(255,255,255,0.68); color:#16191c; border:1px solid rgba(255,255,255,0.85);">${escapeHtml(j.jobType || 'Full-Time')}</span></td>
            <td><span class="admin-status-pill status-${statusLower}">${escapeHtml(j.status || 'Active')}</span></td>
            <td class="admin-actions-cell">
              <a href="/jobs/${j.id}/edit" class="btn-glass-pill btn-edit">Edit</a>
              <form action="/admin/jobs/${j.id}/delete" method="POST" style="margin:0;" onsubmit="return confirm('Delete job posting ${escapeHtml(j.title)}?');">
                <button type="submit" class="btn-glass-pill btn-delete">Delete</button>
              </form>
            </td>
          </tr>
        `;
      })
      .join('');

    const announcementRows = announcements
      .map((a) => `
          <tr>
            <td>
              <div class="admin-cell-primary">
                <a href="/announcements/${a.id}" class="admin-item-link">${escapeHtml(a.title)}</a>
              </div>
              <div class="admin-cell-sub">${escapeHtml(a.author || 'Alumni Relations Office')}</div>
            </td>
            <td><span class="badge" style="background: rgba(255,255,255,0.68); color:#16191c; border:1px solid rgba(255,255,255,0.85);">${escapeHtml(a.category || 'General')}</span></td>
            <td class="admin-cell-sub">${a.createdAt ? new Date(a.createdAt).toLocaleDateString() : '—'}</td>
            <td class="admin-actions-cell">
              <a href="/announcements/${a.id}/edit" class="btn-glass-pill btn-edit">Edit</a>
              <form action="/admin/announcements/${a.id}/delete" method="POST" style="margin:0;" onsubmit="return confirm('Delete announcement ${escapeHtml(a.title)}?');">
                <button type="submit" class="btn-glass-pill btn-delete">Delete</button>
              </form>
            </td>
          </tr>
        `)
      .join('');

    const applicationRows = applications
      .map((app) => {
        const applicantName = app.applicant?.name || `User #${app.userId}`;
        const jobTitle = app.job?.title || `Job #${app.jobId}`;
        const jobCompany = app.job?.company || '';
        const optionsHtml = APPLICATION_STATUSES.map(
          (st) => `<option value="${st}" ${app.status === st ? 'selected' : ''}>${st}</option>`
        ).join('');

        return `
          <tr>
            <td>
              <div class="admin-cell-primary">
                <a href="/applications/${app.id}" class="admin-item-link">${escapeHtml(applicantName)}</a>
              </div>
              <div class="admin-cell-sub">${escapeHtml(app.applicant?.email || '')}</div>
            </td>
            <td>
              <div class="admin-cell-primary">${escapeHtml(jobTitle)}</div>
              <div class="admin-cell-sub">${escapeHtml(jobCompany)}</div>
            </td>
            <td>
              <form action="/admin/applications/${app.id}/status" method="POST" class="admin-inline-form">
                <select name="status" class="admin-inline-select" aria-label="Status for application #${app.id}">
                  ${optionsHtml}
                </select>
                <button type="submit" class="btn-admin-save">Update</button>
              </form>
            </td>
            <td class="admin-actions-cell">
              <a href="/applications/${app.id}" class="btn-glass-pill btn-view">View</a>
              <form action="/admin/applications/${app.id}/delete" method="POST" style="margin:0;" onsubmit="return confirm('Delete application #${app.id}?');">
                <button type="submit" class="btn-glass-pill btn-delete">Delete</button>
              </form>
            </td>
          </tr>
        `;
      })
      .join('');

    return `<!DOCTYPE html>
<html lang="en">
<head>
  ${getHeadTags('Admin Panel | Alumly')}
</head>
<body>
  <header class="top-nav">
    <div class="nav-wrapper">
      <a href="/" class="nav-logo" title="Alumly — Alumni & Career Network">
        <span class="nav-logo-icon" aria-hidden="true">
          ${BRAND_SVG_ICON}
        </span>
        <span class="nav-brand-text">Alumly</span>
      </a>

      <nav class="nav-pill-menu" aria-label="Main Navigation">
        <ul class="nav-links">
          <li><a href="/" class="nav-link">Home</a></li>
          <li><a href="/users" class="nav-link">Alumni Directory</a></li>
          <li><a href="/jobs" class="nav-link">Job Board</a></li>
          <li><a href="/applications" class="nav-link">Applications</a></li>
          <li><a href="/announcements" class="nav-link">Announcements</a></li>
          ${renderAdminNavItem('admin')}
          <li><a href="/api/swagger" target="_blank" class="nav-link">API Docs</a></li>
        </ul>
      </nav>

      <div class="nav-actions">${renderUserSessionControls()}</div>
    </div>
  </header>

  <main class="container" style="max-width: 1140px; padding-top: 24px; padding-bottom: 72px;">
    <div style="margin-bottom: 24px;">
      <span class="badge register-eyebrow">● PLATFORM ADMINISTRATION</span>
      <h1 style="font-family: var(--font-serif); font-size: 2.25rem; font-weight: 600; color: #16191c; margin: 4px 0 6px 0; letter-spacing: -0.02em;">Admin Panel</h1>
      <p style="color: #4a4a4c; font-size: 0.95rem; margin: 0;">Manage members, roles, career opportunities, institutional announcements, and candidate applications.</p>
    </div>

    ${flashHtml}

    <!-- Live KPI Summary Grid -->
    <div class="admin-kpi-grid">
      <div class="admin-kpi-card">
        <div class="admin-kpi-label">Total Users</div>
        <div class="admin-kpi-value">${users.length}</div>
        <div class="admin-kpi-sub">Registered members</div>
      </div>
      <div class="admin-kpi-card">
        <div class="admin-kpi-label">Active Jobs</div>
        <div class="admin-kpi-value">${activeJobsCount}</div>
        <div class="admin-kpi-sub">${jobs.length} total postings</div>
      </div>
      <div class="admin-kpi-card">
        <div class="admin-kpi-label">Applications</div>
        <div class="admin-kpi-value">${applications.length}</div>
        <div class="admin-kpi-sub">Candidate submissions</div>
      </div>
      <div class="admin-kpi-card">
        <div class="admin-kpi-label">Announcements</div>
        <div class="admin-kpi-value">${announcements.length}</div>
        <div class="admin-kpi-sub">Published bulletins</div>
      </div>
    </div>

    <!-- iOS Glassmorphism Tab Switcher -->
    <div class="admin-tabs-bar" role="tablist" aria-label="Admin Management Sections">
      <button type="button" class="admin-tab-btn ${activeTab === 'users' ? 'active' : ''}" data-tab="users" role="tab" aria-selected="${activeTab === 'users'}">Users (${users.length})</button>
      <button type="button" class="admin-tab-btn ${activeTab === 'jobs' ? 'active' : ''}" data-tab="jobs" role="tab" aria-selected="${activeTab === 'jobs'}">Jobs (${jobs.length})</button>
      <button type="button" class="admin-tab-btn ${activeTab === 'announcements' ? 'active' : ''}" data-tab="announcements" role="tab" aria-selected="${activeTab === 'announcements'}">Announcements (${announcements.length})</button>
      <button type="button" class="admin-tab-btn ${activeTab === 'applications' ? 'active' : ''}" data-tab="applications" role="tab" aria-selected="${activeTab === 'applications'}">Applications (${applications.length})</button>
    </div>

    <!-- TAB 1: USERS MANAGEMENT -->
    <section class="admin-panel-card ${activeTab === 'users' ? 'is-active' : ''}" data-panel="users">
      <div class="admin-panel-header">
        <div>
          <h2 class="admin-panel-title">Users &amp; Role Management</h2>
          <p class="admin-panel-sub">Update member roles inline, edit profile details, or remove inactive accounts.</p>
        </div>
      </div>
      <div class="admin-table-wrap">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Member</th>
              <th>Academic Profile</th>
              <th>Role</th>
              <th style="text-align: right;">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${userRows || '<tr><td colspan="4" class="admin-empty-cell">No users found.</td></tr>'}
          </tbody>
        </table>
      </div>
    </section>

    <!-- TAB 2: JOBS MANAGEMENT -->
    <section class="admin-panel-card ${activeTab === 'jobs' ? 'is-active' : ''}" data-panel="jobs">
      <div class="admin-panel-header">
        <div>
          <h2 class="admin-panel-title">Job Postings Management</h2>
          <p class="admin-panel-sub">Review, edit, or remove career opportunities across the Job Board.</p>
        </div>
        <a href="/jobs/new" class="btn btn-primary btn-sm">+ Post Job</a>
      </div>
      <div class="admin-table-wrap">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Opportunity</th>
              <th>Type</th>
              <th>Status</th>
              <th style="text-align: right;">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${jobRows || '<tr><td colspan="4" class="admin-empty-cell">No job postings found.</td></tr>'}
          </tbody>
        </table>
      </div>
    </section>

    <!-- TAB 3: ANNOUNCEMENTS MANAGEMENT -->
    <section class="admin-panel-card ${activeTab === 'announcements' ? 'is-active' : ''}" data-panel="announcements">
      <div class="admin-panel-header">
        <div>
          <h2 class="admin-panel-title">Announcements Management</h2>
          <p class="admin-panel-sub">Publish new institutional bulletins or edit and remove existing posts.</p>
        </div>
      </div>

      <form action="/admin/announcements" method="POST" class="admin-quick-form">
        <div class="form-grid-2col">
          <div class="form-group">
            <label for="adminAnnTitle">Headline *</label>
            <input type="text" id="adminAnnTitle" name="title" class="form-control" placeholder="e.g. Spring Career Summit 2026" required />
          </div>
          <div class="form-group">
            <label for="adminAnnCategory">Category</label>
            <select id="adminAnnCategory" name="category" class="form-control">
              <option value="General">General</option>
              <option value="Event">Event</option>
              <option value="Career">Career</option>
              <option value="Academic">Academic</option>
              <option value="News">News</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>
          <div class="form-group" style="grid-column: 1 / -1;">
            <label for="adminAnnContent">Bulletin Content *</label>
            <textarea id="adminAnnContent" name="content" class="form-control" style="min-height: 82px;" placeholder="Write announcement details..." required></textarea>
          </div>
        </div>
        <div style="display: flex; justify-content: flex-end; margin-top: 12px;">
          <button type="submit" class="btn btn-primary btn-sm">+ Publish Announcement</button>
        </div>
      </form>

      <div class="admin-table-wrap">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Bulletin</th>
              <th>Category</th>
              <th>Published</th>
              <th style="text-align: right;">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${announcementRows || '<tr><td colspan="4" class="admin-empty-cell">No announcements found.</td></tr>'}
          </tbody>
        </table>
      </div>
    </section>

    <!-- TAB 4: APPLICATIONS MANAGEMENT -->
    <section class="admin-panel-card ${activeTab === 'applications' ? 'is-active' : ''}" data-panel="applications">
      <div class="admin-panel-header">
        <div>
          <h2 class="admin-panel-title">Applications Management</h2>
          <p class="admin-panel-sub">Advance candidate application statuses or remove withdrawn/duplicate records.</p>
        </div>
      </div>
      <div class="admin-table-wrap">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Candidate</th>
              <th>Position</th>
              <th>Pipeline Status</th>
              <th style="text-align: right;">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${applicationRows || '<tr><td colspan="4" class="admin-empty-cell">No applications submitted yet.</td></tr>'}
          </tbody>
        </table>
      </div>
    </section>
  </main>

  <script>
    (function () {
      var buttons = document.querySelectorAll('.admin-tab-btn');
      var panels = document.querySelectorAll('.admin-panel-card');

      function activateTab(tabName) {
        buttons.forEach(function (btn) {
          var isMatch = btn.getAttribute('data-tab') === tabName;
          btn.classList.toggle('active', isMatch);
          btn.setAttribute('aria-selected', String(isMatch));
        });
        panels.forEach(function (panel) {
          panel.classList.toggle('is-active', panel.getAttribute('data-panel') === tabName);
        });
        if (window.history && window.history.replaceState) {
          var url = new URL(window.location.href);
          url.searchParams.set('tab', tabName);
          window.history.replaceState({}, '', url.toString());
        }
      }

      buttons.forEach(function (btn) {
        btn.addEventListener('click', function () {
          activateTab(btn.getAttribute('data-tab'));
        });
      });
    })();
  </script>
</body>
</html>`;
  }
}

module.exports = AdminViews;
