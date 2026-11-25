/**
 * Workspace Views (Presentation Layer)
 *
 * Renders personalized, data-isolated workspace pages for logged-in Alumly users:
 * - GET /my-applications : Student/Member personal application tracker
 * - GET /my-jobs         : Alumni/Faculty/Admin personal job postings manager
 *
 * Strictly adheres to the Alumly iOS Glassmorphism design system,
 * unified 3-column CSS Grid shared header, and human-friendly copy (no #ID jargon).
 */

const { getHeadTags, renderSharedHeader } = require('./styles');

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatReadableDate(dateValue) {
  if (!dateValue) return '—';
  const d = new Date(dateValue);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

function getFirstName(user) {
  const full = (user && (user.full_name || user.name)) || 'there';
  return String(full).trim().split(/\s+/)[0] || 'there';
}

function getApplicationStatusStyle(status) {
  const normalized = String(status || 'Submitted').trim().toLowerCase();
  if (normalized === 'accepted') {
    return 'background: rgba(209, 250, 229, 0.85); color: #065f46; border: 1px solid rgba(16, 185, 129, 0.3);';
  }
  if (normalized === 'rejected' || normalized === 'withdrawn') {
    return 'background: rgba(254, 226, 226, 0.85); color: #991b1b; border: 1px solid rgba(239, 68, 68, 0.25);';
  }
  if (normalized === 'shortlisted' || normalized === 'interview scheduled') {
    return 'background: rgba(224, 231, 255, 0.88); color: #3730a3; border: 1px solid rgba(99, 102, 241, 0.25);';
  }
  return 'background: rgba(255, 243, 224, 0.9); color: #92400e; border: 1px solid rgba(245, 158, 11, 0.28);';
}

const WORKSPACE_INLINE_STYLES = `
  .workspace-shell {
    max-width: 1100px;
    padding-top: 24px;
    padding-bottom: 72px;
  }
  .workspace-header-row {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 20px;
    flex-wrap: wrap;
    margin-bottom: 24px;
  }
  .workspace-heading {
    font-family: var(--font-serif);
    font-size: 2.25rem;
    font-weight: 600;
    color: #16191c;
    margin: 4px 0 6px 0;
    letter-spacing: -0.02em;
    line-height: 1.15;
  }
  .workspace-subtitle {
    color: #4a4a4c;
    font-size: 0.95rem;
    margin: 0;
  }
  .workspace-kpi-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
    margin-bottom: 24px;
  }
  .workspace-cta-pill {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 11px 22px;
    border-radius: 9999px;
    background: #16191c;
    color: #ffffff !important;
    font-size: 0.9rem;
    font-weight: 600;
    text-decoration: none;
    border: 1px solid rgba(22, 25, 28, 0.9);
    transition: transform 0.16s ease, background-color 0.16s ease;
    white-space: nowrap;
  }
  .workspace-cta-pill:hover {
    background: #2b2f36;
    transform: translateY(-1px);
  }
  .workspace-secondary-pill {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 8px 16px;
    border-radius: 9999px;
    background: rgba(255, 255, 255, 0.65);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    color: #16191c;
    font-size: 0.84rem;
    font-weight: 600;
    text-decoration: none;
    border: 1px solid rgba(255, 255, 255, 0.85);
    transition: background-color 0.15s ease;
  }
  .workspace-secondary-pill:hover {
    background: rgba(255, 255, 255, 0.9);
  }
  .workspace-empty-card {
    background: rgba(255, 255, 255, 0.56);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    border: 1px solid rgba(255, 255, 255, 0.82);
    border-radius: 24px;
    padding: 56px 28px;
    text-align: center;
  }
  .workspace-empty-icon {
    width: 56px;
    height: 56px;
    margin: 0 auto 16px;
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.78);
    border: 1px solid rgba(255, 255, 255, 0.92);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #16191c;
  }
  .workspace-empty-title {
    font-family: var(--font-serif);
    font-size: 1.45rem;
    font-weight: 600;
    color: #16191c;
    margin: 0 0 8px 0;
  }
  .workspace-empty-copy {
    color: #4a4a4c;
    font-size: 0.95rem;
    max-width: 440px;
    margin: 0 auto 24px;
    line-height: 1.55;
  }
  .workspace-applicant-badge {
    display: inline-flex;
    align-items: center;
    padding: 5px 12px;
    border-radius: 9999px;
    font-size: 0.8rem;
    font-weight: 600;
    background: rgba(255, 255, 255, 0.72);
    color: #16191c;
    border: 1px solid rgba(255, 255, 255, 0.88);
  }
  .workspace-status-badge {
    display: inline-flex;
    align-items: center;
    padding: 5px 12px;
    border-radius: 9999px;
    font-size: 0.78rem;
    font-weight: 600;
    white-space: nowrap;
  }
  @media (max-width: 768px) {
    .workspace-kpi-grid {
      grid-template-columns: 1fr;
    }
  }
`;

class WorkspaceViews {
  /**
   * Render GET /my-applications — Logged-in user's own job applications only.
   */
  static renderMyApplicationsPage({ user = {}, applications = [], query = {} }) {
    const firstName = getFirstName(user);
    const totalApplied = applications.length;
    const pendingStatuses = new Set(['submitted', 'under review', 'shortlisted', 'interview scheduled']);
    const pendingCount = applications.filter((a) =>
      pendingStatuses.has(String(a.status || 'Submitted').trim().toLowerCase())
    ).length;
    const acceptedCount = applications.filter(
      (a) => String(a.status || '').trim().toLowerCase() === 'accepted'
    ).length;

    const flashHtml =
      query.status === 'submitted'
        ? `<div class="glass-alert-success" role="status" aria-live="polite">
            <div class="glass-alert-success-icon" aria-hidden="true">✓</div>
            <div class="glass-alert-body"><p>Your application was submitted successfully.</p></div>
          </div>`
        : '';

    const rowsHtml = applications
      .map((app) => {
        const statusLabel = app.status || 'Submitted';
        const statusStyle = getApplicationStatusStyle(statusLabel);
        return `
          <tr>
            <td>
              <div class="admin-cell-primary">
                <a href="/jobs/${app.jobId}" class="admin-item-link">${escapeHtml(app.jobTitle || 'Untitled Opportunity')}</a>
              </div>
              <div class="admin-cell-sub">${escapeHtml(app.jobCompany || '—')} &bull; ${escapeHtml(app.jobLocation || 'Remote')}</div>
            </td>
            <td>
              <span class="workspace-applicant-badge">${escapeHtml(app.jobType || 'Full-Time')}</span>
            </td>
            <td>
              <div class="admin-cell-primary">${formatReadableDate(app.appliedAt)}</div>
            </td>
            <td style="text-align: right;">
              <span class="workspace-status-badge" style="${statusStyle}">${escapeHtml(statusLabel)}</span>
            </td>
          </tr>
        `;
      })
      .join('');

    const contentHtml =
      applications.length > 0
        ? `
          <section class="admin-panel-card is-active">
            <div class="admin-panel-header">
              <div>
                <h2 class="admin-panel-title">Submitted Applications</h2>
                <p class="admin-panel-sub">Only applications submitted from your account appear in this workspace.</p>
              </div>
              <a href="/jobs" class="workspace-secondary-pill">Browse Job Board</a>
            </div>
            <div class="admin-table-wrap">
              <table class="admin-table">
                <thead>
                  <tr>
                    <th>Role &amp; Company</th>
                    <th>Type</th>
                    <th>Applied Date</th>
                    <th style="text-align: right;">Status</th>
                  </tr>
                </thead>
                <tbody>
                  ${rowsHtml}
                </tbody>
              </table>
            </div>
          </section>
        `
        : `
          <section class="workspace-empty-card">
            <div class="workspace-empty-icon" aria-hidden="true">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
            </div>
            <h2 class="workspace-empty-title">You haven't applied to any roles yet.</h2>
            <p class="workspace-empty-copy">Discover internships, graduate programs, and alumni-referred openings tailored to your career path.</p>
            <a href="/jobs" class="workspace-cta-pill">Browse Job Board</a>
          </section>
        `;

    return `<!DOCTYPE html>
<html lang="en">
<head>
  ${getHeadTags('My Applications | Alumly')}
  <style>${WORKSPACE_INLINE_STYLES}</style>
</head>
<body>
  ${renderSharedHeader()}

  <main class="container workspace-shell">
    <div class="workspace-header-row">
      <div>
        <span class="badge register-eyebrow">● PERSONAL WORKSPACE</span>
        <h1 class="workspace-heading">Your Applications</h1>
        <p class="workspace-subtitle">Keep track of every opportunity you've applied to, ${escapeHtml(firstName)}.</p>
      </div>
      ${applications.length > 0 ? '<a href="/jobs" class="workspace-cta-pill">Explore More Roles</a>' : ''}
    </div>

    ${flashHtml}

    <div class="workspace-kpi-grid">
      <div class="admin-kpi-card">
        <div class="admin-kpi-label">Total Applied</div>
        <div class="admin-kpi-value">${totalApplied}</div>
        <div class="admin-kpi-sub">Submitted opportunities</div>
      </div>
      <div class="admin-kpi-card">
        <div class="admin-kpi-label">Pending</div>
        <div class="admin-kpi-value">${pendingCount}</div>
        <div class="admin-kpi-sub">In review or interview</div>
      </div>
      <div class="admin-kpi-card">
        <div class="admin-kpi-label">Accepted</div>
        <div class="admin-kpi-value">${acceptedCount}</div>
        <div class="admin-kpi-sub">Confirmed offers</div>
      </div>
    </div>

    ${contentHtml}
  </main>
</body>
</html>`;
  }

  /**
   * Render GET /my-jobs — Logged-in Alumni/Faculty/Admin's own posted jobs only.
   */
  static renderMyJobsPage({ user = {}, jobs = [], query = {} }) {
    const firstName = getFirstName(user);
    const totalJobs = jobs.length;
    const activeJobs = jobs.filter(
      (j) => String(j.status || 'Active').trim().toLowerCase() === 'active'
    ).length;
    const totalApplicants = jobs.reduce((sum, j) => sum + (Number(j.applicantCount) || 0), 0);

    const flashHtml =
      query.status === 'deleted'
        ? `<div class="glass-alert-success" role="status" aria-live="polite">
            <div class="glass-alert-success-icon" aria-hidden="true">✓</div>
            <div class="glass-alert-body"><p>Job posting removed successfully.</p></div>
          </div>`
        : '';

    const rowsHtml = jobs
      .map((job) => {
        const statusLower = String(job.status || 'Active').toLowerCase();
        const count = Number(job.applicantCount) || 0;
        const applicantText = count === 1 ? '1 applicant' : `${count} applicants`;
        return `
          <tr>
            <td>
              <div class="admin-cell-primary">
                <a href="/jobs/${job.id}" class="admin-item-link">${escapeHtml(job.title)}</a>
              </div>
              <div class="admin-cell-sub">${escapeHtml(job.company)} &bull; ${escapeHtml(job.location || 'Remote')}</div>
            </td>
            <td>
              <span class="workspace-applicant-badge">${escapeHtml(job.jobType || 'Full-Time')}</span>
            </td>
            <td>
              <span class="admin-status-pill status-${statusLower}">${escapeHtml(job.status || 'Active')}</span>
            </td>
            <td>
              <span class="workspace-applicant-badge">${applicantText}</span>
            </td>
            <td class="admin-actions-cell">
              <a href="/jobs/${job.id}/edit" class="btn-glass-pill btn-edit">Edit</a>
              <form action="/jobs/${job.id}/delete" method="POST" style="margin:0;" onsubmit="return confirm('Delete ${escapeHtml(job.title)}?');">
                <button type="submit" class="btn-glass-pill btn-delete">Delete</button>
              </form>
            </td>
          </tr>
        `;
      })
      .join('');

    const contentHtml =
      jobs.length > 0
        ? `
          <section class="admin-panel-card is-active">
            <div class="admin-panel-header">
              <div>
                <h2 class="admin-panel-title">Published Opportunities</h2>
                <p class="admin-panel-sub">Only job postings created by your account appear here.</p>
              </div>
            </div>
            <div class="admin-table-wrap">
              <table class="admin-table">
                <thead>
                  <tr>
                    <th>Position &amp; Company</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Applicants</th>
                    <th style="text-align: right;">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  ${rowsHtml}
                </tbody>
              </table>
            </div>
          </section>
        `
        : `
          <section class="workspace-empty-card">
            <div class="workspace-empty-icon" aria-hidden="true">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 5v14"></path>
                <path d="M5 12h14"></path>
              </svg>
            </div>
            <h2 class="workspace-empty-title">You haven't posted any job opportunities yet.</h2>
            <p class="workspace-empty-copy">Help fellow students and alumni take the next step in their careers by sharing an open role at your company.</p>
            <a href="/jobs/new" class="workspace-cta-pill">Post a New Job</a>
          </section>
        `;

    return `<!DOCTYPE html>
<html lang="en">
<head>
  ${getHeadTags('My Job Postings | Alumly')}
  <style>${WORKSPACE_INLINE_STYLES}</style>
</head>
<body>
  ${renderSharedHeader()}

  <main class="container workspace-shell">
    <div class="workspace-header-row">
      <div>
        <span class="badge register-eyebrow">● EMPLOYER &amp; ALUMNI WORKSPACE</span>
        <h1 class="workspace-heading">Your Job Postings</h1>
        <p class="workspace-subtitle">Manage the career opportunities you've shared with Alumly, ${escapeHtml(firstName)}.</p>
      </div>
      <a href="/jobs/new" class="workspace-cta-pill">+ Post a New Job</a>
    </div>

    ${flashHtml}

    <div class="workspace-kpi-grid">
      <div class="admin-kpi-card">
        <div class="admin-kpi-label">Total Postings</div>
        <div class="admin-kpi-value">${totalJobs}</div>
        <div class="admin-kpi-sub">Roles created by you</div>
      </div>
      <div class="admin-kpi-card">
        <div class="admin-kpi-label">Active Listings</div>
        <div class="admin-kpi-value">${activeJobs}</div>
        <div class="admin-kpi-sub">Currently accepting applicants</div>
      </div>
      <div class="admin-kpi-card">
        <div class="admin-kpi-label">Total Applicants</div>
        <div class="admin-kpi-value">${totalApplicants}</div>
        <div class="admin-kpi-sub">Across your postings</div>
      </div>
    </div>

    ${contentHtml}
  </main>
</body>
</html>`;
  }
}

module.exports = WorkspaceViews;
