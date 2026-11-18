/**
 * Announcement Views (Presentation Layer)
 * 
 * Generates server-rendered, responsive HTML view templates for the Announcement Management UI.
 * Sleek iOS Glassmorphism Implementation:
 * - Dual Typography: Source Serif 4 (Headings) + Inter (UI) + JetBrains Mono (Eyebrows/Badges)
 * - Zero Drop-Shadows (Flat Hairline Architecture)
 * - Primary Button: High-Contrast Ink Black (#16191c) with Pill Shape (100px radius)
 * - Glass Cards: Frosted Glass (rgba(255, 255, 255, 0.35 - 0.45) with blur)
 * - Soft Pastel Badges: Color-coded pills (Academic, Career, Event, Urgent)
 */

const { getGlobalStyles, getHeadTags } = require('./styles');

class AnnouncementViews {
  /**
   * Common CSS styles matching the project's design system
   */
  static getBaseStyles() {
    return getGlobalStyles();
  }

  static getLegacyAnnouncementStyles() {
    return getGlobalStyles();
  }

  /**
   * Universal header navigation bar
   */
  static renderNavbar(activeTab = 'announcements') {
    return `
      <!-- FLOATING PILL TOP NAVIGATION BAR -->
      <header class="top-nav">
        <div class="nav-wrapper">
          <a href="/" class="nav-logo" title="Alumly — Alumni & Career Network">
            <span class="nav-logo-icon" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="navAlumlyGradAnn" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#FF9A76"/>
                    <stop offset="100%" stop-color="#FF528B"/>
                  </linearGradient>
                </defs>
                <path d="M7 24.5C7.2 15.2 10.8 6.5 16 6.5C19.5 6.5 22.2 9 21.8 13.8C21.5 15.5 19.8 16.2 18.5 14.8C19.2 12.2 18 10.2 16 10.2C12.8 10.2 11.2 15.8 11 24.5C10.9 25.3 10.2 26 9.4 26H8.6C7.7 26 7 25.3 7 24.5Z" fill="#FFFFFF"/>
                <path d="M25 24.5C24.8 17.8 21.5 12.8 17 12.8C13.2 12.8 9.5 15.5 8 16.8C7.2 17.5 7.5 18.8 8.5 18.8C9.5 18.8 11.8 17.5 15 16.2C18 15 20.2 15.8 21 18.8C21.6 20.2 21.6 22.5 21.6 24.5C21.6 25.3 22.3 26 23.1 26H23.9C24.7 26 25 25.3 25 24.5Z" fill="url(#navAlumlyGradAnn)"/>
              </svg>
            </span>
            <span class="nav-brand-text">Alumly</span>
          </a>

          <!-- Floating iOS-Style Pill Navigation -->
          <nav class="nav-pill-menu">
            <ul class="nav-links">
              <li><a href="/users" class="nav-link ${activeTab === 'users' ? 'active' : ''}">Alumni Directory</a></li>
              <li><a href="/jobs" class="nav-link ${activeTab === 'jobs' ? 'active' : ''}">Job Board</a></li>
              <li><a href="/applications" class="nav-link ${activeTab === 'applications' ? 'active' : ''}">Applications</a></li>
              <li><a href="/announcements" class="nav-link ${activeTab === 'announcements' ? 'active' : ''}" style="${activeTab === 'announcements' ? 'color: var(--color-ink-black); font-weight: 700;' : ''}">Announcements</a></li>
              <li><a href="/api/swagger" target="_blank" class="nav-link">API Docs</a></li>
            </ul>
          </nav>

          <!-- Right-Aligned Action CTA Button -->
          <div class="nav-actions">
            <a href="#new-announcement" class="btn btn-primary btn-sm">+ New Announcement</a>
          </div>
        </div>
      </header>
    `;
  }

  /**
   * Render dismissible flash message banner
   * @param {Object} [query={}]
   * @returns {string} HTML markup
   */
  static renderFlashBanner(query = {}) {
    if (!query || (!query.msg && !query.success && !query.error)) return '';
    const isError = Boolean(query.error) || query.type === 'error';
    const bgColor = isError ? 'rgba(255, 222, 235, 0.85)' : 'rgba(212, 241, 244, 0.85)';
    const borderColor = isError ? 'rgba(159, 18, 57, 0.25)' : 'rgba(6, 78, 59, 0.25)';
    const textColor = isError ? '#9f1239' : '#064e3b';
    const icon = isError ? '⚠️' : '✅';
    const msg = query.msg || (query.success ? `Operation successful: ${query.success}` : query.error);

    return `
      <div style="background: ${bgColor}; backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid ${borderColor}; color: ${textColor}; padding: 14px 20px; border-radius: 16px; margin-bottom: 24px; font-weight: 500; display: flex; align-items: center; justify-content: space-between; box-shadow: none;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <span style="font-size: 1.25rem;">${icon}</span>
          <span>${escapeHtml(msg)}</span>
        </div>
        <button type="button" onclick="this.parentElement.remove();" style="background: transparent; border: none; color: ${textColor}; font-size: 1.3rem; line-height: 1; cursor: pointer; padding: 0 4px;" title="Dismiss">&times;</button>
      </div>
    `;
  }

  // ==========================================
  // LIST VIEW: /announcements
  // ==========================================

  /**
   * Render HTML view for GET /announcements
   * 
   * @param {Array<Object>} announcements
   * @param {Object} [filter={}]
   * @returns {string} HTML markup
   */
  static renderList(announcements = [], filter = {}) {
    const flashBanner = this.renderFlashBanner(filter);
    const tableRows = announcements.map(a => {
      const formattedDate = new Date(a.createdAt).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
      const badgeClass = `badge-${(a.category || 'General').toLowerCase()}`;

      return `
        <tr>
          <td><strong>#${a.id}</strong></td>
          <td>
            <a href="/announcements/${a.id}" class="candidate-link">${escapeHtml(a.title)}</a>
            <div style="color: #4a4a4c; font-size: 0.85rem; margin-top: 4px; line-height: 1.4;">
              ${escapeHtml(a.content.length > 75 ? a.content.substring(0, 75) + '...' : a.content)}
            </div>
          </td>
          <td><span class="badge ${badgeClass}">${escapeHtml(a.category || 'General')}</span></td>
          <td style="color: #4a4a4c; font-size: 0.9rem;">${escapeHtml(a.author || 'Alumni Office')}</td>
          <td style="color: #4a4a4c; white-space: nowrap; font-size: 0.88rem;">${formattedDate}</td>
          <td>
            <div class="action-cell">
              <a href="/announcements/${a.id}" class="btn-action-pill" title="View details">🔍 View</a>
              <a href="/announcements/${a.id}/edit" class="btn-action-pill" title="Edit announcement">✏️ Edit</a>
              <form action="/announcements/${a.id}/delete" method="POST" style="margin: 0; display: inline-flex;" onsubmit="return confirm('Delete announcement #${a.id}: &quot;${escapeHtml(a.title).replace(/"/g, '&quot;')}&quot;?');">
                <button type="submit" class="btn-action-pill btn-delete" title="Delete">🗑️ Delete</button>
              </form>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        ${getHeadTags('Announcement Management | Alumly')}
      </head>
      <body>
        ${this.renderNavbar('announcements')}

        <div class="container">
          <div style="margin-bottom: 20px;">
            <div class="db-badge">🐘 PostgreSQL Database: Connected (${announcements.length} records persisted)</div>
          </div>

          ${flashBanner}

          <!-- Horizontal Glass Stats Grid -->
          <div class="announcement-stats-grid">
            <div class="stat-card">
              <div class="stat-val">${announcements.length}</div>
              <div class="stat-lbl">Total Announcements</div>
            </div>
            <div class="stat-card">
              <div class="stat-val">${announcements.filter(a => (a.category || '').toLowerCase() === 'event').length}</div>
              <div class="stat-lbl">Events</div>
            </div>
            <div class="stat-card">
              <div class="stat-val">${announcements.filter(a => (a.category || '').toLowerCase() === 'career').length}</div>
              <div class="stat-lbl">Career Postings</div>
            </div>
            <div class="stat-card">
              <div class="stat-val">${announcements.filter(a => (a.category || '').toLowerCase() === 'academic').length}</div>
              <div class="stat-lbl">Academic</div>
            </div>
          </div>

          <!-- Table of Announcements -->
          <div class="glass-table-container">
            <table>
              <thead>
                <tr>
                  <th style="width: 60px;">ID</th>
                  <th>Title & Summary</th>
                  <th style="width: 120px;">Category</th>
                  <th style="width: 170px;">Author</th>
                  <th style="width: 120px;">Date</th>
                  <th style="width: 210px;">Actions</th>
                </tr>
              </thead>
              <tbody>
                ${announcements.length > 0 ? tableRows : `
                  <tr>
                    <td colspan="6" style="text-align: center; color: #4a4a4c; padding: 32px;">
                      No announcements published yet. Fill out the form below to create one.
                    </td>
                  </tr>
                `}
              </tbody>
            </table>
          </div>

          <!-- CREATE FORM: POST /announcements -->
          <div class="glass-form-card" id="new-announcement" style="margin-top: 36px;">
            <div class="card-header" style="margin-bottom: 20px;">
              <h2 class="card-title" style="display: flex; align-items: center; gap: 8px;">
                <span>📢 Publish New Announcement</span>
              </h2>
              <p style="color: #4a4a4c; font-size: 0.85rem; margin: 4px 0 0 0;">
                Broadcast updates, conferences, or job bulletins to all alumni network members.
              </p>
            </div>
            <form action="/announcements" method="POST">
              <div class="form-grid form-grid-2col">
                <div class="form-group" style="grid-column: 1 / -1;">
                  <label for="title">Title *</label>
                  <input type="text" id="title" name="title" class="form-control" placeholder="e.g. Annual Alumni Reunion Gala 2026" required />
                </div>
                <div class="form-group">
                  <label for="category">Category</label>
                  <select id="category" name="category" class="form-control">
                    <option value="General" selected>General</option>
                    <option value="Event">Event</option>
                    <option value="Career">Career</option>
                    <option value="Academic">Academic</option>
                    <option value="News">News</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="author">Author / Office</label>
                  <input type="text" id="author" name="author" class="form-control" placeholder="e.g. Alumni Relations Office" />
                </div>
                <div class="form-group full" style="grid-column: 1 / -1;">
                  <label for="content">Announcement Content *</label>
                  <textarea id="content" name="content" class="form-control" placeholder="Write full announcement details, schedules, links, or instructions..." required></textarea>
                </div>
              </div>
              <div style="display: flex; justify-content: flex-end; gap: 8px; margin-top: 16px;">
                <button type="reset" class="btn btn-secondary" style="border-radius: 100px;">Reset</button>
                <button type="submit" class="btn btn-primary">📢 Publish Announcement</button>
              </div>
            </form>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // ==========================================
  // DETAIL VIEW: /announcements/:id
  // ==========================================

  /**
   * Render HTML view for GET /announcements/:id
   * 
   * @param {Object} announcement
   * @param {Object} [query={}]
   * @returns {string} HTML markup
   */
  static renderDetail(announcement, query = {}) {
    const flashBanner = this.renderFlashBanner(query);
    const badgeClass = `badge-${(announcement.category || 'General').toLowerCase()}`;
    const createdStr = new Date(announcement.createdAt).toLocaleString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    const updatedStr = announcement.updatedAt && announcement.updatedAt !== announcement.createdAt
      ? new Date(announcement.updatedAt).toLocaleString(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      : null;

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        ${getHeadTags(`${escapeHtml(announcement.title)} | Alumly`)}
      </head>
      <body>
        ${this.renderNavbar('announcements')}

        <div class="container">
          <div style="margin-bottom: 20px;">
            <a href="/announcements" class="btn-action-pill">← Back to Announcements</a>
          </div>

          ${flashBanner}

          <div class="glass-form-card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 12px;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <span class="badge ${badgeClass}">${escapeHtml(announcement.category || 'General')}</span>
                <span style="color: #4a4a4c; font-size: 0.85rem; font-family: var(--font-mono);">Announcement #${announcement.id}</span>
              </div>
              <div class="action-cell">
                <a href="/announcements/${announcement.id}/edit" class="btn-action-pill">✏️ Edit</a>
                <form action="/announcements/${announcement.id}/delete" method="POST" style="margin: 0; display: inline-flex;" onsubmit="return confirm('Are you sure you want to delete this announcement?');">
                  <button type="submit" class="btn-action-pill btn-delete">🗑️ Delete</button>
                </form>
              </div>
            </div>

            <h1 style="font-family: var(--font-serif); margin: 0 0 16px 0; font-size: 2rem; color: #16191c; line-height: 1.25;">
              ${escapeHtml(announcement.title)}
            </h1>

            <div style="display: flex; gap: 16px; color: #4a4a4c; font-size: 0.88rem; border-bottom: 1px solid rgba(22, 25, 28, 0.08); padding-bottom: 16px; margin-bottom: 24px; flex-wrap: wrap;">
              <span><strong>Author:</strong> ${escapeHtml(announcement.author || 'Alumni Office')}</span>
              <span><strong>Published:</strong> ${createdStr}</span>
              ${updatedStr ? `<span><strong>Updated:</strong> ${updatedStr}</span>` : ''}
            </div>

            <div style="background: rgba(255, 255, 255, 0.45); border: 1px solid rgba(255, 255, 255, 0.6); border-radius: 16px; padding: 24px; font-size: 1.05rem; line-height: 1.7; color: #16191c; white-space: pre-line; margin-bottom: 28px;">
              ${escapeHtml(announcement.content)}
            </div>

            <div style="border-top: 1px solid rgba(255, 255, 255, 0.5); padding-top: 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
              <a href="/announcements" class="btn-action-pill">← Return to Announcements</a>
              <a href="/announcements/${announcement.id}/edit" class="btn btn-primary btn-sm">✏️ Edit Announcement</a>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // ==========================================
  // EDIT FORM VIEW: /announcements/:id/edit
  // ==========================================

  /**
   * Render HTML view for GET /announcements/:id/edit
   * 
   * @param {Object} announcement
   * @param {Object} [query={}]
   * @returns {string} HTML markup
   */
  static renderEditForm(announcement, query = {}) {
    const flashBanner = this.renderFlashBanner(query);
    const categories = ['General', 'Event', 'Career', 'Academic', 'News', 'Urgent'];

    const categoryOptions = categories.map(cat => `
      <option value="${cat}" ${announcement.category === cat ? 'selected' : ''}>${cat}</option>
    `).join('');

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        ${getHeadTags(`Edit: ${escapeHtml(announcement.title)} | Alumly`)}
      </head>
      <body>
        ${this.renderNavbar('announcements')}

        <div class="container" style="max-width: 760px;">
          <div style="margin-bottom: 20px;">
            <a href="/announcements/${announcement.id}" class="btn-action-pill">← Back to Announcement #${announcement.id}</a>
          </div>

          ${flashBanner}

          <div class="glass-form-card">
            <h1 style="font-family: var(--font-serif); margin: 0 0 6px 0; font-size: 1.65rem; color: #16191c;">✏️ Edit Announcement #${announcement.id}</h1>
            <p style="color: #4a4a4c; margin: 0 0 24px 0; font-size: 0.92rem;">Update the announcement title, body, author, or category.</p>

            <form action="/announcements/${announcement.id}/edit" method="POST">
              <div class="form-grid form-grid-2col">
                <div class="form-group" style="grid-column: 1 / -1;">
                  <label for="title">Title *</label>
                  <input type="text" id="title" name="title" class="form-control" value="${escapeHtml(announcement.title)}" required />
                </div>
                <div class="form-group">
                  <label for="category">Category</label>
                  <select id="category" name="category" class="form-control">
                    ${categoryOptions}
                  </select>
                </div>
                <div class="form-group">
                  <label for="author">Author / Office</label>
                  <input type="text" id="author" name="author" class="form-control" value="${escapeHtml(announcement.author || '')}" />
                </div>
                <div class="form-group full" style="grid-column: 1 / -1;">
                  <label for="content">Announcement Content *</label>
                  <textarea id="content" name="content" class="form-control" style="min-height: 140px;" required>${escapeHtml(announcement.content)}</textarea>
                </div>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 24px; border-top: 1px solid rgba(255, 255, 255, 0.5); padding-top: 20px;">
                <a href="/announcements/${announcement.id}" class="btn btn-secondary" style="border-radius: 100px;">Cancel</a>
                <button type="submit" class="btn btn-primary">💾 Save Changes (Update)</button>
              </div>
            </form>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // ==========================================
  // STANDALONE NEW FORM VIEW: /announcements/new
  // ==========================================

  /**
   * Render HTML view for GET /announcements/new
   * 
   * @returns {string} HTML markup
   */
  static renderNewForm() {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        ${getHeadTags('New Announcement | Alumly')}
      </head>
      <body>
        ${this.renderNavbar('announcements')}

        <div class="container" style="max-width: 760px;">
          <div style="margin-bottom: 20px;">
            <a href="/announcements" class="btn-action-pill">← Back to Announcements</a>
          </div>

          <div class="glass-form-card">
            <h1 style="font-family: var(--font-serif); margin: 0 0 6px 0; font-size: 1.65rem; color: #16191c;">➕ Create New Announcement</h1>
            <p style="color: #4a4a4c; margin: 0 0 24px 0; font-size: 0.92rem;">Publish an announcement visible across the alumni network.</p>

            <form action="/announcements" method="POST">
              <div class="form-grid form-grid-2col">
                <div class="form-group" style="grid-column: 1 / -1;">
                  <label for="title">Title *</label>
                  <input type="text" id="title" name="title" class="form-control" placeholder="e.g. Annual Alumni Reunion Gala 2026" required />
                </div>
                <div class="form-group">
                  <label for="category">Category</label>
                  <select id="category" name="category" class="form-control">
                    <option value="General" selected>General</option>
                    <option value="Event">Event</option>
                    <option value="Career">Career</option>
                    <option value="Academic">Academic</option>
                    <option value="News">News</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="author">Author / Office</label>
                  <input type="text" id="author" name="author" class="form-control" placeholder="e.g. Alumni Relations Office" />
                </div>
                <div class="form-group full" style="grid-column: 1 / -1;">
                  <label for="content">Announcement Content *</label>
                  <textarea id="content" name="content" class="form-control" style="min-height: 140px;" placeholder="Write full details..." required></textarea>
                </div>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 24px; border-top: 1px solid rgba(255, 255, 255, 0.5); padding-top: 20px;">
                <a href="/announcements" class="btn btn-secondary" style="border-radius: 100px;">Cancel</a>
                <button type="submit" class="btn btn-primary">📢 Publish Announcement</button>
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
   * Render HTML view for successful creation
   * 
   * @param {Object} announcement
   * @returns {string} HTML markup
   */
  static renderCreateSuccess(announcement) {
    const badgeClass = `badge-${(announcement.category || 'General').toLowerCase()}`;
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        ${getHeadTags('Announcement Published | Alumly')}
      </head>
      <body>
        ${this.renderNavbar('announcements')}

        <div class="container" style="max-width: 650px;">
          <div class="glass-form-card" style="text-align: center; padding: 36px;">
            <div style="font-size: 3rem; margin-bottom: 12px;">🎉</div>
            <h1 style="font-family: var(--font-serif); color: #16191c; margin: 0 0 8px 0; font-size: 1.7rem;">Announcement Published Successfully!</h1>
            <p style="color: #4a4a4c; margin: 0 0 24px 0;">The announcement has been registered and is now active across the platform.</p>
            
            <div style="background: rgba(255, 255, 255, 0.45); border: 1px solid rgba(255, 255, 255, 0.6); border-radius: 16px; padding: 20px; text-align: left; margin-bottom: 24px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; flex-wrap: wrap; gap: 8px;">
                <strong style="color: #16191c; font-size: 1.15rem;">${escapeHtml(announcement.title)}</strong>
                <span class="badge ${badgeClass}">${escapeHtml(announcement.category || 'General')}</span>
              </div>
              <p style="margin: 4px 0; color: #4a4a4c; font-size: 0.9rem;"><strong>Author:</strong> ${escapeHtml(announcement.author || 'Alumni Office')}</p>
              <p style="margin: 4px 0; color: #4a4a4c; font-size: 0.9rem;"><strong>Announcement ID:</strong> #${announcement.id}</p>
              <p style="margin: 8px 0 0 0; color: #16191c; font-size: 0.95rem; white-space: pre-line;">${escapeHtml(announcement.content)}</p>
            </div>

            <div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
              <a href="/announcements" class="btn btn-primary">&larr; Back to Announcements</a>
              <a href="/announcements/${announcement.id}" class="btn-action-pill">🔍 View Announcement</a>
              <a href="/announcements#new-announcement" class="btn btn-secondary" style="border-radius: 100px;">➕ Publish Another</a>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  /**
   * Render HTML view for successful update
   * 
   * @param {Object} announcement
   * @returns {string} HTML markup
   */
  static renderUpdateSuccess(announcement) {
    const badgeClass = `badge-${(announcement.category || 'General').toLowerCase()}`;
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        ${getHeadTags('Announcement Updated | Alumly')}
      </head>
      <body>
        ${this.renderNavbar('announcements')}

        <div class="container" style="max-width: 650px;">
          <div class="glass-form-card" style="text-align: center; padding: 36px;">
            <div style="font-size: 3rem; margin-bottom: 12px;">✅</div>
            <h1 style="font-family: var(--font-serif); color: #16191c; margin: 0 0 8px 0; font-size: 1.7rem;">Announcement Updated!</h1>
            <p style="color: #4a4a4c; margin: 0 0 24px 0;">Announcement #${announcement.id} has been modified successfully.</p>
            
            <div style="background: rgba(255, 255, 255, 0.45); border: 1px solid rgba(255, 255, 255, 0.6); border-radius: 16px; padding: 20px; text-align: left; margin-bottom: 24px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; flex-wrap: wrap; gap: 8px;">
                <strong style="color: #16191c; font-size: 1.15rem;">${escapeHtml(announcement.title)}</strong>
                <span class="badge ${badgeClass}">${escapeHtml(announcement.category || 'General')}</span>
              </div>
              <p style="margin: 4px 0; color: #4a4a4c; font-size: 0.9rem;"><strong>Author:</strong> ${escapeHtml(announcement.author || 'Alumni Office')}</p>
              <p style="margin: 8px 0 0 0; color: #16191c; font-size: 0.95rem; white-space: pre-line;">${escapeHtml(announcement.content)}</p>
            </div>

            <div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
              <a href="/announcements" class="btn btn-primary">&larr; Back to Announcements</a>
              <a href="/announcements/${announcement.id}" class="btn-action-pill">🔍 View Announcement</a>
              <a href="/announcements/${announcement.id}/edit" class="btn btn-secondary" style="border-radius: 100px;">✏️ Edit Again</a>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  /**
   * Render HTML view for successful deletion
   * 
   * @param {Object} deleted
   * @returns {string} HTML markup
   */
  static renderDeleteSuccess(deleted) {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        ${getHeadTags('Announcement Deleted | Alumly')}
      </head>
      <body>
        ${this.renderNavbar('announcements')}

        <div class="container" style="max-width: 600px;">
          <div class="glass-form-card" style="text-align: center; padding: 36px;">
            <div style="font-size: 3rem; margin-bottom: 12px;">🗑️</div>
            <h1 style="font-family: var(--font-serif); color: #9f1239; margin: 0 0 8px 0; font-size: 1.7rem;">Announcement Deleted</h1>
            <p style="color: #4a4a4c; margin: 0 0 20px 0;">The announcement has been permanently removed from the system.</p>
            
            <div style="background: rgba(255, 222, 235, 0.45); border: 1px solid rgba(255, 143, 179, 0.5); border-radius: 16px; padding: 18px; text-align: left; margin-bottom: 24px;">
              <p style="margin: 4px 0; color: #9f1239; font-size: 0.95rem;"><strong>Deleted Announcement:</strong> ${escapeHtml(deleted.title)} (#${deleted.id})</p>
              <p style="margin: 4px 0; color: #9f1239; font-size: 0.85rem;"><strong>Category:</strong> ${escapeHtml(deleted.category)}</p>
            </div>

            <div>
              <a href="/announcements" class="btn btn-primary">&larr; Return to Announcements</a>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  /**
   * Render HTML error view
   * 
   * @param {string} errorMessage
   * @param {string} [backUrl='/announcements']
   * @returns {string} HTML markup
   */
  static renderError(errorMessage, backUrl = '/announcements') {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        ${getHeadTags('Error | Alumly')}
      </head>
      <body>
        ${this.renderNavbar('announcements')}

        <div class="container" style="max-width: 600px;">
          <div class="glass-form-card" style="text-align: center; padding: 36px;">
            <div style="font-size: 3rem; margin-bottom: 12px;">⚠️</div>
            <h1 style="font-family: var(--font-serif); color: #9f1239; margin: 0 0 8px 0; font-size: 1.5rem;">Operation Error</h1>
            <p style="color: #4a4a4c; margin: 0 0 20px 0;">Could not complete the requested action:</p>
            <div style="background: rgba(255, 222, 235, 0.45); border: 1px solid rgba(255, 143, 179, 0.5); color: #9f1239; padding: 16px; border-radius: 16px; margin-bottom: 24px; font-weight: 500;">
              ${escapeHtml(errorMessage)}
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

module.exports = AnnouncementViews;
