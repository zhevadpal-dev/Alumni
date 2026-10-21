/**
 * Application Views (Presentation Layer)
 * 
 * Generates server-rendered, responsive HTML view templates for the Application Tracking UI.
 * Provides views for:
 * - Candidate Applications Management Board (/applications)
 * - Single application review & status transition view (/applications/:id)
 * - Error and feedback screens
 */

class ApplicationViews {
  /**
   * Common CSS styling matching project design standards
   */
  static getBaseStyles() {
    return `
      * { box-sizing: border-box; }
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        background-color: #f8fafc;
        color: #0f172a;
        margin: 0;
        padding: 24px;
        line-height: 1.5;
      }
      .container { max-width: 1040px; margin: 0 auto; }
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 2px solid #e2e8f0;
        padding-bottom: 16px;
        margin-bottom: 24px;
        flex-wrap: wrap;
        gap: 12px;
      }
      .brand { display: flex; align-items: center; gap: 12px; }
      .brand-icon { font-size: 2rem; }
      .title { font-size: 1.6rem; font-weight: 700; color: #0f172a; margin: 0; }
      .subtitle { color: #64748b; font-size: 0.95rem; margin-top: 4px; }
      
      .nav-links { display: flex; gap: 8px; flex-wrap: wrap; }
      .nav-links a {
        display: inline-block;
        background: #ffffff;
        color: #334155;
        border: 1px solid #cbd5e1;
        padding: 8px 14px;
        border-radius: 6px;
        text-decoration: none;
        font-weight: 500;
        font-size: 0.85rem;
        transition: all 0.15s ease;
      }
      .nav-links a:hover { background: #f1f5f9; color: #0f172a; }
      .nav-links a.active {
        background: #2563eb;
        color: #ffffff;
        border-color: #2563eb;
      }
      .nav-links a.active:hover { background: #1d4ed8; }

      .db-badge {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        background: #ecfdf5;
        color: #047857;
        border: 1px solid #a7f3d0;
        padding: 6px 12px;
        border-radius: 9999px;
        font-size: 0.8rem;
        font-weight: 600;
        margin-bottom: 20px;
      }

      /* Alert banners */
      .alert {
        padding: 14px 18px;
        border-radius: 8px;
        margin-bottom: 20px;
        font-size: 0.92rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .alert-success { background: #dcfce7; color: #15803d; border: 1px solid #86efac; }
      .alert-error { background: #fee2e2; color: #b91c1c; border: 1px solid #fca5a5; }

      /* Metrics Grid */
      .metrics-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 16px;
        margin-bottom: 24px;
      }
      .metric-card {
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 10px;
        padding: 16px 20px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.04);
      }
      .metric-label { font-size: 0.8rem; color: #64748b; text-transform: uppercase; font-weight: 600; }
      .metric-value { font-size: 1.8rem; font-weight: 700; color: #0f172a; margin-top: 4px; }
      .metric-sub { font-size: 0.8rem; color: #94a3b8; margin-top: 2px; }

      /* Cards */
      .card {
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 10px;
        padding: 24px;
        margin-bottom: 24px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.05);
      }
      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 16px;
        flex-wrap: wrap;
        gap: 10px;
      }
      .card-title { font-size: 1.25rem; font-weight: 700; color: #0f172a; margin: 0; }

      /* Badges */
      .badge {
        display: inline-block;
        padding: 4px 10px;
        border-radius: 9999px;
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.03em;
      }
      .badge-submitted { background: #e0f2fe; color: #0369a1; border: 1px solid #bae6fd; }
      .badge-under-review { background: #fef3c7; color: #92400e; border: 1px solid #fde68a; }
      .badge-shortlisted { background: #ede9fe; color: #5b21b6; border: 1px solid #ddd6fe; }
      .badge-interview-scheduled { background: #fce7f3; color: #9d174d; border: 1px solid #fbcfe8; }
      .badge-accepted { background: #dcfce7; color: #15803d; border: 1px solid #bbf7d0; }
      .badge-rejected { background: #fee2e2; color: #b91c1c; border: 1px solid #fecaca; }
      .badge-withdrawn { background: #f1f5f9; color: #64748b; border: 1px solid #e2e8f0; }

      /* Buttons */
      .btn {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 8px 16px;
        border-radius: 6px;
        font-weight: 500;
        font-size: 0.85rem;
        text-decoration: none;
        cursor: pointer;
        border: 1px solid transparent;
        transition: background 0.15s ease;
      }
      .btn-primary { background: #2563eb; color: #ffffff; }
      .btn-primary:hover { background: #1d4ed8; }
      .btn-secondary { background: #ffffff; color: #334155; border-color: #cbd5e1; }
      .btn-secondary:hover { background: #f1f5f9; }
      .btn-danger { background: #ffffff; color: #dc2626; border-color: #fca5a5; }
      .btn-danger:hover { background: #fee2e2; }
      .btn-success { background: #16a34a; color: #ffffff; }
      .btn-success:hover { background: #15803d; }
      .btn-sm { padding: 5px 10px; font-size: 0.8rem; }

      /* Forms */
      .form-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 16px;
      }
      .form-group { margin-bottom: 16px; }
      .form-group.full { grid-column: 1 / -1; }
      label {
        display: block;
        font-weight: 600;
        font-size: 0.85rem;
        color: #334155;
        margin-bottom: 6px;
      }
      input[type="text"], input[type="email"], input[type="url"], select, textarea {
        width: 100%;
        padding: 9px 12px;
        border: 1px solid #cbd5e1;
        border-radius: 6px;
        font-size: 0.9rem;
        color: #0f172a;
        background: #ffffff;
        font-family: inherit;
      }
      input:focus, select:focus, textarea:focus {
        outline: none;
        border-color: #2563eb;
        box-shadow: 0 0 0 3px rgba(37,99,235,0.15);
      }
      textarea { resize: vertical; min-height: 90px; }
      .form-hint { font-size: 0.78rem; color: #64748b; margin-top: 4px; }

      /* Filter Toolbar */
      .filter-toolbar {
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        padding: 16px;
        margin-bottom: 24px;
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        align-items: flex-end;
      }

      /* Tables */
      .table-wrapper {
        overflow-x: auto;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        background: #ffffff;
        margin-bottom: 24px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.05);
      }
      table { width: 100%; border-collapse: collapse; text-align: left; font-size: 0.9rem; }
      th {
        background-color: #f8fafc;
        color: #475569;
        font-weight: 600;
        padding: 12px 16px;
        border-bottom: 1px solid #e2e8f0;
      }
      td { padding: 12px 16px; border-bottom: 1px solid #f1f5f9; color: #334155; vertical-align: middle; }
      tr:last-child td { border-bottom: none; }
      tr:hover td { background-color: #f8fafc; }

      .empty-state {
        text-align: center;
        padding: 48px 24px;
        color: #64748b;
      }
      .empty-icon { font-size: 3rem; margin-bottom: 12px; }
    `;
  }

  /**
   * Universal header navigation bar
   */
  static renderNavbar(activeTab = 'applications') {
    return `
      <header class="header">
        <div class="brand">
          <span class="brand-icon">🎓</span>
          <div>
            <h1 class="title">Alumni Tracking System</h1>
            <div class="subtitle">Career Opportunities & Job Applications Portal</div>
          </div>
        </div>
        <nav class="nav-links">
          <a href="/" class="${activeTab === 'home' ? 'active' : ''}">🏠 Home</a>
          <a href="/users" class="${activeTab === 'users' ? 'active' : ''}">👥 Users</a>
          <a href="/announcements" class="${activeTab === 'announcements' ? 'active' : ''}">📢 Announcements</a>
          <a href="/jobs" class="${activeTab === 'jobs' ? 'active' : ''}">💼 Jobs</a>
          <a href="/applications" class="${activeTab === 'applications' ? 'active' : ''}">📝 Applications</a>
          <a href="/api/swagger" target="_blank">📖 API Docs</a>
        </nav>
      </header>
    `;
  }

  /**
   * Format application status badge class
   */
  static getStatusBadgeClass(status = '') {
    const norm = String(status).toLowerCase().replace(/\s+/g, '-');
    return `badge-${norm}`;
  }

  /**
   * Render Flash Message banner if present in query parameters
   */
  static renderFlashBanner(query = {}) {
    if (query.status === 'created') {
      return `<div class="alert alert-success">✅ Application submitted successfully and persisted to PostgreSQL!</div>`;
    }
    if (query.status === 'updated') {
      return `<div class="alert alert-success">✅ Application review status was updated successfully!</div>`;
    }
    if (query.status === 'deleted') {
      return `<div class="alert alert-success">🗑️ Application was removed / withdrawn successfully.</div>`;
    }
    if (query.error) {
      return `<div class="alert alert-error">❌ ${escapeHtml(query.error)}</div>`;
    }
    return '';
  }

  /**
   * 1. GET /applications (Applications Tracking Dashboard View)
   */
  static renderList(applications = [], stats = {}, filter = {}, jobs = [], users = []) {
    const totalApps = applications.length;
    const underReview = applications.filter(a => a.status === 'Under Review').length;
    const shortlisted = applications.filter(a => a.status === 'Shortlisted' || a.status === 'Interview Scheduled').length;
    const accepted = applications.filter(a => a.status === 'Accepted').length;

    const jobOptions = jobs.map(j => `
      <option value="${j.id}" ${filter.jobId == j.id ? 'selected' : ''}>
        ${escapeHtml(j.title)} (${escapeHtml(j.company)})
      </option>
    `).join('');

    const userOptions = users.map(u => `
      <option value="${u.id}" ${filter.userId == u.id ? 'selected' : ''}>
        ${escapeHtml(u.name)} (${escapeHtml(u.role || 'alumni')} - ${escapeHtml(u.department || 'N/A')})
      </option>
    `).join('');

    const tableRowsHtml = applications.length > 0
      ? applications.map(app => `
          <tr>
            <td><strong>#${app.id}</strong></td>
            <td>
              <a href="/users/${app.userId}" style="color: #2563eb; font-weight: 600; text-decoration: none;">
                ${escapeHtml(app.applicant ? app.applicant.name : 'Candidate #' + app.userId)}
              </a><br>
              <small style="color: #64748b;">${escapeHtml(app.applicant ? app.applicant.email : '')}</small>
            </td>
            <td>
              <a href="/jobs/${app.jobId}" style="color: #0f172a; font-weight: 600; text-decoration: none;">
                ${escapeHtml(app.job ? app.job.title : 'Job #' + app.jobId)}
              </a><br>
              <small style="color: #64748b;">🏢 ${escapeHtml(app.job ? app.job.company : '')}</small>
            </td>
            <td>
              <span class="badge ${this.getStatusBadgeClass(app.status)}">${escapeHtml(app.status)}</span>
            </td>
            <td>${new Date(app.appliedAt).toLocaleDateString()}</td>
            <td>
              <form action="/applications/${app.id}/status" method="POST" style="display: flex; gap: 4px; align-items: center;">
                <select name="status" style="padding: 4px 8px; font-size: 0.8rem; width: auto;" onchange="this.form.submit()">
                  <option value="Submitted" ${app.status === 'Submitted' ? 'selected' : ''}>Submitted</option>
                  <option value="Under Review" ${app.status === 'Under Review' ? 'selected' : ''}>Under Review</option>
                  <option value="Shortlisted" ${app.status === 'Shortlisted' ? 'selected' : ''}>Shortlisted</option>
                  <option value="Interview Scheduled" ${app.status === 'Interview Scheduled' ? 'selected' : ''}>Interview</option>
                  <option value="Accepted" ${app.status === 'Accepted' ? 'selected' : ''}>Accepted</option>
                  <option value="Rejected" ${app.status === 'Rejected' ? 'selected' : ''}>Rejected</option>
                  <option value="Withdrawn" ${app.status === 'Withdrawn' ? 'selected' : ''}>Withdrawn</option>
                </select>
                <a href="/applications/${app.id}" class="btn btn-secondary btn-sm" title="View Dossier">👁️</a>
                <button type="submit" formaction="/applications/${app.id}/delete" class="btn btn-danger btn-sm" title="Withdraw / Delete" onclick="return confirm('Withdraw application #${app.id}?');">🗑️</button>
              </form>
            </td>
          </tr>
        `).join('')
      : `
        <tr>
          <td colspan="6">
            <div class="empty-state">
              <div class="empty-icon">📝</div>
              <h3>No Job Applications Found</h3>
              <p>There are no candidate applications matching your query. Explore job postings to submit applications.</p>
              <a href="/jobs" class="btn btn-primary" style="margin-top: 8px;">Explore Job Board →</a>
            </div>
          </td>
        </tr>
      `;

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Applications Tracking Board | Alumni Tracking System</title>
        <style>${this.getBaseStyles()}</style>
      </head>
      <body>
        <div class="container">
          ${this.renderNavbar('applications')}

          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: 12px;">
            <div class="db-badge">🐘 PostgreSQL Database: Connected (alumni_db)</div>
            <a href="/jobs" class="btn btn-secondary">💼 Go to Job Board</a>
          </div>

          ${this.renderFlashBanner(filter)}

          <!-- Metrics Row -->
          <div class="metrics-grid">
            <div class="metric-card">
              <div class="metric-label">Total Submissions</div>
              <div class="metric-value">${totalApps}</div>
              <div class="metric-sub">Many-to-Many actions in DB</div>
            </div>
            <div class="metric-card">
              <div class="metric-label">Under Review</div>
              <div class="metric-value" style="color: #b45309;">${underReview}</div>
              <div class="metric-sub">Active screening</div>
            </div>
            <div class="metric-card">
              <div class="metric-label">Shortlisted / Interview</div>
              <div class="metric-value" style="color: #6b21a8;">${shortlisted}</div>
              <div class="metric-sub">Advanced stages</div>
            </div>
            <div class="metric-card">
              <div class="metric-label">Accepted Offers</div>
              <div class="metric-value" style="color: #16a34a;">${accepted}</div>
              <div class="metric-sub">Successful placements</div>
            </div>
          </div>

          <!-- Filter Toolbar -->
          <form action="/applications" method="GET" class="filter-toolbar">
            <div style="flex: 2; min-width: 220px;">
              <label for="f_jobId">Filter by Job Posting</label>
              <select id="f_jobId" name="jobId">
                <option value="">All Job Opportunities</option>
                ${jobOptions}
              </select>
            </div>
            <div style="flex: 2; min-width: 200px;">
              <label for="f_userId">Filter by Candidate</label>
              <select id="f_userId" name="userId">
                <option value="">All Candidates</option>
                ${userOptions}
              </select>
            </div>
            <div style="flex: 1; min-width: 140px;">
              <label for="f_status">Review Status</label>
              <select id="f_status" name="status">
                <option value="">All Statuses</option>
                <option value="Submitted" ${filter.status === 'Submitted' ? 'selected' : ''}>Submitted</option>
                <option value="Under Review" ${filter.status === 'Under Review' ? 'selected' : ''}>Under Review</option>
                <option value="Shortlisted" ${filter.status === 'Shortlisted' ? 'selected' : ''}>Shortlisted</option>
                <option value="Interview Scheduled" ${filter.status === 'Interview Scheduled' ? 'selected' : ''}>Interview Scheduled</option>
                <option value="Accepted" ${filter.status === 'Accepted' ? 'selected' : ''}>Accepted</option>
                <option value="Rejected" ${filter.status === 'Rejected' ? 'selected' : ''}>Rejected</option>
                <option value="Withdrawn" ${filter.status === 'Withdrawn' ? 'selected' : ''}>Withdrawn</option>
              </select>
            </div>
            <div style="display: flex; gap: 8px;">
              <button type="submit" class="btn btn-primary">Filter</button>
              <a href="/applications" class="btn btn-secondary">Clear</a>
            </div>
          </form>

          <!-- Applications Table -->
          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Candidate</th>
                  <th>Target Position & Company</th>
                  <th>Status</th>
                  <th>Applied On</th>
                  <th>Review Action</th>
                </tr>
              </thead>
              <tbody>
                ${tableRowsHtml}
              </tbody>
            </table>
          </div>

          <!-- Quick Candidate Application Submission Form -->
          <div class="card" style="margin-top: 36px; border-top: 4px solid #16a34a;">
            <div class="card-header">
              <div>
                <h3 class="card-title">📝 Submit New Candidate Application</h3>
                <p style="color: #64748b; font-size: 0.85rem; margin: 4px 0 0 0;">
                  Links a User profile to an active Job Posting in PostgreSQL. Enforces unique (user_id, job_id).
                </p>
              </div>
            </div>

            <form action="/applications" method="POST">
              <div class="form-grid">
                <div class="form-group">
                  <label for="new_userId">Candidate Applicant *</label>
                  <select id="new_userId" name="userId" required>
                    <option value="">-- Choose Candidate User --</option>
                    ${userOptions}
                  </select>
                </div>
                <div class="form-group">
                  <label for="new_jobId">Target Job Opportunity *</label>
                  <select id="new_jobId" name="jobId" required>
                    <option value="">-- Choose Job Opening --</option>
                    ${jobOptions}
                  </select>
                </div>
                <div class="form-group">
                  <label for="new_status">Initial Review Status</label>
                  <select id="new_status" name="status">
                    <option value="Submitted" selected>Submitted</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Interview Scheduled">Interview Scheduled</option>
                    <option value="Accepted">Accepted</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="new_resumeUrl">Resume / CV Link</label>
                  <input type="url" id="new_resumeUrl" name="resumeUrl" placeholder="https://storage.example.com/resumes/candidate.pdf">
                </div>
                <div class="form-group full">
                  <label for="new_coverLetter">Cover Letter / Statement</label>
                  <textarea id="new_coverLetter" name="coverLetter" placeholder="Candidate introductory statement or referral background..."></textarea>
                </div>
                <div class="form-group full">
                  <label for="new_notes">Recruiter Notes</label>
                  <input type="text" id="new_notes" name="notes" placeholder="e.g. Recommended by faculty advisor">
                </div>
              </div>

              <div style="margin-top: 16px; display: flex; justify-content: flex-end; gap: 8px;">
                <button type="reset" class="btn btn-secondary">Reset</button>
                <button type="submit" class="btn btn-success">✅ Register Application</button>
              </div>
            </form>
          </div>

        </div>
      </body>
      </html>
    `;
  }

  /**
   * 2. GET /applications/:id (Single Application Dossier View)
   */
  static renderDetail(app, query = {}) {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Application #${app.id} | Alumni Tracking System</title>
        <style>${this.getBaseStyles()}</style>
      </head>
      <body>
        <div class="container">
          ${this.renderNavbar('applications')}

          <div style="margin-bottom: 16px;">
            <a href="/applications" class="btn btn-secondary btn-sm">← Back to Applications Board</a>
          </div>

          ${this.renderFlashBanner(query)}

          <!-- Application Header Card -->
          <div class="card" style="border-top: 4px solid #2563eb;">
            <div class="card-header">
              <div>
                <span class="badge ${this.getStatusBadgeClass(app.status)}">${escapeHtml(app.status)}</span>
                <span style="font-size: 0.85rem; color: #64748b; margin-left: 8px;">Submitted: ${new Date(app.appliedAt).toLocaleString()}</span>
                <h1 style="font-size: 1.6rem; margin: 10px 0 4px 0; color: #0f172a;">Application #${app.id} Dossier</h1>
              </div>
              <div>
                <form action="/applications/${app.id}/delete" method="POST" onsubmit="return confirm('Withdraw / Delete application #${app.id}?');" style="display:inline;">
                  <button type="submit" class="btn btn-danger">🗑️ Withdraw Application</button>
                </form>
              </div>
            </div>

            <!-- Candidate & Target Job Side by Side -->
            <div class="metrics-grid" style="grid-template-columns: 1fr 1fr; margin-bottom: 24px;">
              <div class="metric-card">
                <div class="metric-label">👤 Candidate Profile</div>
                <div style="font-size: 1.15rem; font-weight: 700; color: #0f172a; margin-top: 4px;">
                  ${app.applicant ? `<a href="/users/${app.applicant.id}" style="color: #2563eb; text-decoration: none;">${escapeHtml(app.applicant.name)}</a>` : 'Candidate #' + app.userId}
                </div>
                <div style="font-size: 0.88rem; color: #475569; margin-top: 2px;">
                  ✉️ ${escapeHtml(app.applicant ? app.applicant.email : 'N/A')}<br>
                  🎓 Role: ${escapeHtml(app.applicant ? app.applicant.role : 'alumni')} | Dept: ${escapeHtml(app.applicant ? app.applicant.department : 'General')}
                </div>
              </div>

              <div class="metric-card">
                <div class="metric-label">💼 Target Opportunity</div>
                <div style="font-size: 1.15rem; font-weight: 700; color: #0f172a; margin-top: 4px;">
                  ${app.job ? `<a href="/jobs/${app.job.id}" style="color: #0f172a; text-decoration: none;">${escapeHtml(app.job.title)}</a>` : 'Job #' + app.jobId}
                </div>
                <div style="font-size: 0.88rem; color: #475569; margin-top: 2px;">
                  🏢 Company: <strong>${escapeHtml(app.job ? app.job.company : 'N/A')}</strong><br>
                  📍 Location: ${escapeHtml(app.job ? app.job.location : 'Remote')} | Status: ${escapeHtml(app.job ? app.job.status : 'Active')}
                </div>
              </div>
            </div>

            <!-- Cover Letter -->
            <div style="margin-bottom: 24px;">
              <h3 style="font-size: 1.1rem; color: #0f172a; margin-bottom: 8px;">Cover Letter / Personal Statement</h3>
              <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px; white-space: pre-wrap; color: #334155; line-height: 1.6;">
                ${escapeHtml(app.coverLetter || 'No cover letter attached.')}
              </div>
            </div>

            <!-- Resume Link & Notes -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin-bottom: 24px;">
              <div style="background: #f1f5f9; border-radius: 8px; padding: 16px;">
                <span class="metric-label">📄 Attached Resume</span><br>
                ${app.resumeUrl
                  ? `<a href="${escapeHtml(app.resumeUrl)}" target="_blank" class="btn btn-primary btn-sm" style="margin-top: 8px;">Open Resume Document ↗</a>`
                  : '<span style="color: #64748b; font-size: 0.88rem;">No resume URL provided</span>'
                }
              </div>
              <div style="background: #f1f5f9; border-radius: 8px; padding: 16px;">
                <span class="metric-label">📝 Reviewer Notes</span><br>
                <div style="margin-top: 6px; color: #334155; font-size: 0.9rem;">
                  ${escapeHtml(app.notes || 'No reviewer notes recorded yet.')}
                </div>
              </div>
            </div>

            <!-- Update Review Status Action Panel -->
            <div style="border-top: 2px solid #e2e8f0; padding-top: 20px;">
              <h3 style="font-size: 1.05rem; color: #0f172a; margin-bottom: 12px;">Advance Review Workflow</h3>
              <form action="/applications/${app.id}/status" method="POST" style="display: flex; flex-wrap: wrap; gap: 12px; align-items: flex-end;">
                <div style="min-width: 200px;">
                  <label for="status_select">Application Status</label>
                  <select id="status_select" name="status">
                    <option value="Submitted" ${app.status === 'Submitted' ? 'selected' : ''}>Submitted</option>
                    <option value="Under Review" ${app.status === 'Under Review' ? 'selected' : ''}>Under Review</option>
                    <option value="Shortlisted" ${app.status === 'Shortlisted' ? 'selected' : ''}>Shortlisted</option>
                    <option value="Interview Scheduled" ${app.status === 'Interview Scheduled' ? 'selected' : ''}>Interview Scheduled</option>
                    <option value="Accepted" ${app.status === 'Accepted' ? 'selected' : ''}>Accepted</option>
                    <option value="Rejected" ${app.status === 'Rejected' ? 'selected' : ''}>Rejected</option>
                    <option value="Withdrawn" ${app.status === 'Withdrawn' ? 'selected' : ''}>Withdrawn</option>
                  </select>
                </div>
                <div style="flex: 2; min-width: 250px;">
                  <label for="notes_input">Update Reviewer Notes</label>
                  <input type="text" id="notes_input" name="notes" placeholder="e.g. Cleared technical interview round 2" value="${escapeHtml(app.notes || '')}">
                </div>
                <button type="submit" class="btn btn-primary" style="padding: 10px 20px;">💾 Update Status</button>
              </form>
            </div>

          </div>
        </div>
      </body>
      </html>
    `;
  }

  /**
   * Render Error Page
   */
  static renderError(message = 'An unexpected error occurred.', backUrl = '/applications') {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Error | Applications Tracking Board</title>
        <style>${this.getBaseStyles()}</style>
      </head>
      <body>
        <div class="container">
          ${this.renderNavbar('applications')}
          <div class="card" style="border-top: 4px solid #ef4444; text-align: center; padding: 40px 24px;">
            <div style="font-size: 3rem; margin-bottom: 12px;">⚠️</div>
            <h2 style="color: #b91c1c; margin-bottom: 12px;">Application Operation Failed</h2>
            <p style="color: #475569; max-width: 500px; margin: 0 auto 24px auto;">${escapeHtml(message)}</p>
            <a href="${backUrl}" class="btn btn-primary">Return Back</a>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}

/**
 * Sanitize untrusted input strings to avoid XSS
 */
function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

module.exports = ApplicationViews;
