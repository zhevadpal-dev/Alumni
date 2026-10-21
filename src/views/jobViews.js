/**
 * Job Posting Views (Presentation Layer)
 * 
 * Generates server-rendered, responsive HTML view templates for the Job Board UI.
 * Provides views for:
 * - List view with search, filter badges, metrics, and quick-post form (/jobs)
 * - Single job posting detail view with candidate application form & applicant list (/jobs/:id)
 * - Standalone creation form (/jobs/new)
 * - Edit form (/jobs/:id/edit)
 * - Success and error notification pages
 */

class JobViews {
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
      .alert-info { background: #e0f2fe; color: #0369a1; border: 1px solid #7dd3fc; }

      /* Metrics Grid */
      .metrics-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
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

      /* Job List Items */
      .job-card {
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 10px;
        padding: 20px;
        margin-bottom: 16px;
        transition: transform 0.15s ease, box-shadow 0.15s ease;
      }
      .job-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.07);
        border-color: #cbd5e1;
      }
      .job-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 8px;
      }
      .job-title {
        font-size: 1.2rem;
        font-weight: 700;
        color: #1e293b;
        text-decoration: none;
      }
      .job-title:hover { color: #2563eb; }
      .job-company {
        font-size: 1rem;
        font-weight: 600;
        color: #475569;
        margin-bottom: 8px;
      }
      .job-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        font-size: 0.85rem;
        color: #64748b;
        margin-bottom: 12px;
      }
      .meta-item { display: flex; align-items: center; gap: 4px; }
      .job-desc {
        color: #334155;
        font-size: 0.92rem;
        margin-bottom: 16px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .job-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 10px;
        padding-top: 12px;
        border-top: 1px solid #f1f5f9;
      }

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
      .badge-full-time { background: #dcfce7; color: #166534; }
      .badge-part-time { background: #fef3c7; color: #92400e; }
      .badge-contract { background: #f3e8ff; color: #6b21a8; }
      .badge-internship { background: #e0f2fe; color: #0369a1; }
      .badge-remote { background: #e0e7ff; color: #3730a3; }
      
      .badge-active { background: #ecfdf5; color: #059669; border: 1px solid #a7f3d0; }
      .badge-closed { background: #f1f5f9; color: #64748b; border: 1px solid #e2e8f0; }
      .badge-draft { background: #fffbeb; color: #b45309; border: 1px solid #fde68a; }

      /* Application Status Badges */
      .badge-submitted { background: #e0f2fe; color: #0369a1; }
      .badge-under-review { background: #fef3c7; color: #92400e; }
      .badge-shortlisted { background: #ede9fe; color: #5b21b6; }
      .badge-interview-scheduled { background: #fce7f3; color: #9d174d; }
      .badge-accepted { background: #dcfce7; color: #15803d; }
      .badge-rejected { background: #fee2e2; color: #b91c1c; }
      .badge-withdrawn { background: #f1f5f9; color: #64748b; }

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
      input[type="text"], input[type="email"], input[type="url"], input[type="date"], select, textarea {
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
      textarea { resize: vertical; min-height: 100px; }
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
      }
      table { width: 100%; border-collapse: collapse; text-align: left; font-size: 0.9rem; }
      th {
        background-color: #f8fafc;
        color: #475569;
        font-weight: 600;
        padding: 12px 16px;
        border-bottom: 1px solid #e2e8f0;
      }
      td { padding: 12px 16px; border-bottom: 1px solid #f1f5f9; color: #334155; }
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
  static renderNavbar(activeTab = 'jobs') {
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
   * Helper to format job type badge class
   */
  static getJobTypeBadgeClass(type = '') {
    const norm = String(type).toLowerCase().replace(/[^a-z0-9]/g, '-');
    return `badge-${norm}`;
  }

  /**
   * Helper to format application status badge class
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
      return `<div class="alert alert-success">✅ Job posting #${query.id || ''} was published successfully!</div>`;
    }
    if (query.status === 'updated') {
      return `<div class="alert alert-success">✅ Job posting details were updated successfully!</div>`;
    }
    if (query.status === 'deleted') {
      return `<div class="alert alert-success">🗑️ Job posting was deleted successfully from PostgreSQL.</div>`;
    }
    if (query.status === 'applied') {
      return `<div class="alert alert-success">🎉 Application submitted successfully! The hiring team has been notified.</div>`;
    }
    if (query.error) {
      return `<div class="alert alert-error">❌ ${escapeHtml(query.error)}</div>`;
    }
    return '';
  }

  /**
   * 1. GET /jobs (Job Board & Directory View)
   */
  static renderList(jobs = [], stats = {}, filter = {}, users = []) {
    const totalJobs = jobs.length;
    const activeJobs = jobs.filter(j => j.status === 'Active').length;
    const remoteJobs = jobs.filter(j => j.jobType === 'Remote' || (j.location && j.location.toLowerCase().includes('remote'))).length;
    const totalApplications = stats.totalApplications || 0;

    const jobCardsHtml = jobs.length > 0
      ? jobs.map(job => `
          <div class="job-card">
            <div class="job-header">
              <div>
                <a href="/jobs/${job.id}" class="job-title">${escapeHtml(job.title)}</a>
                <div class="job-company">🏢 ${escapeHtml(job.company)}</div>
              </div>
              <div>
                <span class="badge ${job.status === 'Active' ? 'badge-active' : 'badge-closed'}">${escapeHtml(job.status || 'Active')}</span>
              </div>
            </div>
            
            <div class="job-meta">
              <span class="badge ${this.getJobTypeBadgeClass(job.jobType)}">${escapeHtml(job.jobType || 'Full-Time')}</span>
              <span class="meta-item">📍 ${escapeHtml(job.location || 'Remote')}</span>
              ${job.salaryRange ? `<span class="meta-item">💰 ${escapeHtml(job.salaryRange)}</span>` : ''}
              ${job.poster ? `<span class="meta-item">👤 Posted by: <strong>${escapeHtml(job.poster.name)}</strong> (${escapeHtml(job.poster.role || 'alumni')})</span>` : ''}
              ${job.deadline ? `<span class="meta-item">⏰ Deadline: ${new Date(job.deadline).toLocaleDateString()}</span>` : ''}
            </div>

            <div class="job-desc">${escapeHtml(job.description)}</div>

            <div class="job-footer">
              <div style="font-size: 0.8rem; color: #94a3b8;">
                Published: ${job.createdAt ? new Date(job.createdAt).toLocaleDateString() : 'Recently'}
              </div>
              <div style="display: flex; gap: 8px;">
                <a href="/jobs/${job.id}" class="btn btn-primary btn-sm">View & Apply →</a>
                <a href="/jobs/${job.id}/edit" class="btn btn-secondary btn-sm">Edit</a>
                <form action="/jobs/${job.id}/delete" method="POST" style="display:inline;" onsubmit="return confirm('Are you sure you want to delete this job posting?');">
                  <button type="submit" class="btn btn-danger btn-sm">Delete</button>
                </form>
              </div>
            </div>
          </div>
        `).join('')
      : `
        <div class="empty-state">
          <div class="empty-icon">💼</div>
          <h3>No Job Postings Found</h3>
          <p>No job opportunities match your current filter criteria. Try clearing filters or create a new posting below.</p>
        </div>
      `;

    // Users options for poster dropdown
    const userOptions = users.map(u => `
      <option value="${u.id}">${escapeHtml(u.name)} (${escapeHtml(u.role || 'alumni')} - ${escapeHtml(u.department || 'General')})</option>
    `).join('');

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Career Opportunities | Alumni Tracking System</title>
        <style>${this.getBaseStyles()}</style>
      </head>
      <body>
        <div class="container">
          ${this.renderNavbar('jobs')}
          
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: 12px;">
            <div class="db-badge">🐘 PostgreSQL Database: Connected (alumni_db)</div>
            <a href="/jobs/new" class="btn btn-primary">➕ Post New Job Opportunity</a>
          </div>

          ${this.renderFlashBanner(filter)}

          <!-- Metrics Row -->
          <div class="metrics-grid">
            <div class="metric-card">
              <div class="metric-label">Total Postings</div>
              <div class="metric-value">${totalJobs}</div>
              <div class="metric-sub">Active in PostgreSQL</div>
            </div>
            <div class="metric-card">
              <div class="metric-label">Active Opportunities</div>
              <div class="metric-value" style="color: #16a34a;">${activeJobs}</div>
              <div class="metric-sub">Open for applications</div>
            </div>
            <div class="metric-card">
              <div class="metric-label">Remote Positions</div>
              <div class="metric-value" style="color: #4f46e5;">${remoteJobs}</div>
              <div class="metric-sub">Work from anywhere</div>
            </div>
            <div class="metric-card">
              <div class="metric-label">Applications Received</div>
              <div class="metric-value" style="color: #0284c7;">${totalApplications}</div>
              <div class="metric-sub"><a href="/applications" style="color: #0284c7; text-decoration: none;">View candidate board →</a></div>
            </div>
          </div>

          <!-- Search & Filter Toolbar -->
          <form action="/jobs" method="GET" class="filter-toolbar">
            <div style="flex: 2; min-width: 200px;">
              <label for="search">Search Keywords</label>
              <input type="text" id="search" name="search" placeholder="Title, company, skills..." value="${escapeHtml(filter.search || '')}">
            </div>
            <div style="flex: 1; min-width: 140px;">
              <label for="jobType">Job Type</label>
              <select id="jobType" name="jobType">
                <option value="">All Types</option>
                <option value="Full-Time" ${filter.jobType === 'Full-Time' ? 'selected' : ''}>Full-Time</option>
                <option value="Part-Time" ${filter.jobType === 'Part-Time' ? 'selected' : ''}>Part-Time</option>
                <option value="Contract" ${filter.jobType === 'Contract' ? 'selected' : ''}>Contract</option>
                <option value="Internship" ${filter.jobType === 'Internship' ? 'selected' : ''}>Internship</option>
                <option value="Remote" ${filter.jobType === 'Remote' ? 'selected' : ''}>Remote</option>
              </select>
            </div>
            <div style="flex: 1; min-width: 130px;">
              <label for="status">Status</label>
              <select id="status" name="status">
                <option value="">All Statuses</option>
                <option value="Active" ${filter.status === 'Active' ? 'selected' : ''}>Active</option>
                <option value="Closed" ${filter.status === 'Closed' ? 'selected' : ''}>Closed</option>
              </select>
            </div>
            <div style="display: flex; gap: 8px;">
              <button type="submit" class="btn btn-primary">Filter</button>
              <a href="/jobs" class="btn btn-secondary">Clear</a>
            </div>
          </form>

          <!-- Job Listings List -->
          <div>
            ${jobCardsHtml}
          </div>

          <!-- Quick Post Opportunity Form -->
          <div class="card" style="margin-top: 36px; border-top: 4px solid #2563eb;">
            <div class="card-header">
              <div>
                <h3 class="card-title">💼 Quick Post: Share a Career Opportunity</h3>
                <p style="color: #64748b; font-size: 0.85rem; margin: 4px 0 0 0;">
                  Alumni, recruiters, and faculty can publish new job listings directly to PostgreSQL.
                </p>
              </div>
            </div>

            <form action="/jobs" method="POST">
              <div class="form-grid">
                <div class="form-group">
                  <label for="q_title">Job Title *</label>
                  <input type="text" id="q_title" name="title" required placeholder="e.g. Senior Backend Engineer">
                </div>
                <div class="form-group">
                  <label for="q_company">Company Name *</label>
                  <input type="text" id="q_company" name="company" required placeholder="e.g. TechCorp Solutions">
                </div>
                <div class="form-group">
                  <label for="q_location">Location</label>
                  <input type="text" id="q_location" name="location" placeholder="e.g. Istanbul / Remote" value="Remote">
                </div>
                <div class="form-group">
                  <label for="q_jobType">Job Type</label>
                  <select id="q_jobType" name="jobType">
                    <option value="Full-Time" selected>Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="q_salaryRange">Salary Range</label>
                  <input type="text" id="q_salaryRange" name="salaryRange" placeholder="e.g. $85,000 - $115,000">
                </div>
                <div class="form-group">
                  <label for="q_posterId">Posted By (Alumni User)</label>
                  <select id="q_posterId" name="posterId">
                    <option value="">-- Select Poster --</option>
                    ${userOptions}
                  </select>
                </div>
                <div class="form-group full">
                  <label for="q_description">Job Description *</label>
                  <textarea id="q_description" name="description" required placeholder="Describe role responsibilities, team overview, and impact..."></textarea>
                </div>
                <div class="form-group full">
                  <label for="q_requirements">Requirements & Qualifications</label>
                  <textarea id="q_requirements" name="requirements" style="min-height: 80px;" placeholder="Core qualifications, technologies, years of experience..."></textarea>
                </div>
                <div class="form-group">
                  <label for="q_applicationUrl">External Application Link</label>
                  <input type="url" id="q_applicationUrl" name="applicationUrl" placeholder="https://careers.example.com/apply">
                </div>
                <div class="form-group">
                  <label for="q_contactEmail">Contact Email</label>
                  <input type="email" id="q_contactEmail" name="contactEmail" placeholder="recruiting@example.com">
                </div>
              </div>

              <div style="margin-top: 16px; display: flex; justify-content: flex-end; gap: 8px;">
                <button type="reset" class="btn btn-secondary">Reset Form</button>
                <button type="submit" class="btn btn-primary">🚀 Publish Job Opportunity</button>
              </div>
            </form>
          </div>

        </div>
      </body>
      </html>
    `;
  }

  /**
   * 2. GET /jobs/:id (Detail View with Application Form & Applicant List)
   */
  static renderDetail(job, applications = [], users = [], query = {}) {
    const userOptions = users.map(u => `
      <option value="${u.id}">${escapeHtml(u.name)} (${escapeHtml(u.role || 'alumni')} - ${escapeHtml(u.department || 'N/A')})</option>
    `).join('');

    const applicationsHtml = applications.length > 0
      ? `
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Applicant</th>
                <th>Role / Dept</th>
                <th>Applied Date</th>
                <th>Status</th>
                <th>Cover Letter Preview</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${applications.map(app => `
                <tr>
                  <td>
                    <strong>${escapeHtml(app.applicantName || 'Candidate #' + app.userId)}</strong><br>
                    <small style="color: #64748b;">${escapeHtml(app.applicantEmail || '')}</small>
                  </td>
                  <td>
                    ${escapeHtml(app.applicantRole || 'Candidate')}<br>
                    <small style="color: #64748b;">${escapeHtml(app.applicantDepartment || '')}</small>
                  </td>
                  <td>${new Date(app.appliedAt).toLocaleDateString()}</td>
                  <td>
                    <span class="badge ${this.getStatusBadgeClass(app.status)}">${escapeHtml(app.status)}</span>
                  </td>
                  <td style="max-width: 240px; font-size: 0.85rem; color: #475569;">
                    ${escapeHtml(app.coverLetter ? (app.coverLetter.substring(0, 75) + '...') : 'No cover letter attached')}
                    ${app.resumeUrl ? `<br><a href="${escapeHtml(app.resumeUrl)}" target="_blank" style="color: #2563eb; font-size: 0.78rem;">📄 View Resume</a>` : ''}
                  </td>
                  <td>
                    <a href="/applications/${app.id}" class="btn btn-secondary btn-sm">Review →</a>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `
      : `
        <div style="background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 8px; padding: 24px; text-align: center; color: #64748b;">
          No applications have been submitted for this position yet. Use the form below to submit the first application!
        </div>
      `;

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${escapeHtml(job.title)} at ${escapeHtml(job.company)} | Alumni Job Board</title>
        <style>${this.getBaseStyles()}</style>
      </head>
      <body>
        <div class="container">
          ${this.renderNavbar('jobs')}

          <div style="margin-bottom: 16px;">
            <a href="/jobs" class="btn btn-secondary btn-sm">← Back to All Job Postings</a>
          </div>

          ${this.renderFlashBanner(query)}

          <!-- Job Overview Card -->
          <div class="card" style="border-top: 4px solid #2563eb;">
            <div class="card-header">
              <div>
                <span class="badge ${this.getJobTypeBadgeClass(job.jobType)}">${escapeHtml(job.jobType || 'Full-Time')}</span>
                <span class="badge ${job.status === 'Active' ? 'badge-active' : 'badge-closed'}" style="margin-left: 6px;">${escapeHtml(job.status)}</span>
                <h1 style="font-size: 1.8rem; margin: 10px 0 4px 0; color: #0f172a;">${escapeHtml(job.title)}</h1>
                <div style="font-size: 1.1rem; color: #475569; font-weight: 600;">🏢 ${escapeHtml(job.company)}</div>
              </div>
              <div style="display: flex; gap: 8px;">
                <a href="/jobs/${job.id}/edit" class="btn btn-secondary">✏️ Edit Job</a>
                <form action="/jobs/${job.id}/delete" method="POST" onsubmit="return confirm('Are you sure you want to delete this job posting?');" style="display:inline;">
                  <button type="submit" class="btn btn-danger">🗑️ Delete</button>
                </form>
              </div>
            </div>

            <!-- Job Key Attributes -->
            <div class="metrics-grid" style="margin-bottom: 20px;">
              <div class="metric-card" style="padding: 12px 16px;">
                <div class="metric-label">Location</div>
                <div style="font-size: 1.05rem; font-weight: 600; color: #0f172a; margin-top: 4px;">📍 ${escapeHtml(job.location || 'Remote')}</div>
              </div>
              <div class="metric-card" style="padding: 12px 16px;">
                <div class="metric-label">Compensation</div>
                <div style="font-size: 1.05rem; font-weight: 600; color: #15803d; margin-top: 4px;">💰 ${escapeHtml(job.salaryRange || 'Competitive')}</div>
              </div>
              <div class="metric-card" style="padding: 12px 16px;">
                <div class="metric-label">Deadline</div>
                <div style="font-size: 1.05rem; font-weight: 600; color: #0f172a; margin-top: 4px;">⏰ ${job.deadline ? new Date(job.deadline).toLocaleDateString() : 'Rolling'}</div>
              </div>
              <div class="metric-card" style="padding: 12px 16px;">
                <div class="metric-label">Posted By</div>
                <div style="font-size: 1.05rem; font-weight: 600; color: #0f172a; margin-top: 4px;">
                  👤 ${job.poster ? `<a href="/users/${job.poster.id}" style="color: #2563eb; text-decoration: none;">${escapeHtml(job.poster.name)}</a>` : 'System Admin'}
                </div>
              </div>
            </div>

            <div style="margin-bottom: 24px;">
              <h3 style="font-size: 1.1rem; color: #0f172a; margin-bottom: 8px;">Role Overview</h3>
              <div style="white-space: pre-wrap; color: #334155; line-height: 1.6;">${escapeHtml(job.description)}</div>
            </div>

            ${job.requirements ? `
              <div style="margin-bottom: 24px;">
                <h3 style="font-size: 1.1rem; color: #0f172a; margin-bottom: 8px;">Requirements & Qualifications</h3>
                <div style="white-space: pre-wrap; color: #334155; line-height: 1.6;">${escapeHtml(job.requirements)}</div>
              </div>
            ` : ''}

            <div style="display: flex; flex-wrap: wrap; gap: 16px; padding: 16px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
              ${job.applicationUrl ? `
                <div>
                  <span style="font-size: 0.8rem; color: #64748b; font-weight: 600;">EXTERNAL APPLICATION:</span><br>
                  <a href="${escapeHtml(job.applicationUrl)}" target="_blank" style="color: #2563eb; font-weight: 600; text-decoration: none;">${escapeHtml(job.applicationUrl)} ↗</a>
                </div>
              ` : ''}
              ${job.contactEmail ? `
                <div>
                  <span style="font-size: 0.8rem; color: #64748b; font-weight: 600;">INQUIRIES:</span><br>
                  <a href="mailto:${escapeHtml(job.contactEmail)}" style="color: #2563eb; font-weight: 600; text-decoration: none;">${escapeHtml(job.contactEmail)}</a>
                </div>
              ` : ''}
            </div>
          </div>

          <!-- Apply For This Position Section -->
          <div class="card" style="border-top: 4px solid #16a34a;" id="apply-form">
            <div class="card-header">
              <div>
                <h2 class="card-title">📝 Apply for this Position</h2>
                <p style="color: #64748b; font-size: 0.88rem; margin: 4px 0 0 0;">
                  Submit candidate profile and resume to connect via the Alumni Many-to-Many application network.
                </p>
              </div>
            </div>

            <form action="/jobs/${job.id}/apply" method="POST">
              <div class="form-grid">
                <div class="form-group full">
                  <label for="app_userId">Candidate Applicant *</label>
                  <select id="app_userId" name="userId" required>
                    <option value="">-- Choose Candidate User Profile --</option>
                    ${userOptions}
                  </select>
                  <div class="form-hint">Select the user submitting this job application.</div>
                </div>
                <div class="form-group full">
                  <label for="app_coverLetter">Cover Letter / Note to Hiring Team</label>
                  <textarea id="app_coverLetter" name="coverLetter" placeholder="Summarize your qualifications, motivation, and why you are a great match for this role..."></textarea>
                </div>
                <div class="form-group">
                  <label for="app_resumeUrl">Resume / Portfolio Link</label>
                  <input type="url" id="app_resumeUrl" name="resumeUrl" placeholder="https://storage.example.com/resumes/my-cv.pdf">
                  <div class="form-hint">Link to PDF resume, GitHub profile, or personal website.</div>
                </div>
                <div class="form-group">
                  <label for="app_notes">Candidate Notes</label>
                  <input type="text" id="app_notes" name="notes" placeholder="e.g. Available for interview next week">
                </div>
              </div>

              <div style="margin-top: 16px; display: flex; justify-content: flex-end;">
                <button type="submit" class="btn btn-success" style="padding: 10px 24px; font-size: 0.95rem;">
                  🚀 Submit Job Application
                </button>
              </div>
            </form>
          </div>

          <!-- Received Applications List -->
          <div class="card">
            <div class="card-header">
              <div>
                <h3 class="card-title">👥 Received Applications (${applications.length})</h3>
                <p style="color: #64748b; font-size: 0.85rem; margin: 4px 0 0 0;">
                  Candidates who have submitted applications for this specific opportunity.
                </p>
              </div>
              <a href="/applications" class="btn btn-secondary btn-sm">All Applications Board →</a>
            </div>

            ${applicationsHtml}
          </div>

        </div>
      </body>
      </html>
    `;
  }

  /**
   * 3. GET /jobs/new (Standalone Job Creation View)
   */
  static renderNewForm(users = [], query = {}) {
    const userOptions = users.map(u => `
      <option value="${u.id}">${escapeHtml(u.name)} (${escapeHtml(u.role || 'alumni')} - ${escapeHtml(u.department || 'General')})</option>
    `).join('');

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Create Job Posting | Alumni Tracking System</title>
        <style>${this.getBaseStyles()}</style>
      </head>
      <body>
        <div class="container">
          ${this.renderNavbar('jobs')}

          <div style="margin-bottom: 16px;">
            <a href="/jobs" class="btn btn-secondary btn-sm">← Back to Job Postings</a>
          </div>

          ${this.renderFlashBanner(query)}

          <div class="card" style="border-top: 4px solid #2563eb;">
            <div class="card-header">
              <div>
                <h2 class="card-title">💼 Post a New Job Opportunity</h2>
                <p style="color: #64748b; font-size: 0.9rem; margin: 4px 0 0 0;">
                  Publish a new career opportunity for alumni and students in PostgreSQL.
                </p>
              </div>
            </div>

            <form action="/jobs" method="POST">
              <div class="form-grid">
                <div class="form-group">
                  <label for="title">Position Title *</label>
                  <input type="text" id="title" name="title" required placeholder="e.g. Lead Cloud Architect">
                </div>
                <div class="form-group">
                  <label for="company">Company / Organization *</label>
                  <input type="text" id="company" name="company" required placeholder="e.g. CloudScale Systems">
                </div>
                <div class="form-group">
                  <label for="location">Location</label>
                  <input type="text" id="location" name="location" value="Remote" placeholder="e.g. Istanbul / Hybrid">
                </div>
                <div class="form-group">
                  <label for="jobType">Job Type</label>
                  <select id="jobType" name="jobType">
                    <option value="Full-Time" selected>Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="salaryRange">Salary Range</label>
                  <input type="text" id="salaryRange" name="salaryRange" placeholder="e.g. $90,000 - $120,000">
                </div>
                <div class="form-group">
                  <label for="status">Publication Status</label>
                  <select id="status" name="status">
                    <option value="Active" selected>Active (Open for applications)</option>
                    <option value="Draft">Draft (Internal review)</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="posterId">Posted By (Alumni User)</label>
                  <select id="posterId" name="posterId">
                    <option value="">-- Select Poster --</option>
                    ${userOptions}
                  </select>
                </div>
                <div class="form-group">
                  <label for="deadline">Application Deadline</label>
                  <input type="date" id="deadline" name="deadline">
                </div>
                <div class="form-group full">
                  <label for="description">Job Description *</label>
                  <textarea id="description" name="description" required placeholder="Comprehensive description of responsibilities, duties, and culture..."></textarea>
                </div>
                <div class="form-group full">
                  <label for="requirements">Requirements & Qualifications</label>
                  <textarea id="requirements" name="requirements" placeholder="Key skills, educational background, and technical experience..."></textarea>
                </div>
                <div class="form-group">
                  <label for="applicationUrl">External Application Portal</label>
                  <input type="url" id="applicationUrl" name="applicationUrl" placeholder="https://careers.example.com/apply">
                </div>
                <div class="form-group">
                  <label for="contactEmail">Recruiter Contact Email</label>
                  <input type="email" id="contactEmail" name="contactEmail" placeholder="careers@example.com">
                </div>
              </div>

              <div style="margin-top: 24px; display: flex; justify-content: flex-end; gap: 10px;">
                <a href="/jobs" class="btn btn-secondary">Cancel</a>
                <button type="submit" class="btn btn-primary">🚀 Publish Opportunity</button>
              </div>
            </form>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  /**
   * 4. GET /jobs/:id/edit (Pre-Populated Edit View)
   */
  static renderEditForm(job, users = [], query = {}) {
    const userOptions = users.map(u => `
      <option value="${u.id}" ${job.posterId === u.id ? 'selected' : ''}>
        ${escapeHtml(u.name)} (${escapeHtml(u.role || 'alumni')} - ${escapeHtml(u.department || 'General')})
      </option>
    `).join('');

    const formattedDeadline = job.deadline
      ? new Date(job.deadline).toISOString().split('T')[0]
      : '';

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Edit ${escapeHtml(job.title)} | Alumni Tracking System</title>
        <style>${this.getBaseStyles()}</style>
      </head>
      <body>
        <div class="container">
          ${this.renderNavbar('jobs')}

          <div style="margin-bottom: 16px;">
            <a href="/jobs/${job.id}" class="btn btn-secondary btn-sm">← Back to Job Detail</a>
          </div>

          ${this.renderFlashBanner(query)}

          <div class="card" style="border-top: 4px solid #f59e0b;">
            <div class="card-header">
              <div>
                <h2 class="card-title">✏️ Edit Job Posting #${job.id}</h2>
                <p style="color: #64748b; font-size: 0.9rem; margin: 4px 0 0 0;">
                  Update job requirements, compensation, and publication lifecycle status in PostgreSQL.
                </p>
              </div>
            </div>

            <form action="/jobs/${job.id}/edit" method="POST">
              <div class="form-grid">
                <div class="form-group">
                  <label for="title">Position Title *</label>
                  <input type="text" id="title" name="title" required value="${escapeHtml(job.title)}">
                </div>
                <div class="form-group">
                  <label for="company">Company / Organization *</label>
                  <input type="text" id="company" name="company" required value="${escapeHtml(job.company)}">
                </div>
                <div class="form-group">
                  <label for="location">Location</label>
                  <input type="text" id="location" name="location" value="${escapeHtml(job.location || '')}">
                </div>
                <div class="form-group">
                  <label for="jobType">Job Type</label>
                  <select id="jobType" name="jobType">
                    <option value="Full-Time" ${job.jobType === 'Full-Time' ? 'selected' : ''}>Full-Time</option>
                    <option value="Part-Time" ${job.jobType === 'Part-Time' ? 'selected' : ''}>Part-Time</option>
                    <option value="Contract" ${job.jobType === 'Contract' ? 'selected' : ''}>Contract</option>
                    <option value="Internship" ${job.jobType === 'Internship' ? 'selected' : ''}>Internship</option>
                    <option value="Remote" ${job.jobType === 'Remote' ? 'selected' : ''}>Remote</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="salaryRange">Salary Range</label>
                  <input type="text" id="salaryRange" name="salaryRange" value="${escapeHtml(job.salaryRange || '')}">
                </div>
                <div class="form-group">
                  <label for="status">Publication Status</label>
                  <select id="status" name="status">
                    <option value="Active" ${job.status === 'Active' ? 'selected' : ''}>Active</option>
                    <option value="Closed" ${job.status === 'Closed' ? 'selected' : ''}>Closed</option>
                    <option value="Draft" ${job.status === 'Draft' ? 'selected' : ''}>Draft</option>
                    <option value="Expired" ${job.status === 'Expired' ? 'selected' : ''}>Expired</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="posterId">Posted By (Alumni User)</label>
                  <select id="posterId" name="posterId">
                    <option value="">-- Select Poster --</option>
                    ${userOptions}
                  </select>
                </div>
                <div class="form-group">
                  <label for="deadline">Application Deadline</label>
                  <input type="date" id="deadline" name="deadline" value="${formattedDeadline}">
                </div>
                <div class="form-group full">
                  <label for="description">Job Description *</label>
                  <textarea id="description" name="description" required>${escapeHtml(job.description)}</textarea>
                </div>
                <div class="form-group full">
                  <label for="requirements">Requirements & Qualifications</label>
                  <textarea id="requirements" name="requirements">${escapeHtml(job.requirements || '')}</textarea>
                </div>
                <div class="form-group">
                  <label for="applicationUrl">External Application Portal</label>
                  <input type="url" id="applicationUrl" name="applicationUrl" value="${escapeHtml(job.applicationUrl || '')}">
                </div>
                <div class="form-group">
                  <label for="contactEmail">Recruiter Contact Email</label>
                  <input type="email" id="contactEmail" name="contactEmail" value="${escapeHtml(job.contactEmail || '')}">
                </div>
              </div>

              <div style="margin-top: 24px; display: flex; justify-content: flex-end; gap: 10px;">
                <a href="/jobs/${job.id}" class="btn btn-secondary">Cancel</a>
                <button type="submit" class="btn btn-primary">💾 Save Modifications</button>
              </div>
            </form>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  /**
   * Render Error Page
   */
  static renderError(message = 'An unexpected error occurred.', backUrl = '/jobs') {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Error | Alumni Job Board</title>
        <style>${this.getBaseStyles()}</style>
      </head>
      <body>
        <div class="container">
          ${this.renderNavbar('jobs')}
          <div class="card" style="border-top: 4px solid #ef4444; text-align: center; padding: 40px 24px;">
            <div style="font-size: 3rem; margin-bottom: 12px;">⚠️</div>
            <h2 style="color: #b91c1c; margin-bottom: 12px;">Operation Encountered An Error</h2>
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

module.exports = JobViews;
