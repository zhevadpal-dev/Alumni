/**
 * HTML Views (Presentation Layer)
 * 
 * Generates server-rendered, responsive HTML view templates for web browser clients.
 * Canonical design.md Implementation:
 * - Dual Typography: Source Serif 4 (Headings) + Inter (UI) + JetBrains Mono (Eyebrows)
 * - Zero Drop-Shadows (Flat Hairline Architecture)
 * - Primary Button: Deep Teal (#1c5d5f) with Pill Shape (48px radius)
 * - Cards: 1px Fog Border (#d1d4d9)
 * - Pastel Domain Taxonomy (Soft Violet for Alumni, Mint Green for Jobs, Canary Yellow for ATS, Petal Pink for Events)
 */

const { getGlobalStyles, getHeadTags } = require('./styles');

class HtmlViews {
  /**
   * Home page workbench view (Temporary Bench Design & Operation Center)
   * @param {Object} [stats={}]
   * @returns {string} HTML markup
   */
  static renderHome(stats = {}) {
    const userCount = stats.users !== undefined ? stats.users : 10;
    const jobCount = stats.jobs !== undefined ? stats.jobs : 26;
    const appCount = stats.applications !== undefined ? stats.applications : 14;
    const annCount = stats.announcements !== undefined ? stats.announcements : 8;

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Alumni Tracking System — Modern Higher Ed Platform</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;0,8..60,700;1,8..60,400&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/css/style.css">
</head>
<body>

  <!-- 1. FLOATING PILL TOP NAVIGATION BAR (STICKY HOMEBAR) -->
  <header class="top-nav">
    <div class="nav-wrapper">
      <a href="/" class="nav-logo" title="Alumni Tracking System">
        <span class="nav-logo-icon">🎓</span>
        <span class="nav-brand-text">ATS</span>
      </a>

      <!-- Floating iOS-Style Pill Navigation -->
      <nav class="nav-pill-menu">
        <ul class="nav-links">
          <li><a href="#directory" class="nav-link">Alumni Directory</a></li>
          <li><a href="#jobs" class="nav-link">Job Board</a></li>
          <li><a href="#applications" class="nav-link">Applications (ATS)</a></li>
          <li><a href="#pillars" class="nav-link">Platform</a></li>
          <li><a href="/api/swagger" target="_blank" class="nav-link">API Docs</a></li>
        </ul>
      </nav>

      <!-- Right-Aligned Action CTA Buttons -->
      <div class="nav-actions">
        <a href="/users" class="btn btn-ghost btn-sm">Sign In</a>
        <a href="#jobs" class="btn btn-primary btn-sm">Explore Careers →</a>
      </div>
    </div>
  </header>

  <!-- 2. HERO SECTION -->
  <section class="hero-section">
    <div class="container hero-content">
      <div class="hero-pill-badge">
        <span class="dot"></span>
        <span>ALUMNI PLATFORM 2.0 • POSTGRESQL 15 PERSISTED</span>
      </div>

      <h1 class="hero-headline">
        The Modern Network for <strong>Higher Education Alumni</strong>
      </h1>

      <p class="hero-subtext">
        Connect graduates with premier career opportunities, track application lifecycles, and empower academic institutions with an editorial, high-performance database.
      </p>

      <div class="hero-actions">
        <a href="/users" class="btn btn-primary">Get Started ➔</a>
        <a href="#jobs" class="btn btn-secondary">Explore Job Board</a>
      </div>

      <div class="hero-meta">
        <div class="hero-meta-item">
          <span>🐘</span>
          <span>PostgreSQL 15 ACID Storage</span>
        </div>
        <span>•</span>
        <div class="hero-meta-item">
          <span>💼</span>
          <span>Many-to-Many ATS Routing</span>
        </div>
        <span>•</span>
        <div class="hero-meta-item">
          <span>🛡️</span>
          <span>404 & 5xx Guardians Active</span>
        </div>
      </div>
    </div>
  </section>

  <!-- 3. FEATURE SECTION: CATEGORY-CODED PASTEL PILLARS -->
  <section class="section" id="pillars">
    <div class="container">
      <div class="section-header text-center">
        <span class="eyebrow">Category-Coded Pillars</span>
        <h2 class="section-title">An Integrated Suite for Academic Communities</h2>
        <p class="section-desc" style="margin: 0 auto;">
          Each core service operates in a color-coded domain designed for clarity, data integrity, and fast interactions.
        </p>
      </div>

      <div class="pillars-grid">
        <div class="pillar-card bg-violet">
          <div>
            <div class="pillar-tag">● Alumni Directory</div>
            <h3 class="pillar-title">Global Alumni Network</h3>
            <p class="pillar-desc">
              Comprehensive graduate dossiers detailing faculties, graduation classes, current companies, and research credentials (${userCount} registered).
            </p>
          </div>
          <a href="/users" class="btn btn-primary btn-sm">Browse Members →</a>
        </div>

        <div class="pillar-card bg-mint">
          <div>
            <div class="pillar-tag">● Career Opportunities</div>
            <h3 class="pillar-title">Verified Job Board</h3>
            <p class="pillar-desc">
              Exclusive employment, internship, and research positions curated by corporate partners and distinguished alumni (${jobCount} active).
            </p>
          </div>
          <a href="/jobs" class="btn btn-primary btn-sm">View Postings →</a>
        </div>

        <div class="pillar-card bg-canary">
          <div>
            <div class="pillar-tag">● Applicant Tracking</div>
            <h3 class="pillar-title">ATS Pipeline & Review</h3>
            <p class="pillar-desc">
              Structured stages from Submission to Technical Interview and Acceptance with attached resumes and reviewer notes (${appCount} candidates).
            </p>
          </div>
          <a href="/applications" class="btn btn-primary btn-sm">Open ATS Board →</a>
        </div>

        <div class="pillar-card bg-pink">
          <div>
            <div class="pillar-tag">● Campus & Events</div>
            <h3 class="pillar-title">University Bulletins</h3>
            <p class="pillar-desc">
              Academic conferences, career fairs, mentorship reunions, and urgent notifications delivered across faculties (${annCount} bulletins).
            </p>
          </div>
          <a href="/announcements" class="btn btn-primary btn-sm">Read Bulletins →</a>
        </div>
      </div>
    </div>
  </section>

  <!-- 4. FEATURE SECTION: ALUMNI DIRECTORY SHOWCASE -->
  <section class="section" id="directory">
    <div class="container">
      <div class="section-header" style="display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 20px;">
        <div>
          <span class="eyebrow">Directory Showcase</span>
          <h2 class="section-title">Distinguished Alumni & Members</h2>
          <p class="section-desc">
            Explore active alumni profiles, academic departments, and current professional affiliations.
          </p>
        </div>
        <div>
          <a href="/users" class="btn btn-secondary">All Members Directory ➔</a>
        </div>
      </div>

      <div class="alumni-grid">
        <div class="alumni-card">
          <div>
            <div class="alumni-card-header">
              <div class="alumni-avatar">CD</div>
              <span class="badge">Alumni</span>
            </div>
            <h3 class="alumni-name">Canan Dağdeviren</h3>
            <p class="alumni-role">Associate Professor & Scientist</p>
            <div class="alumni-meta-list">
              <div class="alumni-meta-row">
                <span>Department:</span>
                <span>Physics & Materials Science</span>
              </div>
              <div class="alumni-meta-row">
                <span>Class of:</span>
                <span>2009</span>
              </div>
              <div class="alumni-meta-row">
                <span>Institution:</span>
                <span>MIT Media Lab</span>
              </div>
            </div>
          </div>
          <a href="/users/1" class="btn btn-secondary btn-sm" style="width: 100%;">View Dossier</a>
        </div>

        <div class="alumni-card">
          <div>
            <div class="alumni-card-header">
              <div class="alumni-avatar" style="background: var(--pastel-mint); color: #064e3b;">AS</div>
              <span class="badge">Alumni</span>
            </div>
            <h3 class="alumni-name">Dr. Aziz Sancar</h3>
            <p class="alumni-role">Biochemist & Nobel Laureate</p>
            <div class="alumni-meta-list">
              <div class="alumni-meta-row">
                <span>Department:</span>
                <span>Biochemistry & Biophysics</span>
              </div>
              <div class="alumni-meta-row">
                <span>Class of:</span>
                <span>1969</span>
              </div>
              <div class="alumni-meta-row">
                <span>Institution:</span>
                <span>UNC School of Medicine</span>
              </div>
            </div>
          </div>
          <a href="/users/2" class="btn btn-secondary btn-sm" style="width: 100%;">View Dossier</a>
        </div>

        <div class="alumni-card">
          <div>
            <div class="alumni-card-header">
              <div class="alumni-avatar" style="background: var(--pastel-canary); color: #713f12;">MY</div>
              <span class="badge">Faculty</span>
            </div>
            <h3 class="alumni-name">Mehmet Yılmaz</h3>
            <p class="alumni-role">Staff Infrastructure Engineer</p>
            <div class="alumni-meta-list">
              <div class="alumni-meta-row">
                <span>Department:</span>
                <span>Computer Engineering</span>
              </div>
              <div class="alumni-meta-row">
                <span>Class of:</span>
                <span>2016</span>
              </div>
              <div class="alumni-meta-row">
                <span>Company:</span>
                <span>CloudScale Systems</span>
              </div>
            </div>
          </div>
          <a href="/users/3" class="btn btn-secondary btn-sm" style="width: 100%;">View Dossier</a>
        </div>

        <div class="alumni-card">
          <div>
            <div class="alumni-card-header">
              <div class="alumni-avatar" style="background: var(--pastel-pink); color: #881337;">EK</div>
              <span class="badge">Student</span>
            </div>
            <h3 class="alumni-name">Elif Kaya</h3>
            <p class="alumni-role">Senior Graduate Researcher</p>
            <div class="alumni-meta-list">
              <div class="alumni-meta-row">
                <span>Department:</span>
                <span>Artificial Intelligence</span>
              </div>
              <div class="alumni-meta-row">
                <span>Class of:</span>
                <span>2024</span>
              </div>
              <div class="alumni-meta-row">
                <span>Laboratory:</span>
                <span>Robotics Research Lab</span>
              </div>
            </div>
          </div>
          <a href="/users/4" class="btn btn-secondary btn-sm" style="width: 100%;">View Dossier</a>
        </div>
      </div>
    </div>
  </section>

  <!-- 5. FEATURE SECTION: JOB POSTINGS SHOWCASE -->
  <section class="section" id="jobs">
    <div class="container">
      <div class="section-header" style="display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 20px;">
        <div>
          <span class="eyebrow">Career Opportunities</span>
          <h2 class="section-title">Open Positions for Alumni & Graduates</h2>
          <p class="section-desc">
            Verified opportunities posted by alumni founders, faculty labs, and enterprise hiring partners.
          </p>
        </div>
        <div style="display: flex; gap: 10px;">
          <a href="/jobs/new" class="btn btn-primary">+ Post Opportunity</a>
          <a href="/jobs" class="btn btn-secondary">Browse All Jobs</a>
        </div>
      </div>

      <div class="jobs-list">
        <div class="job-card">
          <div class="job-info">
            <div class="job-tag-group">
              <span class="job-tag tag-mint">Full-Time</span>
              <span class="job-tag tag-canary">Remote</span>
              <span class="job-tag tag-violet">Active</span>
            </div>
            <h3 class="job-title">Staff Cloud Infrastructure Engineer</h3>
            <div class="job-company">
              <span>🏢 CloudScale Systems</span>
              <span>•</span>
              <span>📍 Istanbul, TR / Remote</span>
              <span>•</span>
              <span>💰 $110,000 - $140,000</span>
            </div>
          </div>
          <div>
            <a href="/jobs/1" class="btn btn-primary btn-sm">View & Apply →</a>
          </div>
        </div>

        <div class="job-card">
          <div class="job-info">
            <div class="job-tag-group">
              <span class="job-tag tag-mint">Full-Time</span>
              <span class="job-tag tag-canary">Hybrid</span>
              <span class="job-tag tag-violet">Active</span>
            </div>
            <h3 class="job-title">Lead Machine Learning Scientist</h3>
            <div class="job-company">
              <span>🏢 NeuroTech BioLab</span>
              <span>•</span>
              <span>📍 Boston, MA / Hybrid</span>
              <span>•</span>
              <span>💰 $140,000 - $175,000</span>
            </div>
          </div>
          <div>
            <a href="/jobs/2" class="btn btn-primary btn-sm">View & Apply →</a>
          </div>
        </div>

        <div class="job-card">
          <div class="job-info">
            <div class="job-tag-group">
              <span class="job-tag tag-canary">Internship</span>
              <span class="job-tag tag-mint">Summer 2026</span>
              <span class="job-tag tag-violet">Active</span>
            </div>
            <h3 class="job-title">Distributed Systems Software Engineering Intern</h3>
            <div class="job-company">
              <span>🏢 DataVortex Corp</span>
              <span>•</span>
              <span>📍 Remote / EU</span>
              <span>•</span>
              <span>💰 $45 / hour + Housing Stipend</span>
            </div>
          </div>
          <div>
            <a href="/jobs/3" class="btn btn-primary btn-sm">View & Apply →</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 6. ATS PIPELINE OVERVIEW -->
  <section class="section" id="applications">
    <div class="container">
      <div class="section-header text-center">
        <span class="eyebrow">Enterprise Telemetry</span>
        <h2 class="section-title">High-Performance Relational Architecture</h2>
        <p class="section-desc" style="margin: 0 auto;">
          Built on PostgreSQL 15, containerized with Docker, and backed by RESTful OpenAPI 3.0 documentation.
        </p>
      </div>

      <div style="background: rgba(255, 255, 255, 0.85); border: 1px solid var(--color-fog-border); border-radius: var(--radius-card); padding: 40px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 24px;">
        <div style="max-width: 600px;">
          <h3 style="font-family: var(--font-serif); font-size: 1.5rem; color: var(--color-ink-black); margin-bottom: 8px;">Many-to-Many Candidate Routing</h3>
          <p style="color: var(--color-slate-body); font-size: 0.95rem; line-height: 1.6;">
            Candidates connect directly to verified opportunities. Each application record enforces unique candidate-to-job pairing with structured review stages from Under Review to Interview and Final Acceptance.
          </p>
        </div>
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <a href="/applications" class="btn btn-primary">Open ATS Kanban →</a>
          <a href="/api/applications" target="_blank" class="btn btn-secondary">Raw JSON API</a>
        </div>
      </div>
    </div>
  </section>

  <!-- 7. FOOTER -->
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <h4>🎓 Alumni Tracking System</h4>
          <p>
            The editorial-grade career platform and relational directory for academic institutions and their global alumni network.
          </p>
        </div>

        <div class="footer-col">
          <h5>Platform</h5>
          <ul>
            <li><a href="#directory">Alumni Directory</a></li>
            <li><a href="#jobs">Job Board</a></li>
            <li><a href="#applications">Applications ATS</a></li>
            <li><a href="/announcements">Campus Bulletins</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h5>Developer</h5>
          <ul>
            <li><a href="/api/swagger" target="_blank">Swagger Documentation</a></li>
            <li><a href="/api/swagger.json" target="_blank">OpenAPI 3.0 JSON</a></li>
            <li><a href="/api/health" target="_blank">Health & Telemetry</a></li>
            <li><a href="/sayfa-bulunamadi">404 Guardian Test</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h5>Architecture</h5>
          <ul>
            <li><a href="/about">System About</a></li>
            <li><a href="https://nodejs.org" target="_blank">Node.js 20 LTS</a></li>
            <li><a href="https://www.postgresql.org" target="_blank">PostgreSQL 15</a></li>
            <li><a href="https://www.docker.com" target="_blank">Docker Container</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <span>&copy; 2026 Alumni Tracking System. All rights reserved.</span>
        <span>Seamless Gradient Architecture • 100% Flat Hairline Design</span>
      </div>
    </div>
  </footer>

</body>
</html>`;
  }

  /**
   * About page view
   * @returns {string} HTML markup
   */
  static renderAbout() {
    return `<!DOCTYPE html>
<html lang="tr">
<head>
  ${getHeadTags('Hakkında | Alumni Tracking System')}
</head>
<body>
  <div class="container">
    <header class="header">
      <div class="brand">
        <span class="brand-icon">🎓</span>
        <div>
          <h1 class="title">Alumni Tracking System</h1>
          <div class="subtitle">Hakkında & Mimari Bilgiler</div>
        </div>
      </div>
      <nav class="nav-links">
        <a href="/">🏠 Ana Sayfa</a>
        <a href="/jobs">💼 İş İlanları</a>
        <a href="/applications">📝 Başvurular</a>
        <a href="/users">👥 Mezunlar</a>
        <a href="/announcements">📢 Duyurular</a>
      </nav>
    </header>

    <div class="card">
      <h2 style="font-size:1.6rem;font-weight:400;margin-bottom:12px;color:var(--color-ink);">Sistem Hakkında</h2>
      <p style="color:var(--color-ash);margin-bottom:16px;">
        <strong>Alumni Tracking System</strong>, üniversiteler ve yükseköğretim kurumları için geliştirilmiş modern, ölçeklenebilir ve konteynerize edilmiş bir mezun takip ve kariyer yönetim platformudur.
      </p>
      <p style="color:var(--color-ash);margin-bottom:20px;">
        Mezunların kariyer basamaklarını izleme, iş ve staj ilanları yayınlama, aday başvurularını yönetme ve kurumsal iletişim duyurularını tek bir çatı altında toplar.
      </p>

      <h3 style="font-size:1.15rem;font-weight:600;margin-bottom:8px;color:var(--color-ink);">Teknoloji Yığını (Tech Stack)</h3>
      <ul style="color:var(--color-ash);margin-bottom:24px;padding-left:20px;">
        <li><strong>Backend:</strong> Node.js 20 LTS & Express.js (MVC Mimarisi)</li>
        <li><strong>Veritabanı:</strong> PostgreSQL 15 Relational Database (Docker Compose)</li>
        <li><strong>Dokümantasyon:</strong> OpenAPI 3.0 & Swagger UI</li>
        <li><strong>Güvenlik & Hata Yönetimi:</strong> 404 Route Guardian, 5xx Global Error Handler, File Logging (logs/error.logs)</li>
        <li><strong>Tasarım Sistemi:</strong> design.md (Dual Typography, 1px Fog Kenarlık, Deep Teal Pill Butonlar)</li>
      </ul>

      <div style="display:flex;gap:12px;flex-wrap:wrap;">
        <a href="/" class="btn btn-primary">Çalışma Masasına Dön (Workbench)</a>
        <a href="/api/swagger" class="btn btn-secondary">API Swagger Dokümantasyonu</a>
      </div>
    </div>
  </div>
</body>
</html>`;
  }

  /**
   * Shared CSS styling across all view templates
   */
  static getBaseStyles() {
    return getGlobalStyles();
  }

  /**
   * Render dismissible flash message banner
   * @param {Object} [query={}]
   * @returns {string} HTML markup
   */
  static renderFlashBanner(query = {}) {
    if (!query || (!query.msg && !query.success && !query.error)) return '';
    const isError = Boolean(query.error) || query.type === 'error';
    const bgColor = isError ? '#fef2f2' : '#f0fdf4';
    const borderColor = isError ? '#fecaca' : '#bbf7d0';
    const textColor = isError ? '#991b1b' : '#166534';
    const icon = isError ? '⚠️' : '✅';
    const msg = query.msg || (query.success ? `Operation successful: ${query.success}` : query.error);

    return `
      <div style="background: ${bgColor}; border: 1px solid ${borderColor}; color: ${textColor}; padding: 16px 24px; border-radius: 12px; margin-bottom: 24px; font-weight: 500; display: flex; align-items: center; justify-content: space-between; box-shadow: none !important;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="font-size: 1.25rem;">${icon}</span>
          <span>${msg}</span>
        </div>
        <button type="button" onclick="this.parentElement.remove();" style="background: transparent; border: none; color: ${textColor}; font-size: 1.3rem; line-height: 1; cursor: pointer; padding: 0 4px;" title="Dismiss">&times;</button>
      </div>
    `;
  }

  // ==========================================
  // READ (R) - LIST VIEW WITH CREATE FORM
  // ==========================================

  /**
   * Render HTML view for GET /users
   * 
   * @param {Array<Object>} users
   * @param {Object} [query={}]
   * @returns {string} HTML markup
   */
  static renderUsersList(users = [], query = {}) {
    const flashBanner = this.renderFlashBanner(query);
    const userCards = users.map(u => `
      <div class="user-glass-card">
        <div style="flex: 1; min-width: 250px;">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px; flex-wrap: wrap;">
            <h3 class="user-title">${u.name}</h3>
            <span class="badge ${u.role || 'alumni'}" style="background: rgba(255, 255, 255, 0.7); color: #16191c; border: 1px solid rgba(255, 255, 255, 0.9); font-size: 0.75rem;">${u.role || 'alumni'}</span>
            <span style="font-family: var(--font-mono); font-size: 0.75rem; color: #6d6c6b;">#${u.id}</span>
          </div>
          <p class="user-meta"><strong>Email:</strong> ${u.email}</p>
          ${u.department ? `<p class="user-subtext"><strong>Department:</strong> ${u.department} ${u.graduationYear ? `(Class of ${u.graduationYear})` : ''}</p>` : ''}
          ${u.company ? `<p class="user-subtext"><strong>Company:</strong> ${u.company} ${u.jobTitle ? `&bull; ${u.jobTitle}` : ''}</p>` : ''}
        </div>
        <div class="action-group" style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
          <a href="/users/${u.id}" class="btn-glass-pill btn-view">🔍 View</a>
          <a href="/users/${u.id}/edit" class="btn-glass-pill btn-edit">✏️ Edit</a>
          <form action="/users/${u.id}/delete" method="POST" style="margin: 0;" onsubmit="return confirm('Are you sure you want to delete user ${u.name}?');">
            <button type="submit" class="btn-glass-pill btn-delete">🗑️ Delete</button>
          </form>
        </div>
      </div>
    `).join('');

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        ${getHeadTags('Alumni Directory | Alumni Tracking System')}
      </head>
      <body>
        <!-- 1. FLOATING PILL TOP NAVIGATION BAR -->
        <header class="top-nav">
          <div class="nav-wrapper">
            <a href="/" class="nav-logo" title="Alumni Tracking System">
              <span class="nav-logo-icon">🎓</span>
              <span class="nav-brand-text">ATS</span>
            </a>

            <!-- Floating iOS-Style Pill Navigation -->
            <nav class="nav-pill-menu">
              <ul class="nav-links">
                <li><a href="/" class="nav-link">Home</a></li>
                <li><a href="/users" class="nav-link active" style="color: var(--color-ink-black); font-weight: 700;">Alumni Directory</a></li>
                <li><a href="/jobs" class="nav-link">Job Board</a></li>
                <li><a href="/applications" class="nav-link">Applications (ATS)</a></li>
                <li><a href="/announcements" class="nav-link">Announcements</a></li>
                <li><a href="/api/swagger" target="_blank" class="nav-link">API Docs</a></li>
              </ul>
            </nav>

            <!-- Right-Aligned Action CTA Buttons -->
            <div class="nav-actions">
              <a href="#create-user-form" class="btn btn-primary btn-sm">+ New Member</a>
            </div>
          </div>
        </header>

        <div class="container" style="max-width: 1100px; padding-top: 24px; padding-bottom: 64px;">
          <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 28px; flex-wrap: wrap; gap: 16px;">
            <div>
              <span class="badge" style="background: rgba(255, 255, 255, 0.6); backdrop-filter: blur(8px); border: 1px solid rgba(255, 255, 255, 0.8); color: #16191c; margin-bottom: 8px;">● ALUMNI DATABASE</span>
              <h1 style="font-family: var(--font-serif); font-size: 2.25rem; font-weight: 600; color: #16191c; margin: 4px 0 6px 0; letter-spacing: -0.02em;">Alumni Directory & User Management</h1>
              <p style="color: #4a4a4c; font-size: 0.95rem; margin: 0;">PostgreSQL ACID Persisted &bull; ${users.length} Active Records</p>
            </div>
            <a href="#create-user-form" class="btn btn-primary btn-sm">+ Register User</a>
          </div>

          ${flashBanner}

          <!-- CREATE SECTION: POST /users Form (Frosted Glass Container) -->
          <div class="glass-form-card" id="create-user-form">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
              <h2 style="margin: 0; font-family: var(--font-serif); font-size: 1.45rem; font-weight: 600; color: #16191c;">
                ➕ Create New User (POST /users)
              </h2>
              <span class="badge" style="background: rgba(255, 255, 255, 0.7); color: #16191c; border: 1px solid rgba(255, 255, 255, 0.9);">● ALUMNI-REGISTER</span>
            </div>
            <form action="/users" method="POST">
              <div class="form-grid-2col">
                <div class="form-group">
                  <label for="name">Full Name *</label>
                  <input type="text" id="name" name="name" class="form-control" placeholder="e.g. Canan Dağdeviren" required />
                </div>
                <div class="form-group">
                  <label for="email">Email Address *</label>
                  <input type="email" id="email" name="email" class="form-control" placeholder="e.g. canan@example.com" required />
                </div>
                <div class="form-group">
                  <label for="role">Role</label>
                  <select id="role" name="role" class="form-control">
                    <option value="alumni" selected>Alumni</option>
                    <option value="student">Student</option>
                    <option value="faculty">Faculty</option>
                    <option value="teacher">Teacher</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="department">Department</label>
                  <input type="text" id="department" name="department" class="form-control" placeholder="e.g. Physics & Materials Science" />
                </div>
                <div class="form-group">
                  <label for="graduationYear">Graduation Year</label>
                  <input type="number" id="graduationYear" name="graduationYear" class="form-control" placeholder="e.g. 2024" min="1900" max="2100" />
                </div>
                <div class="form-group">
                  <label for="phone">Phone Number</label>
                  <input type="tel" id="phone" name="phone" class="form-control" placeholder="e.g. +90 555 123 4567" />
                </div>
                <div class="form-group">
                  <label for="company">Company / Institution</label>
                  <input type="text" id="company" name="company" class="form-control" placeholder="e.g. MIT Media Lab" />
                </div>
                <div class="form-group">
                  <label for="jobTitle">Job Title</label>
                  <input type="text" id="jobTitle" name="jobTitle" class="form-control" placeholder="e.g. Associate Professor" />
                </div>
              </div>
              <div style="display: flex; justify-content: flex-end;">
                <button type="submit" class="btn btn-primary">➕ Create User Record</button>
              </div>
            </form>
          </div>

          <!-- READ SECTION: Current Users Directory (Frosted Glass Profile Cards) -->
          <div style="margin-top: 36px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
              <h2 style="margin: 0; font-family: var(--font-serif); font-size: 1.45rem; font-weight: 600; color: #16191c;">
                📋 Registered Alumni & Members (${users.length})
              </h2>
              <span style="font-family: var(--font-mono); font-size: 0.85rem; color: #4a4a4c;">${users.length} Active Records</span>
            </div>
            ${users.length > 0 ? userCards : '<div class="user-glass-card"><p style="color: #4a4a4c; margin: 0;">No alumni records found. Use the form above to register the first member.</p></div>'}
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // ==========================================
  // READ (R) - SINGLE USER PROFILE VIEW
  // ==========================================

  /**
   * Render HTML view for GET /users/:id
   * 
   * @param {Object} user
   * @param {Object} [query={}]
   * @returns {string} HTML markup
   */
  static renderUserProfile(user, query = {}) {
    const flashBanner = this.renderFlashBanner(query);
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        ${getHeadTags(`${user.name} - Profile | Alumni Tracking System`)}
      </head>
      <body>
        <header class="top-nav">
          <div class="nav-wrapper">
            <a href="/" class="nav-logo" title="Alumni Tracking System">
              <span class="nav-logo-icon">🎓</span>
              <span class="nav-brand-text">ATS</span>
            </a>
            <nav class="nav-pill-menu">
              <ul class="nav-links">
                <li><a href="/" class="nav-link">Home</a></li>
                <li><a href="/users" class="nav-link active" style="font-weight: 700;">Alumni Directory</a></li>
                <li><a href="/jobs" class="nav-link">Job Board</a></li>
                <li><a href="/applications" class="nav-link">Applications (ATS)</a></li>
                <li><a href="/announcements" class="nav-link">Announcements</a></li>
              </ul>
            </nav>
            <div class="nav-actions">
              <a href="/users" class="btn btn-secondary btn-sm">&larr; Directory</a>
            </div>
          </div>
        </header>

        <div class="container" style="max-width: 720px; padding-top: 32px; padding-bottom: 64px;">
          ${flashBanner}
          <div class="glass-form-card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 12px;">
              <a href="/users" class="btn-glass-pill btn-view">&larr; Back to Directory</a>
              <div class="action-group" style="display: flex; gap: 8px;">
                <a href="/users/${user.id}/edit" class="btn-glass-pill btn-edit">✏️ Edit Profile</a>
                <form action="/users/${user.id}/delete" method="POST" style="margin: 0;" onsubmit="return confirm('Are you sure you want to delete ${user.name}?');">
                  <button type="submit" class="btn-glass-pill btn-delete">🗑️ Delete</button>
                </form>
              </div>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 12px;">
              <div>
                <h1 style="margin: 0; font-family: var(--font-serif); font-size: 2rem; color: #16191c;">${user.name}</h1>
                <p style="margin: 4px 0 0 0; color: #4a4a4c; font-size: 0.9rem;">Member ID: <span style="font-family: var(--font-mono); color: #16191c; font-weight: 600;">#${user.id}</span></p>
              </div>
              <span class="badge ${user.role || 'alumni'}" style="background: rgba(255, 255, 255, 0.7); color: #16191c; border: 1px solid rgba(255, 255, 255, 0.9);">${user.role || 'alumni'}</span>
            </div>
            
            <div style="border-top: 1px solid rgba(255, 255, 255, 0.6); margin-top: 20px; padding-top: 16px;">
              <div style="display: flex; padding: 12px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.4);">
                <span style="width: 140px; color: #6d6c6b; font-weight: 600; font-size: 0.9rem;">Email:</span>
                <span style="flex: 1; color: #16191c; font-weight: 500; font-size: 0.9rem;">${user.email}</span>
              </div>
              ${user.department ? `
              <div style="display: flex; padding: 12px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.4);">
                <span style="width: 140px; color: #6d6c6b; font-weight: 600; font-size: 0.9rem;">Department:</span>
                <span style="flex: 1; color: #16191c; font-weight: 500; font-size: 0.9rem;">${user.department}</span>
              </div>` : ''}
              ${user.graduationYear ? `
              <div style="display: flex; padding: 12px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.4);">
                <span style="width: 140px; color: #6d6c6b; font-weight: 600; font-size: 0.9rem;">Graduation Year:</span>
                <span style="flex: 1; color: #16191c; font-weight: 500; font-size: 0.9rem; font-family: var(--font-mono);">${user.graduationYear}</span>
              </div>` : ''}
              ${user.phone ? `
              <div style="display: flex; padding: 12px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.4);">
                <span style="width: 140px; color: #6d6c6b; font-weight: 600; font-size: 0.9rem;">Phone:</span>
                <span style="flex: 1; color: #16191c; font-weight: 500; font-size: 0.9rem;">${user.phone}</span>
              </div>` : ''}
              ${user.company ? `
              <div style="display: flex; padding: 12px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.4);">
                <span style="width: 140px; color: #6d6c6b; font-weight: 600; font-size: 0.9rem;">Company:</span>
                <span style="flex: 1; color: #16191c; font-weight: 500; font-size: 0.9rem;">${user.company}</span>
              </div>` : ''}
              ${user.jobTitle ? `
              <div style="display: flex; padding: 12px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.4);">
                <span style="width: 140px; color: #6d6c6b; font-weight: 600; font-size: 0.9rem;">Job Title:</span>
                <span style="flex: 1; color: #16191c; font-weight: 500; font-size: 0.9rem;">${user.jobTitle}</span>
              </div>` : ''}
              <div style="display: flex; padding: 12px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.4);">
                <span style="width: 140px; color: #6d6c6b; font-weight: 600; font-size: 0.9rem;">Joined:</span>
                <span style="flex: 1; color: #16191c; font-weight: 500; font-size: 0.9rem;">${new Date(user.createdAt).toLocaleDateString()}</span>
              </div>
              ${user.updatedAt ? `
              <div style="display: flex; padding: 12px 0;">
                <span style="width: 140px; color: #6d6c6b; font-weight: 600; font-size: 0.9rem;">Last Updated:</span>
                <span style="flex: 1; color: #16191c; font-weight: 500; font-size: 0.9rem;">${new Date(user.updatedAt).toLocaleString()}</span>
              </div>` : ''}
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // ==========================================
  // UPDATE (U) - EDIT USER FORM VIEW
  // ==========================================

  /**
   * Render HTML view for GET /users/:id/edit
   * 
   * @param {Object} user - The user record to edit
   * @param {Object} [query={}]
   * @returns {string} HTML markup
   */
  static renderUserEditForm(user, query = {}) {
    const flashBanner = this.renderFlashBanner(query);
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        ${getHeadTags(`Edit User: ${user.name} | Alumni Tracking System`)}
      </head>
      <body>
        <header class="top-nav">
          <div class="nav-wrapper">
            <a href="/" class="nav-logo" title="Alumni Tracking System">
              <span class="nav-logo-icon">🎓</span>
              <span class="nav-brand-text">ATS</span>
            </a>
            <nav class="nav-pill-menu">
              <ul class="nav-links">
                <li><a href="/" class="nav-link">Home</a></li>
                <li><a href="/users" class="nav-link active" style="font-weight: 700;">Alumni Directory</a></li>
                <li><a href="/jobs" class="nav-link">Job Board</a></li>
                <li><a href="/applications" class="nav-link">Applications (ATS)</a></li>
                <li><a href="/announcements" class="nav-link">Announcements</a></li>
              </ul>
            </nav>
            <div class="nav-actions">
              <a href="/users/${user.id}" class="btn btn-secondary btn-sm">&larr; Profile</a>
            </div>
          </div>
        </header>

        <div class="container" style="max-width: 800px; padding-top: 32px; padding-bottom: 64px;">
          ${flashBanner}
          <div class="glass-form-card">
            <div style="margin-bottom: 20px;">
              <a href="/users/${user.id}" class="btn-glass-pill btn-view">&larr; Back to Profile</a>
            </div>

            <h1 style="margin: 0 0 6px 0; font-family: var(--font-serif); font-size: 1.85rem; color: #16191c;">✏️ Edit User Record #${user.id}</h1>
            <p style="color: #4a4a4c; margin: 0 0 24px 0; font-size: 0.95rem;">Update profile information and contact details.</p>

            <form action="/users/${user.id}/edit" method="POST">
              <div class="form-grid-2col">
                <div class="form-group">
                  <label for="name">Full Name *</label>
                  <input type="text" id="name" name="name" class="form-control" value="${user.name || ''}" required />
                </div>
                <div class="form-group">
                  <label for="email">Email Address *</label>
                  <input type="email" id="email" name="email" class="form-control" value="${user.email || ''}" required />
                </div>
                <div class="form-group">
                  <label for="role">Role</label>
                  <select id="role" name="role" class="form-control">
                    <option value="alumni" ${user.role === 'alumni' ? 'selected' : ''}>Alumni</option>
                    <option value="student" ${user.role === 'student' ? 'selected' : ''}>Student</option>
                    <option value="faculty" ${user.role === 'faculty' ? 'selected' : ''}>Faculty</option>
                    <option value="teacher" ${user.role === 'teacher' ? 'selected' : ''}>Teacher</option>
                    <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>Admin</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="department">Department</label>
                  <input type="text" id="department" name="department" class="form-control" value="${user.department || ''}" />
                </div>
                <div class="form-group">
                  <label for="graduationYear">Graduation Year</label>
                  <input type="number" id="graduationYear" name="graduationYear" class="form-control" value="${user.graduationYear || ''}" min="1900" max="2100" />
                </div>
                <div class="form-group">
                  <label for="phone">Phone Number</label>
                  <input type="tel" id="phone" name="phone" class="form-control" value="${user.phone || ''}" />
                </div>
                <div class="form-group">
                  <label for="company">Company / Institution</label>
                  <input type="text" id="company" name="company" class="form-control" value="${user.company || ''}" />
                </div>
                <div class="form-group">
                  <label for="jobTitle">Job Title</label>
                  <input type="text" id="jobTitle" name="jobTitle" class="form-control" value="${user.jobTitle || ''}" />
                </div>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 24px; border-top: 1px solid rgba(255, 255, 255, 0.5); padding-top: 20px;">
                <a href="/users/${user.id}" class="btn-glass-pill btn-view">Cancel</a>
                <button type="submit" class="btn btn-primary">💾 Save Changes (Update User)</button>
              </div>
            </form>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // ==========================================
  // CONFIRMATION VIEWS: CREATE / UPDATE / DELETE
  // ==========================================

  /**
   * Render HTML view for POST /users (Create Success View)
   * 
   * @param {Object} user - The newly created user object
   * @returns {string} HTML markup
   */
  static renderUserCreatedSuccess(user) {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        ${getHeadTags('Registration Successful | Alumni Tracking System')}
      </head>
      <body>
        <div class="container" style="max-width: 650px; margin-top: 40px;">
          <div class="card" style="border: 1px solid var(--color-stone); text-align: center; padding: 36px; box-shadow: none !important;">
            <div style="font-size: 3rem; margin-bottom: 12px;">🎉</div>
            <h1 style="color: var(--color-ink); margin: 0 0 8px 0; font-size: 1.8rem;">User Created Successfully!</h1>
            <p style="color: var(--color-ash); margin: 0 0 24px 0;">The user record has been created via the View Layer (POST /users).</p>
            
            <div style="background: var(--color-parchment-cream); border: 1px solid var(--color-stone); border-radius: 12px; padding: 20px; text-align: left; margin-bottom: 24px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid var(--color-stone); padding-bottom: 8px;">
                <strong style="color: var(--color-ink); font-size: 1.15rem; font-family: var(--font-editorial);">${user.name}</strong>
                <span class="badge ${user.role || 'alumni'}">${user.role || 'alumni'}</span>
              </div>
              <p style="margin: 4px 0; color: #334155; font-size: 0.9rem;"><strong>User ID:</strong> #${user.id}</p>
              <p style="margin: 4px 0; color: #334155; font-size: 0.9rem;"><strong>Email:</strong> ${user.email}</p>
              ${user.department ? `<p style="margin: 4px 0; color: #334155; font-size: 0.9rem;"><strong>Department:</strong> ${user.department}</p>` : ''}
              ${user.graduationYear ? `<p style="margin: 4px 0; color: #334155; font-size: 0.9rem;"><strong>Graduation Year:</strong> ${user.graduationYear}</p>` : ''}
              ${user.company ? `<p style="margin: 4px 0; color: #334155; font-size: 0.9rem;"><strong>Company:</strong> ${user.company} ${user.jobTitle ? `(${user.jobTitle})` : ''}</p>` : ''}
              <p style="margin: 4px 0; color: var(--color-ash); font-size: 0.8rem;"><strong>Registered At:</strong> ${new Date(user.createdAt).toLocaleString()}</p>
            </div>

            <div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
              <a href="/users" class="btn btn-primary">&larr; Back to Directory</a>
              <a href="/users/${user.id}" class="btn btn-secondary">🔍 View Profile</a>
              <a href="/users#create-user-form" class="btn btn-secondary">➕ Add Another</a>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  /**
   * Render HTML view for PUT/PATCH /users/:id (Update Success View)
   * 
   * @param {Object} user - The updated user object
   * @returns {string} HTML markup
   */
  static renderUserUpdatedSuccess(user) {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        ${getHeadTags('User Updated | Alumni Tracking System')}
      </head>
      <body>
        <div class="container" style="max-width: 650px; margin-top: 40px;">
          <div class="card" style="border: 1px solid var(--color-stone); text-align: center; padding: 36px; box-shadow: none !important;">
            <div style="font-size: 3rem; margin-bottom: 12px;">✅</div>
            <h1 style="color: var(--color-ink); margin: 0 0 8px 0; font-size: 1.8rem;">User Record Updated!</h1>
            <p style="color: var(--color-ash); margin: 0 0 24px 0;">The user record #${user.id} has been modified via the View Layer.</p>
            
            <div style="background: var(--color-parchment-cream); border: 1px solid var(--color-stone); border-radius: 12px; padding: 20px; text-align: left; margin-bottom: 24px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid var(--color-stone); padding-bottom: 8px;">
                <strong style="color: var(--color-ink); font-size: 1.15rem; font-family: var(--font-editorial);">${user.name}</strong>
                <span class="badge ${user.role || 'alumni'}">${user.role || 'alumni'}</span>
              </div>
              <p style="margin: 4px 0; color: #334155; font-size: 0.9rem;"><strong>User ID:</strong> #${user.id}</p>
              <p style="margin: 4px 0; color: #334155; font-size: 0.9rem;"><strong>Email:</strong> ${user.email}</p>
              ${user.department ? `<p style="margin: 4px 0; color: #334155; font-size: 0.9rem;"><strong>Department:</strong> ${user.department}</p>` : ''}
              ${user.graduationYear ? `<p style="margin: 4px 0; color: #334155; font-size: 0.9rem;"><strong>Graduation Year:</strong> ${user.graduationYear}</p>` : ''}
              ${user.company ? `<p style="margin: 4px 0; color: #334155; font-size: 0.9rem;"><strong>Company:</strong> ${user.company} ${user.jobTitle ? `(${user.jobTitle})` : ''}</p>` : ''}
              <p style="margin: 4px 0; color: var(--color-ash); font-size: 0.8rem;"><strong>Last Updated:</strong> ${new Date(user.updatedAt || user.createdAt).toLocaleString()}</p>
            </div>

            <div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
              <a href="/users" class="btn btn-primary">&larr; Back to Directory</a>
              <a href="/users/${user.id}" class="btn btn-secondary">🔍 View Profile</a>
              <a href="/users/${user.id}/edit" class="btn btn-secondary">✏️ Edit Again</a>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  /**
   * Render HTML view for DELETE /users/:id (Delete Success View)
   * 
   * @param {Object} deletedUser - The deleted user object
   * @returns {string} HTML markup
   */
  static renderUserDeletedSuccess(deletedUser) {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        ${getHeadTags('User Deleted | Alumni Tracking System')}
      </head>
      <body>
        <div class="container" style="max-width: 600px; margin-top: 40px;">
          <div class="card" style="border: 1px solid var(--color-stone); text-align: center; padding: 36px; box-shadow: none !important;">
            <div style="font-size: 3rem; margin-bottom: 12px;">🗑️</div>
            <h1 style="color: var(--color-status-danger); margin: 0 0 8px 0; font-size: 1.8rem;">User Deleted Successfully</h1>
            <p style="color: var(--color-ash); margin: 0 0 20px 0;">The user record has been removed from the directory.</p>
            
            <div style="background: var(--color-status-danger-bg); border: 1px solid var(--color-status-danger-border); border-radius: 12px; padding: 16px; text-align: left; margin-bottom: 24px;">
              <p style="margin: 4px 0; color: #991b1b; font-size: 0.95rem;"><strong>Deleted User:</strong> ${deletedUser.name} (#${deletedUser.id})</p>
              <p style="margin: 4px 0; color: #991b1b; font-size: 0.9rem;"><strong>Email:</strong> ${deletedUser.email}</p>
            </div>

            <div>
              <a href="/users" class="btn btn-primary">&larr; Return to Alumni Directory</a>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // ==========================================
  // ERROR VIEW
  // ==========================================

  /**
   * Render HTML error view
   * 
   * @param {string} errorMessage
   * @param {string} [backUrl='/users']
   * @returns {string} HTML markup
   */
  static renderUserError(errorMessage, backUrl = '/users') {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        ${getHeadTags('Error | Alumni Tracking System')}
      </head>
      <body>
        <div class="container" style="max-width: 600px; margin-top: 40px;">
          <div class="card" style="border: 1px solid var(--color-stone); text-align: center; padding: 36px; box-shadow: none !important;">
            <div style="font-size: 3rem; margin-bottom: 12px;">⚠️</div>
            <h1 style="color: var(--color-status-danger); margin: 0 0 8px 0; font-size: 1.7rem;">Action Failed</h1>
            <p style="color: var(--color-ash); margin: 0 0 20px 0;">An error occurred while processing your request:</p>
            <div style="background: var(--color-status-danger-bg); border: 1px solid var(--color-status-danger-border); color: #991b1b; padding: 14px; border-radius: 8px; margin-bottom: 24px; font-weight: 500;">
              ${errorMessage}
            </div>
            <div>
              <a href="${backUrl}" class="btn btn-primary">&larr; Go Back</a>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}

module.exports = HtmlViews;
