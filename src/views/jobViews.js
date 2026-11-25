/**
 * Job Posting Views (Presentation Layer)
 * 
 * Generates server-rendered, responsive HTML view templates for the Job Board UI.
 * Canonical design.md Implementation:
 * - Dual Typography: Source Serif 4 (Headings) + Inter (UI) + JetBrains Mono (Eyebrows)
 * - Zero Drop-Shadows (Flat Hairline Architecture)
 * - Primary Button: Deep Teal (#1c5d5f) with Pill Shape (48px radius)
 * - Cards: 1px Fog Border (#d1d4d9)
 * - Pastel Domain Taxonomy (Mint Green for Careers & Jobs)
 */

const { getGlobalStyles, getHeadTags, renderUserSessionControls, renderAdminNavItem } = require('./styles');

class JobViews {
  /**
   * Common CSS styling matching project design standards (design.md)
   */
  static getBaseStyles() {
    return getGlobalStyles();
  }

  static getLegacyJobStyles() {
    return getGlobalStyles();
  }

  static getUnusedLegacyStyles() {
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
      .btn-primary { background: #16191c; color: #ffffff; border-radius: 100px; }
      .btn-primary:hover { background: #2c3137; }
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
      .form-hint { font-size: 0.75rem; font-weight: 400; line-height: 1.4; color: rgba(22, 25, 28, 0.6); margin-top: 6px; padding-left: 4px; display: block; }

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
  static renderNavbar(activeTab = 'jobs', hideActionBtn = false) {
    return `
      <!-- FLOATING PILL TOP NAVIGATION BAR -->
      <header class="top-nav">
        <div class="nav-wrapper">
          <a href="/" class="nav-logo" title="Alumly — Alumni & Career Network">
            <span class="nav-logo-icon" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="navAlumlyGradJobs" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#FF9A76"/>
                    <stop offset="100%" stop-color="#FF528B"/>
                  </linearGradient>
                </defs>
                <!-- Bold Sans-Serif Capital Letter 'A' -->
                <path d="M8.5 26L14.2 11.5H17.8L23.5 26H20.2L18.6 21.5H13.4L11.8 26H8.5ZM14.3 18.5H17.7L16 13.8L14.3 18.5Z" fill="#FFFFFF"/>
                <!-- Graduation Cap (Mortarboard & Tassel) Tilted -13deg -->
                <g transform="rotate(-13 16 8.5)">
                  <!-- Cap Under-Bevel / 3D Rim Layer -->
                  <polygon points="16,13 25.5,8.5 24.5,9.6 16,14.1 7.5,9.6 6.5,8.5" fill="#D93B68"/>
                  <!-- Mortarboard Diamond Top in Radiant Peach-to-Pink Gradient -->
                  <polygon points="16,4 25.5,8.5 16,13 6.5,8.5" fill="url(#navAlumlyGradJobs)"/>
                  <!-- Center Button Rivet -->
                  <circle cx="16" cy="8.5" r="1.1" fill="#FFFFFF"/>
                  <!-- Dangling Tassel Cord -->
                  <path d="M16 8.5 C 11.5 8.5 7.8 9.2 7.2 11.2 C 6.8 12.8 7 14.8 7 16.5" stroke="#FF8FB3" stroke-width="1.2" fill="none" stroke-linecap="round"/>
                  <!-- Tassel Brush Accent -->
                  <rect x="5.8" y="16.5" width="2.4" height="3.2" rx="1.2" fill="#FF528B"/>
                </g>
              </svg>
            </span>
            <span class="nav-brand-text">Alumly</span>
          </a>

          <!-- Floating iOS-Style Pill Navigation -->
          <nav class="nav-pill-menu">
            <ul class="nav-links">
              <li><a href="/users" class="nav-link ${activeTab === 'users' ? 'active' : ''}">Alumni Directory</a></li>
              <li><a href="/jobs" class="nav-link ${activeTab === 'jobs' ? 'active' : ''}" style="${activeTab === 'jobs' ? 'color: var(--color-ink-black); font-weight: 700;' : ''}">Job Board</a></li>
              <li><a href="/applications" class="nav-link ${activeTab === 'applications' ? 'active' : ''}">Applications</a></li>
              <li><a href="/announcements" class="nav-link ${activeTab === 'announcements' ? 'active' : ''}">Announcements</a></li>
              ${renderAdminNavItem(activeTab)}
              <li><a href="/api/swagger" target="_blank" class="nav-link">API Docs</a></li>
            </ul>
          </nav>

          <!-- Right-Aligned Action CTA Button / Logged-In User Pill -->
          <div class="nav-actions">
            ${renderUserSessionControls(hideActionBtn ? '' : '<a href="/jobs/new" class="btn btn-primary btn-sm">+ Post Job</a>')}
          </div>
        </div>
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
      return `<div class="alert alert-success">🗑️ Job posting was deleted successfully.</div>`;
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
          <div class="job-glass-card">
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
              <div style="font-size: 0.85rem; color: #6d6c6b;">
                Published: ${job.createdAt ? new Date(job.createdAt).toLocaleDateString() : 'Recently'}
              </div>
              <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
                <a href="/jobs/${job.id}" class="btn btn-primary btn-sm">View & Apply →</a>
                <a href="/jobs/${job.id}/edit" class="btn-glass-pill btn-edit">Edit</a>
                <form action="/jobs/${job.id}/delete" method="POST" style="display:inline; margin: 0;" onsubmit="return confirm('Are you sure you want to delete this job posting?');">
                  <button type="submit" class="btn-glass-pill btn-delete">Delete</button>
                </form>
              </div>
            </div>
          </div>
        `).join('')
      : `
        <div class="job-glass-card" style="text-align: center; padding: 40px 20px;">
          <div style="font-size: 2.5rem; margin-bottom: 12px;">💼</div>
          <h3 style="font-family: var(--font-serif); font-size: 1.4rem; color: #16191c; margin: 0 0 8px 0;">No Job Postings Found</h3>
          <p style="color: #4a4a4c; max-width: 480px; margin: 0 auto 16px auto;">No job opportunities match your current filter criteria. Try clearing filters or create a new posting below.</p>
          <a href="/jobs" class="btn-glass-pill btn-view">Reset Filter</a>
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
        ${getHeadTags('Career Opportunities | Alumly')}
      </head>
      <body>
        ${this.renderNavbar('jobs')}

        <div class="container" style="max-width: 1100px; padding-top: 24px; padding-bottom: 64px;">
          <div style="margin-bottom: 28px;">
            <span class="badge" style="background: rgba(255, 255, 255, 0.6); backdrop-filter: blur(8px); border: 1px solid rgba(255, 255, 255, 0.8); color: #16191c; margin-bottom: 8px;">● CAREER NETWORK</span>
            <h1 style="font-family: var(--font-serif); font-size: 2.25rem; font-weight: 600; color: #16191c; margin: 4px 0 6px 0; letter-spacing: -0.02em;">Career Opportunities & Job Board</h1>
            <p style="color: #4a4a4c; font-size: 0.95rem; margin: 0;">Live Opportunities &bull; ${totalJobs} Active Postings Available</p>
          </div>

          ${this.renderFlashBanner(filter)}

          <!-- Horizontal Glass Stats Grid (4-Column) -->
          <div class="job-stats-grid">
            <div class="job-stat-card">
              <div class="stat-label">Total Postings</div>
              <div class="stat-value">${totalJobs}</div>
              <div class="stat-sub">Active listings</div>
            </div>
            <div class="job-stat-card">
              <div class="stat-label">Active Opportunities</div>
              <div class="stat-value">${activeJobs}</div>
              <div class="stat-sub">Open for applications</div>
            </div>
            <div class="job-stat-card">
              <div class="stat-label">Remote Positions</div>
              <div class="stat-value">${remoteJobs}</div>
              <div class="stat-sub">Work from anywhere</div>
            </div>
            <div class="job-stat-card">
              <div class="stat-label">Applications Received</div>
              <div class="stat-value">${totalApplications}</div>
              <div class="stat-sub"><a href="/applications">View pipeline &rarr;</a></div>
            </div>
          </div>

          <!-- Modern iOS-Style Search & Filter Toolbar -->
          <form action="/jobs" method="GET" class="filter-toolbar-glass">
            <div style="flex: 2; min-width: 200px;">
              <label for="search">Search Keywords</label>
              <input type="text" id="search" name="search" class="form-control" placeholder="Title, company, skills..." value="${escapeHtml(filter.search || '')}">
            </div>
            <div style="flex: 1; min-width: 140px;">
              <label for="jobType">Job Type</label>
              <select id="jobType" name="jobType" class="form-control">
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
              <select id="status" name="status" class="form-control">
                <option value="">All Statuses</option>
                <option value="Active" ${filter.status === 'Active' ? 'selected' : ''}>Active</option>
                <option value="Closed" ${filter.status === 'Closed' ? 'selected' : ''}>Closed</option>
              </select>
            </div>
            <div style="display: flex; gap: 8px;">
              <button type="submit" class="btn btn-primary">Filter</button>
              <a href="/jobs" class="btn-glass-pill btn-view">Clear</a>
            </div>
          </form>

          <!-- Job Listings List (Frosted Glass Cards) -->
          <div style="margin-bottom: 36px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
              <h2 style="margin: 0; font-family: var(--font-serif); font-size: 1.45rem; font-weight: 600; color: #16191c;">
                📋 Verified Job Listings (${totalJobs})
              </h2>
              <span style="font-family: var(--font-mono); font-size: 0.85rem; color: #4a4a4c;">Showing filtered positions</span>
            </div>
            ${jobCardsHtml}
          </div>

          <!-- Quick Post Opportunity Form (Frosted Glass Container) -->
          <div class="glass-form-card" id="quick-post-form">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
              <div>
                <h3 style="margin: 0; font-family: var(--font-serif); font-size: 1.45rem; font-weight: 600; color: #16191c;">
                  💼 Quick Post: Share a Career Opportunity
                </h3>
                <p style="color: #4a4a4c; font-size: 0.88rem; margin: 4px 0 0 0;">
                  Alumni, recruiters, and faculty can publish new career opportunities directly to the network.
                </p>
              </div>
              <span class="badge" style="background: rgba(255, 255, 255, 0.7); color: #16191c; border: 1px solid rgba(255, 255, 255, 0.9);">● DIRECT-POST</span>
            </div>

            <form action="/jobs" method="POST">
              <div class="form-grid-2col">
                <div class="form-group">
                  <label for="q_title">Job Title *</label>
                  <input type="text" id="q_title" name="title" class="form-control" required placeholder="e.g. Senior Backend Engineer">
                </div>
                <div class="form-group">
                  <label for="q_company">Company Name *</label>
                  <input type="text" id="q_company" name="company" class="form-control" required placeholder="e.g. TechCorp Solutions">
                </div>
                <div class="form-group">
                  <label for="q_location">Location</label>
                  <input type="text" id="q_location" name="location" class="form-control" placeholder="e.g. Istanbul / Remote" value="Remote">
                </div>
                <div class="form-group">
                  <label for="q_jobType">Job Type</label>
                  <select id="q_jobType" name="jobType" class="form-control">
                    <option value="Full-Time" selected>Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="q_salaryRange">Salary Range</label>
                  <input type="text" id="q_salaryRange" name="salaryRange" class="form-control" placeholder="e.g. $85,000 - $115,000">
                </div>
                <div class="form-group">
                  <label for="q_posterId">Posted By</label>
                  <select id="q_posterId" name="posterId" class="form-control">
                    <option value="">-- Select Poster --</option>
                    ${userOptions}
                  </select>
                </div>
                <div class="form-group full" style="grid-column: 1 / -1;">
                  <label for="q_description">Job Description *</label>
                  <textarea id="q_description" name="description" class="form-control" rows="3" required placeholder="Describe role responsibilities, team overview, and impact..."></textarea>
                </div>
                <div class="form-group full" style="grid-column: 1 / -1;">
                  <label for="q_requirements">Requirements & Qualifications</label>
                  <textarea id="q_requirements" name="requirements" class="form-control" rows="2" placeholder="Core qualifications, technologies, years of experience..."></textarea>
                </div>
                <div class="form-group">
                  <label for="q_applicationUrl">External Application Link</label>
                  <input type="url" id="q_applicationUrl" name="applicationUrl" class="form-control" placeholder="https://careers.example.com/apply">
                </div>
                <div class="form-group">
                  <label for="q_contactEmail">Contact Email</label>
                  <input type="email" id="q_contactEmail" name="contactEmail" class="form-control" placeholder="recruiting@example.com">
                </div>
              </div>

              <div style="margin-top: 20px; display: flex; justify-content: flex-end; gap: 10px;">
                <button type="reset" class="btn-glass-pill btn-view">Reset Form</button>
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
                    <a href="/applications/${app.id}" class="btn-action-pill">Review →</a>
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
        ${getHeadTags(`${escapeHtml(job.title)} at ${escapeHtml(job.company)} | Alumly`)}
      </head>
      <body>
        ${this.renderNavbar('jobs', true)}

        <div class="container" style="max-width: 1100px; padding-top: 24px; padding-bottom: 64px;">
          <div style="margin-bottom: 20px;">
            <a href="/jobs" class="btn-action-pill">← Back to All Job Postings</a>
          </div>

          ${this.renderFlashBanner(query)}

          <!-- Job Overview Card -->
          <div class="card">
            <div class="card-header" style="display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; margin-bottom: 24px; flex-wrap: wrap;">
              <div>
                <span class="badge ${this.getJobTypeBadgeClass(job.jobType)}">${escapeHtml(job.jobType || 'Full-Time')}</span>
                <span class="badge ${job.status === 'Active' ? 'badge-active' : 'badge-closed'}" style="margin-left: 6px;">${escapeHtml(job.status)}</span>
                <h1 style="font-family: var(--font-serif); font-size: 2rem; font-weight: 600; margin: 10px 0 4px 0; color: #16191c; letter-spacing: -0.02em;">${escapeHtml(job.title)}</h1>
                <div style="font-size: 1.1rem; color: #4a4a4c; font-weight: 600;">🏢 ${escapeHtml(job.company)}</div>
              </div>
              <div style="display: flex; gap: 10px; align-items: center; flex-shrink: 0;">
                <a href="/jobs/${job.id}/edit" class="btn-action-pill">✏️ Edit Job</a>
                <form action="/jobs/${job.id}/delete" method="POST" onsubmit="return confirm('Are you sure you want to delete this job posting?');" style="display:inline; margin: 0;">
                  <button type="submit" class="btn-action-pill btn-delete">🗑️ Delete</button>
                </form>
              </div>
            </div>

            <!-- Job Key Attributes -->
            <div class="metrics-grid" style="margin-bottom: 24px;">
              <div class="metric-card" style="padding: 14px 18px;">
                <div class="metric-label">Location</div>
                <div style="font-size: 1.05rem; font-weight: 600; color: #16191c; margin-top: 4px;">📍 ${escapeHtml(job.location || 'Remote')}</div>
              </div>
              <div class="metric-card" style="padding: 14px 18px;">
                <div class="metric-label">Compensation</div>
                <div style="font-size: 1.05rem; font-weight: 600; color: #15803d; margin-top: 4px;">💰 ${escapeHtml(job.salaryRange || 'Competitive')}</div>
              </div>
              <div class="metric-card" style="padding: 14px 18px;">
                <div class="metric-label">Deadline</div>
                <div style="font-size: 1.05rem; font-weight: 600; color: #16191c; margin-top: 4px;">⏰ ${job.deadline ? new Date(job.deadline).toLocaleDateString() : 'Rolling'}</div>
              </div>
              <div class="metric-card" style="padding: 14px 18px;">
                <div class="metric-label">Posted By</div>
                <div style="font-size: 1.05rem; font-weight: 600; color: #16191c; margin-top: 4px;">
                  👤 ${job.poster ? `<a href="/users/${job.poster.id}" style="color: #16191c; font-weight: 600; text-decoration: underline;">${escapeHtml(job.poster.name)}</a>` : 'System Admin'}
                </div>
              </div>
            </div>

            <div style="margin-bottom: 24px;">
              <h3 style="font-family: var(--font-serif); font-size: 1.15rem; font-weight: 600; color: #16191c; margin-bottom: 8px;">Role Overview</h3>
              <div style="white-space: pre-wrap; color: #334155; line-height: 1.6; font-size: 0.95rem;">${escapeHtml(job.description)}</div>
            </div>

            ${job.requirements ? `
              <div style="margin-bottom: 24px;">
                <h3 style="font-family: var(--font-serif); font-size: 1.15rem; font-weight: 600; color: #16191c; margin-bottom: 8px;">Requirements & Qualifications</h3>
                <div style="white-space: pre-wrap; color: #334155; line-height: 1.6; font-size: 0.95rem;">${escapeHtml(job.requirements)}</div>
              </div>
            ` : ''}

            <div style="display: flex; flex-wrap: wrap; gap: 16px; padding: 16px; background: rgba(255, 255, 255, 0.4); border-radius: 16px; border: 1px solid rgba(255, 255, 255, 0.6); backdrop-filter: blur(10px);">
              ${job.applicationUrl ? `
                <div>
                  <span style="font-size: 0.8rem; color: #4a4a4c; font-weight: 600;">EXTERNAL APPLICATION:</span><br>
                  <a href="${escapeHtml(job.applicationUrl)}" target="_blank" style="color: #16191c; font-weight: 600; text-decoration: underline;">${escapeHtml(job.applicationUrl)} ↗</a>
                </div>
              ` : ''}
              ${job.contactEmail ? `
                <div>
                  <span style="font-size: 0.8rem; color: #4a4a4c; font-weight: 600;">INQUIRIES:</span><br>
                  <a href="mailto:${escapeHtml(job.contactEmail)}" style="color: #16191c; font-weight: 600; text-decoration: underline;">${escapeHtml(job.contactEmail)}</a>
                </div>
              ` : ''}
            </div>
          </div>

          <!-- Apply For This Position Section -->
          <div class="card" id="apply-form">
            <div class="card-header" style="margin-bottom: 20px;">
              <div>
                <h2 class="card-title">📝 Apply for this Position</h2>
                <p style="color: #4a4a4c; font-size: 0.9rem; margin: 4px 0 0 0;">
                  Submit candidate profile and resume to connect directly with the hiring team.
                </p>
              </div>
            </div>

            <form action="/jobs/${job.id}/apply" method="POST">
              <div class="form-grid" style="gap: 16px;">
                <div class="form-group full">
                  <label for="app_userId">Candidate Applicant *</label>
                  <select id="app_userId" name="userId" class="form-control" required>
                    <option value="">-- Choose Candidate User Profile --</option>
                    ${userOptions}
                  </select>
                  <div class="form-hint">Select the user submitting this job application.</div>
                </div>
                <div class="form-group full">
                  <label for="app_coverLetter">Cover Letter / Note to Hiring Team</label>
                  <textarea id="app_coverLetter" name="coverLetter" class="form-control" style="min-height: 110px; resize: vertical;" placeholder="Summarize your qualifications, motivation, and why you are a great match for this role..."></textarea>
                </div>
                <div class="form-group">
                  <label for="app_resumeUrl">Resume / Portfolio Link</label>
                  <input type="url" id="app_resumeUrl" name="resumeUrl" class="form-control" placeholder="https://storage.example.com/resumes/my-cv.pdf">
                  <div class="form-hint">Link to PDF resume, GitHub profile, or personal website.</div>
                </div>
                <div class="form-group">
                  <label for="app_notes">Candidate Notes</label>
                  <input type="text" id="app_notes" name="notes" class="form-control" placeholder="e.g. Available for interview next week">
                </div>
              </div>

              <div style="margin-top: 20px; display: flex; justify-content: flex-end;">
                <button type="submit" class="btn btn-primary" style="padding: 12px 28px; border-radius: 100px; font-weight: 600;">
                  🚀 Submit Job Application
                </button>
              </div>
            </form>
          </div>

          <!-- Received Applications List -->
          <div class="card">
            <div class="card-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
              <div>
                <h3 class="card-title">👥 Received Applications (${applications.length})</h3>
                <p style="color: #4a4a4c; font-size: 0.85rem; margin: 4px 0 0 0;">
                  Candidates who have submitted applications for this specific opportunity.
                </p>
              </div>
              <a href="/applications" class="btn-action-pill">All Applications Board →</a>
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
        ${getHeadTags('Create Job Posting | Alumly')}
      </head>
      <body>
        ${this.renderNavbar('jobs', true)}

        <div class="container">
          <div style="margin-bottom: 20px;">
            <a href="/jobs" class="btn-action-pill">← Back to Job Postings</a>
          </div>

          ${this.renderFlashBanner(query)}

          <div class="glass-form-card">
            <div class="card-header" style="margin-bottom: 24px;">
              <div>
                <h2 class="card-title">💼 Post a New Job Opportunity</h2>
                <p style="color: #4a4a4c; font-size: 0.9rem; margin: 4px 0 0 0;">
                  Publish a new career opportunity for alumni and students.
                </p>
              </div>
            </div>

            <form action="/jobs" method="POST">
              <div class="form-grid form-grid-2col" style="gap: 18px;">
                <div class="form-group">
                  <label for="title">Position Title *</label>
                  <input type="text" id="title" name="title" class="form-control" required placeholder="e.g. Lead Cloud Architect">
                </div>
                <div class="form-group">
                  <label for="company">Company / Organization *</label>
                  <input type="text" id="company" name="company" class="form-control" required placeholder="e.g. CloudScale Systems">
                </div>
                <div class="form-group">
                  <label for="location">Location</label>
                  <input type="text" id="location" name="location" class="form-control" value="Remote" placeholder="e.g. Istanbul / Hybrid">
                </div>
                <div class="form-group">
                  <label for="jobType">Job Type</label>
                  <select id="jobType" name="jobType" class="form-control">
                    <option value="Full-Time" selected>Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="salaryRange">Salary Range</label>
                  <input type="text" id="salaryRange" name="salaryRange" class="form-control" placeholder="e.g. $90,000 - $120,000">
                </div>
                <div class="form-group">
                  <label for="status">Publication Status</label>
                  <select id="status" name="status" class="form-control">
                    <option value="Active" selected>Active</option>
                    <option value="Draft">Draft</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="posterId">Posted By</label>
                  <select id="posterId" name="posterId" class="form-control">
                    <option value="">-- Select Poster --</option>
                    ${userOptions}
                  </select>
                </div>
                <div class="form-group">
                  <label for="deadline">Application Deadline</label>
                  <input type="date" id="deadline" name="deadline" class="form-control">
                </div>
                <div class="form-group full" style="grid-column: 1 / -1;">
                  <label for="description">Job Description *</label>
                  <textarea id="description" name="description" class="form-control" required placeholder="Comprehensive description of responsibilities, duties, and culture..."></textarea>
                </div>
                <div class="form-group full" style="grid-column: 1 / -1;">
                  <label for="requirements">Requirements & Qualifications</label>
                  <textarea id="requirements" name="requirements" class="form-control" placeholder="Key skills, educational background, and technical experience..."></textarea>
                </div>
                <div class="form-group">
                  <label for="applicationUrl">External Application Portal</label>
                  <input type="url" id="applicationUrl" name="applicationUrl" class="form-control" placeholder="https://careers.example.com/apply">
                </div>
                <div class="form-group">
                  <label for="contactEmail">Recruiter Contact Email</label>
                  <input type="email" id="contactEmail" name="contactEmail" class="form-control" placeholder="careers@example.com">
                </div>
              </div>

              <div style="margin-top: 28px; display: flex; justify-content: flex-end; gap: 12px;">
                <a href="/jobs" class="btn-action-pill">Cancel</a>
                <button type="submit" class="btn btn-primary" style="padding: 12px 24px;">🚀 Publish Opportunity</button>
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
        ${getHeadTags(`Edit ${escapeHtml(job.title)} | Alumly`)}
      </head>
      <body>
        ${this.renderNavbar('jobs', true)}

        <div class="container">
          <div style="margin-bottom: 20px;">
            <a href="/jobs/${job.id}" class="btn-action-pill">← Back to Job Detail</a>
          </div>

          ${this.renderFlashBanner(query)}

          <div class="glass-form-card">
            <div class="card-header" style="margin-bottom: 24px;">
              <div>
                <h2 class="card-title">✏️ Edit Job Posting #${job.id}</h2>
                <p style="color: #4a4a4c; font-size: 0.9rem; margin: 4px 0 0 0;">
                  Update job requirements, compensation, and publication lifecycle status.
                </p>
              </div>
            </div>

            <form action="/jobs/${job.id}/edit" method="POST">
              <div class="form-grid form-grid-2col" style="gap: 18px;">
                <div class="form-group">
                  <label for="title">Position Title *</label>
                  <input type="text" id="title" name="title" class="form-control" required value="${escapeHtml(job.title)}">
                </div>
                <div class="form-group">
                  <label for="company">Company / Organization *</label>
                  <input type="text" id="company" name="company" class="form-control" required value="${escapeHtml(job.company)}">
                </div>
                <div class="form-group">
                  <label for="location">Location</label>
                  <input type="text" id="location" name="location" class="form-control" value="${escapeHtml(job.location || '')}">
                </div>
                <div class="form-group">
                  <label for="jobType">Job Type</label>
                  <select id="jobType" name="jobType" class="form-control">
                    <option value="Full-Time" ${job.jobType === 'Full-Time' ? 'selected' : ''}>Full-Time</option>
                    <option value="Part-Time" ${job.jobType === 'Part-Time' ? 'selected' : ''}>Part-Time</option>
                    <option value="Contract" ${job.jobType === 'Contract' ? 'selected' : ''}>Contract</option>
                    <option value="Internship" ${job.jobType === 'Internship' ? 'selected' : ''}>Internship</option>
                    <option value="Remote" ${job.jobType === 'Remote' ? 'selected' : ''}>Remote</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="salaryRange">Salary Range</label>
                  <input type="text" id="salaryRange" name="salaryRange" class="form-control" value="${escapeHtml(job.salaryRange || '')}">
                </div>
                <div class="form-group">
                  <label for="status">Publication Status</label>
                  <select id="status" name="status" class="form-control">
                    <option value="Active" ${job.status === 'Active' ? 'selected' : ''}>Active</option>
                    <option value="Closed" ${job.status === 'Closed' ? 'selected' : ''}>Closed</option>
                    <option value="Draft" ${job.status === 'Draft' ? 'selected' : ''}>Draft</option>
                    <option value="Expired" ${job.status === 'Expired' ? 'selected' : ''}>Expired</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="posterId">Posted By</label>
                  <select id="posterId" name="posterId" class="form-control">
                    <option value="">-- Select Poster --</option>
                    ${userOptions}
                  </select>
                </div>
                <div class="form-group">
                  <label for="deadline">Application Deadline</label>
                  <input type="date" id="deadline" name="deadline" class="form-control" value="${formattedDeadline}">
                </div>
                <div class="form-group full" style="grid-column: 1 / -1;">
                  <label for="description">Job Description *</label>
                  <textarea id="description" name="description" class="form-control" required>${escapeHtml(job.description)}</textarea>
                </div>
                <div class="form-group full" style="grid-column: 1 / -1;">
                  <label for="requirements">Requirements & Qualifications</label>
                  <textarea id="requirements" name="requirements" class="form-control">${escapeHtml(job.requirements || '')}</textarea>
                </div>
                <div class="form-group">
                  <label for="applicationUrl">External Application Portal</label>
                  <input type="url" id="applicationUrl" name="applicationUrl" class="form-control" value="${escapeHtml(job.applicationUrl || '')}">
                </div>
                <div class="form-group">
                  <label for="contactEmail">Recruiter Contact Email</label>
                  <input type="email" id="contactEmail" name="contactEmail" class="form-control" value="${escapeHtml(job.contactEmail || '')}">
                </div>
              </div>

              <div style="margin-top: 28px; display: flex; justify-content: flex-end; gap: 12px;">
                <a href="/jobs/${job.id}" class="btn-action-pill">Cancel</a>
                <button type="submit" class="btn btn-primary" style="padding: 12px 24px;">💾 Save Modifications</button>
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
        ${getHeadTags('Error | Alumly')}
      </head>
      <body>
        ${this.renderNavbar('jobs', true)}

        <div class="container" style="max-width: 600px; padding-top: 40px; padding-bottom: 64px;">
          <div class="glass-form-card" style="text-align: center; padding: 40px 28px;">
            <div style="font-size: 3rem; margin-bottom: 12px;">⚠️</div>
            <h1 style="font-family: var(--font-serif); font-size: 1.75rem; color: #b91c1c; margin: 0 0 12px 0;">Operation Encountered An Error</h1>
            <p style="color: #4a4a4c; max-width: 500px; margin: 0 auto 24px auto; line-height: 1.5;">${escapeHtml(message)}</p>
            <a href="${backUrl}" class="btn btn-primary">&larr; Return Back</a>
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
