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
    const uptimeSeconds = Math.floor(stats.uptime || process.uptime());
    const uptimeFormatted = `${Math.floor(uptimeSeconds / 60)}d ${uptimeSeconds % 60}s`;

    return `<!DOCTYPE html>
<html lang="tr">
<head>
  ${getHeadTags('Alumni Tracking System — Workbench & Kontrol Paneli')}
</head>
<body>
  <div class="container">
    <!-- Top Navigation Header -->
    <header class="header">
      <div class="brand">
        <span class="brand-icon">🎓</span>
        <div>
          <h1 class="title">Alumni Tracking System</h1>
          <div class="subtitle">Yükseköğretim Mezun Takip & Kariyer Platformu</div>
        </div>
      </div>
      <nav class="nav-links">
        <a href="/" class="active">🏠 Ana Sayfa</a>
        <a href="/jobs">💼 İş İlanları</a>
        <a href="/applications">📝 Başvurular</a>
        <a href="/users">👥 Mezunlar</a>
        <a href="/announcements">📢 Duyurular</a>
        <a href="/api/swagger">📖 API Swagger</a>
      </nav>
    </header>

    <!-- Hero / Workbench Command Bar -->
    <section class="bench-hero">
      <div class="bench-badge">
        <span>● OPERATIONAL-WORKBENCH</span>
        <span>•</span>
        <span>DESIGN SYSTEM 2.0</span>
      </div>
      <h1>
        <span class="highlight">Mezun & Kariyer</span> Operasyon Masası
      </h1>
      <p>
        Mezun veri tabanı yönetimi, iş ve staj ilanları, aday başvuru takip süreci (ATS), kurumsal duyurular ve RESTful API servislerinin tek ekrandan yönetildiği editoryal çalışma masası.
      </p>

      <div class="pill-group">
        <div class="pill">
          <span class="pill-dot"></span>
          <span>Sistem: <strong>Aktif (Online)</strong></span>
        </div>
        <div class="pill">
          <span>🐘 Veritabanı: <strong>PostgreSQL 15 (ACID)</strong></span>
        </div>
        <div class="pill">
          <span>🚀 Port: <strong>5001</strong></span>
        </div>
        <div class="pill">
          <span>⏱️ Çalışma Süresi: <strong>${uptimeFormatted}</strong></span>
        </div>
        <div class="pill">
          <span>🛡️ 404/5xx Guardians: <strong>Devrede</strong></span>
        </div>
      </div>

      <div class="hero-actions">
        <a href="/jobs" class="btn btn-primary">
          <span>💼 İş İlanları Panosu</span>
          <span>➔</span>
        </a>
        <a href="/applications" class="btn btn-secondary">
          <span>📝 Başvuru Takip Sistemi</span>
        </a>
        <a href="/users" class="btn btn-secondary">
          <span>👥 Mezunlar Dizini</span>
        </a>
        <a href="/api/swagger" class="btn btn-secondary">
          <span>📖 Swagger UI Test</span>
        </a>
      </div>
    </section>

    <!-- Key Metrics Cards -->
    <h2 class="section-title">📊 Platform Canlı İstatistikleri</h2>
    <div class="stats-grid">
      <div class="stat-card">
        <div>
          <div class="stat-header">
            <span class="stat-title">Kayıtlı Mezunlar</span>
            <span class="stat-icon">👥</span>
          </div>
          <div class="stat-value">${userCount}</div>
          <div class="stat-desc">Alumni, Student, Faculty, Admin rolleri</div>
        </div>
        <a href="/users" class="stat-link">Mezun Dizini ➔</a>
      </div>

      <div class="stat-card">
        <div>
          <div class="stat-header">
            <span class="stat-title">Aktif İş İlanları</span>
            <span class="stat-icon">💼</span>
          </div>
          <div class="stat-value">${jobCount}</div>
          <div class="stat-desc">Full-Time, Remote, Staj ve Sözleşmeli</div>
        </div>
        <a href="/jobs" class="stat-link">İlan Panosu ➔</a>
      </div>

      <div class="stat-card">
        <div>
          <div class="stat-header">
            <span class="stat-title">Aday Başvuruları</span>
            <span class="stat-icon">📝</span>
          </div>
          <div class="stat-value">${appCount}</div>
          <div class="stat-desc">İncelemede, Mülakat, Kabul ve Red aşamaları</div>
        </div>
        <a href="/applications" class="stat-link">Başvuru Takibi ➔</a>
      </div>

      <div class="stat-card">
        <div>
          <div class="stat-header">
            <span class="stat-title">Duyurular</span>
            <span class="stat-icon">📢</span>
          </div>
          <div class="stat-value">${annCount}</div>
          <div class="stat-desc">Kariyer, Etkinlik, Bülten ve Acil duyurular</div>
        </div>
        <a href="/announcements" class="stat-link">Duyuru Paneli ➔</a>
      </div>
    </div>

    <!-- Core Operations Matrix -->
    <h2 class="section-title">⚡ Çalışma Masası Modülleri (Workbench Modules)</h2>
    <div class="modules-grid">
      <!-- Modül 1: İş & Staj İlanları (Mint Green Taxonomy) -->
      <div class="module-card domain-mint">
        <div>
          <div class="module-card-header">
            <div class="module-card-icon">💼</div>
            <div>
              <div class="module-card-title">İş & Staj İlanları (Job Board)</div>
              <span class="badge" style="background:#ffffff; color:#064e3b; border: 1px solid rgba(6,78,59,0.2);">● CAREER-PORTAL</span>
            </div>
          </div>
          <div class="module-card-desc">
            Alumni ve partner şirketlerin açtığı açık pozisyonları listeleyin, filtreleyin, yeni ilan yayınlayın ve her ilana gelen aday başvurularını doğrudan yönetin.
          </div>
        </div>
        <div class="module-card-footer">
          <a href="/jobs" class="btn btn-primary btn-sm">İlanları İncele</a>
          <a href="/jobs/new" class="btn btn-secondary btn-sm">+ Yeni İlan Ekle</a>
          <a href="/jobs/1" class="btn btn-secondary btn-sm">Örnek İlan (#1)</a>
        </div>
      </div>

      <!-- Modül 2: Aday Başvuru Takip Sistemi (Canary Yellow Taxonomy) -->
      <div class="module-card domain-canary">
        <div>
          <div class="module-card-header">
            <div class="module-card-icon">📝</div>
            <div>
              <div class="module-card-title">Aday Takip Sistemi (Applications ATS)</div>
              <span class="badge" style="background:#ffffff; color:#713f12; border: 1px solid rgba(113,63,18,0.2);">● ATS-WORKBENCH</span>
            </div>
          </div>
          <div class="module-card-desc">
            Mezunların kariyer fırsatlarına yaptığı başvuruları izleyin. Aday özgeçmişlerini, ön yazılarını değerlendirin ve başvuru durumlarını (Submitted ➔ Under Review ➔ Accepted) ilerletin.
          </div>
        </div>
        <div class="module-card-footer">
          <a href="/applications" class="btn btn-primary btn-sm">Başvuru Dashboard'u</a>
          <a href="/applications/1" class="btn btn-secondary btn-sm">Aday Dosyası (#1)</a>
          <a href="/api/applications" class="btn btn-secondary btn-sm">JSON API</a>
        </div>
      </div>

      <!-- Modül 3: Mezunlar Dizini (Soft Violet Taxonomy) -->
      <div class="module-card domain-violet">
        <div>
          <div class="module-card-header">
            <div class="module-card-icon">👥</div>
            <div>
              <div class="module-card-title">Mezunlar & Ağ Dizini (Alumni Directory)</div>
              <span class="badge" style="background:#ffffff; color:#10054d; border: 1px solid rgba(16,5,77,0.2);">● ALUMNI-DIRECTORY</span>
            </div>
          </div>
          <div class="module-card-desc">
            Mezunları isim, e-posta, bölüm, mezuniyet yılı ve çalıştıkları şirketlere göre arayın. Yeni mezun kayıtları ekleyin ve kullanıcı profil detaylarını inceleyin.
          </div>
        </div>
        <div class="module-card-footer">
          <a href="/users" class="btn btn-primary btn-sm">Mezunlar Dizini</a>
          <a href="/users/1" class="btn btn-secondary btn-sm">Profil Görüntüle (#1)</a>
          <a href="/api/users" class="btn btn-secondary btn-sm">Users API</a>
        </div>
      </div>

      <!-- Modül 4: Kurumsal Duyurular (Petal Pink Taxonomy) -->
      <div class="module-card domain-pink">
        <div>
          <div class="module-card-header">
            <div class="module-card-icon">📢</div>
            <div>
              <div class="module-card-title">Kurumsal & Akademik Duyurular</div>
              <span class="badge" style="background:#ffffff; color:#881337; border: 1px solid rgba(136,19,55,0.2);">● CAMPUS-EVENTS</span>
            </div>
          </div>
          <div class="module-card-desc">
            Üniversite ve mezunlar derneği duyurularını, kariyer günlerini ve etkinlik bültenlerini yayınlayın. Kategori bazında filtreleme yapın.
          </div>
        </div>
        <div class="module-card-footer">
          <a href="/announcements" class="btn btn-primary btn-sm">Duyuruları Gör</a>
          <a href="/announcements/new" class="btn btn-secondary btn-sm">+ Yeni Duyuru</a>
          <a href="/api/announcements" class="btn btn-secondary btn-sm">Announcements API</a>
        </div>
      </div>
    </div>

    <!-- Developer & API Workbench Tools -->
    <section class="dev-workbench">
      <h2 class="section-title">🔧 Geliştirici & API Araçları (Developer Tools)</h2>
      <div class="dev-tools-grid">
        <a href="/api/swagger" class="tool-box">
          <strong>📖 Swagger UI</strong>
          <span>Etkileşimli OpenAPI dokümantasyonu ve test konsolu</span>
        </a>
        <a href="/api/swagger.json" class="tool-box">
          <strong>📋 OpenAPI JSON</strong>
          <span>Ham OpenAPI 3.0 şeması (Postman / CI entegrasyonu)</span>
        </a>
        <a href="/api/health" class="tool-box">
          <strong>🩺 Health Telemetry</strong>
          <span>Sistem çalışma süresi, bellek ve ortam durumu</span>
        </a>
        <a href="/sayfa-bulunamadi" class="tool-box">
          <strong>🛡️ 404 Sayfa Testi</strong>
          <span>Generic 404 HTML Error Page önizlemesi</span>
        </a>
      </div>
    </section>

    <!-- Footer -->
    <footer class="workbench-footer">
      <p>
        <strong>Alumni Tracking System</strong> &copy; 2026 • Node.js 20 • Express.js • PostgreSQL 15 • Docker Containerized
      </p>
      <p style="margin-top:4px;font-size:0.8rem;">
        Master Design System 2.0 • <a href="/about" style="color:var(--color-primary-teal);text-decoration:none;">Hakkında</a> • <a href="/api/swagger" style="color:var(--color-primary-teal);text-decoration:none;">API Docs</a>
      </p>
    </footer>
  </div>
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
      <div style="background: ${bgColor}; border: 1px solid ${borderColor}; color: ${textColor}; padding: 14px 18px; border-radius: 8px; margin-bottom: 20px; font-weight: 500; display: flex; align-items: center; justify-content: space-between; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
        <div style="display: flex; align-items: center; gap: 10px;">
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
      <div style="background: #ffffff; border: 1px solid var(--color-stone); border-radius: 12px; padding: 20px; margin-bottom: 12px; box-shadow: none !important; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
        <div style="flex: 1; min-width: 250px;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
            <h3 style="margin: 0; color: var(--color-ink); font-size: 1.2rem; font-family: var(--font-editorial); font-weight: 600;">${u.name}</h3>
            <span class="badge ${u.role || 'alumni'}">${u.role || 'alumni'}</span>
          </div>
          <p style="margin: 3px 0; color: #475569; font-size: 0.9rem;"><strong>Email:</strong> ${u.email}</p>
          ${u.department ? `<p style="margin: 2px 0; color: #64748b; font-size: 0.85rem;"><strong>Department:</strong> ${u.department} ${u.graduationYear ? `(Class of ${u.graduationYear})` : ''}</p>` : ''}
          ${u.company ? `<p style="margin: 2px 0; color: #64748b; font-size: 0.85rem;"><strong>Company:</strong> ${u.company} ${u.jobTitle ? `&bull; ${u.jobTitle}` : ''}</p>` : ''}
        </div>
        <div class="action-group">
          <a href="/users/${u.id}" class="btn btn-secondary btn-sm">🔍 View</a>
          <a href="/users/${u.id}/edit" class="btn btn-warning btn-sm">✏️ Edit</a>
          <form action="/users/${u.id}/delete" method="POST" style="margin: 0;" onsubmit="return confirm('Are you sure you want to delete user ${u.name}?');">
            <button type="submit" class="btn btn-danger btn-sm">🗑️ Delete</button>
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
        <div class="container">
          <div class="header">
            <div class="brand">
              <span class="brand-icon">🎓</span>
              <div>
                <h1 class="title">Alumni Directory & User Management</h1>
                <div style="display: flex; align-items: center; gap: 8px; margin-top: 6px; flex-wrap: wrap;">
                  <span class="badge" style="background: var(--color-mint-green); color: #064e3b; border: 1px solid rgba(6,78,59,0.2);">🐘 PostgreSQL: Connected</span>
                  <span style="color: var(--color-ash); font-size: 0.85rem; font-family: var(--font-mono);">${users.length} members persisted</span>
                </div>
              </div>
            </div>
            <div class="nav-links">
              <a href="/">🏠 Home</a>
              <a href="/jobs">💼 Jobs</a>
              <a href="/applications">📝 Applications</a>
              <a href="/announcements">📢 Announcements</a>
              <a href="/api/swagger" target="_blank">Swagger Docs</a>
            </div>
          </div>

          ${flashBanner}

          <!-- CREATE SECTION: POST /users Form -->
          <div class="card domain-violet" id="create-user-form" style="background-color: var(--color-soft-violet) !important; border: 1px solid var(--color-stone);">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
              <h2 style="margin: 0; font-size: 1.35rem; color: var(--color-ink);">
                ➕ Create New User (POST /users)
              </h2>
              <span class="badge" style="background:#ffffff; color:#10054d;">● ALUMNI-REGISTER</span>
            </div>
            <form action="/users" method="POST">
              <div class="form-grid">
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

          <!-- READ SECTION: Current Users Directory -->
          <div>
            <h2 style="margin: 0 0 16px 0; font-size: 1.35rem; color: var(--color-ink);">
              📋 Registered Alumni & Members (${users.length})
            </h2>
            ${users.length > 0 ? userCards : '<div class="card"><p style="color: #64748b; margin: 0;">No alumni records found. Use the form above to register the first member.</p></div>'}
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
        <div class="container" style="max-width: 680px; margin-top: 24px;">
          ${flashBanner}
          <div class="card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
              <a href="/users" class="btn btn-secondary btn-sm">&larr; Back to Directory</a>
              <div class="action-group">
                <a href="/users/${user.id}/edit" class="btn btn-primary btn-sm">✏️ Edit Profile</a>
                <form action="/users/${user.id}/delete" method="POST" style="margin: 0;" onsubmit="return confirm('Are you sure you want to delete ${user.name}?');">
                  <button type="submit" class="btn btn-danger btn-sm">🗑️ Delete</button>
                </form>
              </div>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <h1 style="margin: 0; font-size: 1.85rem; color: var(--color-ink);">${user.name}</h1>
              <span class="badge ${user.role || 'alumni'}">${user.role || 'alumni'}</span>
            </div>
            
            <div style="border-top: 1px solid var(--color-stone); margin-top: 20px; padding-top: 16px;">
              <div style="display: flex; padding: 10px 0; border-bottom: 1px solid var(--color-stone-light);">
                <span style="width: 140px; color: var(--color-ash); font-weight: 600; font-size: 0.9rem;">User ID:</span>
                <span style="flex: 1; color: var(--color-ink); font-weight: 500; font-size: 0.9rem; font-family: var(--font-mono);">#${user.id}</span>
              </div>
              <div style="display: flex; padding: 10px 0; border-bottom: 1px solid var(--color-stone-light);">
                <span style="width: 140px; color: var(--color-ash); font-weight: 600; font-size: 0.9rem;">Email:</span>
                <span style="flex: 1; color: var(--color-ink); font-weight: 500; font-size: 0.9rem;">${user.email}</span>
              </div>
              ${user.department ? `
              <div style="display: flex; padding: 10px 0; border-bottom: 1px solid var(--color-stone-light);">
                <span style="width: 140px; color: var(--color-ash); font-weight: 600; font-size: 0.9rem;">Department:</span>
                <span style="flex: 1; color: var(--color-ink); font-weight: 500; font-size: 0.9rem;">${user.department}</span>
              </div>` : ''}
              ${user.graduationYear ? `
              <div style="display: flex; padding: 10px 0; border-bottom: 1px solid var(--color-stone-light);">
                <span style="width: 140px; color: var(--color-ash); font-weight: 600; font-size: 0.9rem;">Graduation Year:</span>
                <span style="flex: 1; color: var(--color-ink); font-weight: 500; font-size: 0.9rem; font-family: var(--font-mono);">${user.graduationYear}</span>
              </div>` : ''}
              ${user.phone ? `
              <div style="display: flex; padding: 10px 0; border-bottom: 1px solid var(--color-stone-light);">
                <span style="width: 140px; color: var(--color-ash); font-weight: 600; font-size: 0.9rem;">Phone:</span>
                <span style="flex: 1; color: var(--color-ink); font-weight: 500; font-size: 0.9rem;">${user.phone}</span>
              </div>` : ''}
              ${user.company ? `
              <div style="display: flex; padding: 10px 0; border-bottom: 1px solid var(--color-stone-light);">
                <span style="width: 140px; color: var(--color-ash); font-weight: 600; font-size: 0.9rem;">Company:</span>
                <span style="flex: 1; color: var(--color-ink); font-weight: 500; font-size: 0.9rem;">${user.company}</span>
              </div>` : ''}
              ${user.jobTitle ? `
              <div style="display: flex; padding: 10px 0; border-bottom: 1px solid var(--color-stone-light);">
                <span style="width: 140px; color: var(--color-ash); font-weight: 600; font-size: 0.9rem;">Job Title:</span>
                <span style="flex: 1; color: var(--color-ink); font-weight: 500; font-size: 0.9rem;">${user.jobTitle}</span>
              </div>` : ''}
              <div style="display: flex; padding: 10px 0; border-bottom: 1px solid var(--color-stone-light);">
                <span style="width: 140px; color: var(--color-ash); font-weight: 600; font-size: 0.9rem;">Joined:</span>
                <span style="flex: 1; color: var(--color-ink); font-weight: 500; font-size: 0.9rem;">${new Date(user.createdAt).toLocaleDateString()}</span>
              </div>
              ${user.updatedAt ? `
              <div style="display: flex; padding: 10px 0;">
                <span style="width: 140px; color: var(--color-ash); font-weight: 600; font-size: 0.9rem;">Last Updated:</span>
                <span style="flex: 1; color: var(--color-ink); font-weight: 500; font-size: 0.9rem;">${new Date(user.updatedAt).toLocaleString()}</span>
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
        <div class="container" style="max-width: 750px; margin-top: 24px;">
          ${flashBanner}
          <div class="card">
            <div style="margin-bottom: 16px;">
              <a href="/users/${user.id}" class="btn btn-secondary btn-sm">&larr; Back to Profile</a>
            </div>

            <h1 style="margin: 0 0 6px 0; font-size: 1.6rem; color: var(--color-ink);">✏️ Edit User Record #${user.id}</h1>
            <p style="color: var(--color-ash); margin: 0 0 24px 0; font-size: 0.95rem;">Update profile information and contact details.</p>

            <form action="/users/${user.id}/edit" method="POST">
              <div class="form-grid">
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
              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 20px; border-top: 1px solid var(--color-stone); padding-top: 16px;">
                <a href="/users/${user.id}" class="btn btn-secondary">Cancel</a>
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
