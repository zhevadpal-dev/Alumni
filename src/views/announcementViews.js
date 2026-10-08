/**
 * Announcement Views (Presentation Layer)
 * 
 * Generates server-rendered, responsive HTML view templates for the Announcement Management UI.
 * Provides views for:
 * - List view with comprehensive table, category filtering, and embedded creation form (/announcements)
 * - Single announcement detail view (/announcements/:id)
 * - Standalone creation form (/announcements/new)
 * - Edit form (/announcements/:id/edit)
 * - Success and error notification pages
 */

class AnnouncementViews {
  /**
   * Common CSS styles matching the project's design system
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
      .container { max-width: 960px; margin: 0 auto; }
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
      .title { font-size: 1.6rem; font-weight: 700; color: #0f172a; margin: 0; }
      .subtitle { color: #64748b; font-size: 0.95rem; margin-top: 4px; }
      .nav-links { display: flex; gap: 8px; flex-wrap: wrap; }
      .nav-links a {
        display: inline-block;
        background: #2563eb;
        color: #ffffff;
        padding: 8px 16px;
        border-radius: 6px;
        text-decoration: none;
        font-weight: 500;
        font-size: 0.85rem;
        transition: background 0.15s ease;
      }
      .nav-links a:hover { background: #1d4ed8; }
      .nav-links a.secondary {
        background: #ffffff;
        color: #334155;
        border: 1px solid #cbd5e1;
      }
      .nav-links a.secondary:hover { background: #f1f5f9; }
      .card {
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 10px;
        padding: 24px;
        margin-bottom: 24px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.05);
      }
      .badge {
        display: inline-block;
        padding: 3px 10px;
        border-radius: 9999px;
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
      }
      .badge-Event { background: #e0f2fe; color: #0369a1; }
      .badge-Career { background: #fef3c7; color: #92400e; }
      .badge-Academic { background: #f3e8ff; color: #6b21a8; }
      .badge-News { background: #dcfce7; color: #166534; }
      .badge-Urgent { background: #fee2e2; color: #991b1b; }
      .badge-General { background: #f1f5f9; color: #475569; }
      .table-wrapper {
        overflow-x: auto;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        background: #ffffff;
        box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        margin-bottom: 24px;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        text-align: left;
        font-size: 0.9rem;
      }
      th {
        background-color: #f8fafc;
        color: #475569;
        font-weight: 600;
        padding: 12px 16px;
        border-bottom: 1px solid #e2e8f0;
      }
      td {
        padding: 14px 16px;
        border-bottom: 1px solid #f1f5f9;
        color: #1e293b;
      }
      tr:last-child td { border-bottom: none; }
      tr:hover td { background-color: #fbfcfe; }
      .btn {
        display: inline-block;
        padding: 7px 14px;
        border-radius: 6px;
        font-size: 0.85rem;
        font-weight: 600;
        text-decoration: none;
        cursor: pointer;
        border: none;
        transition: all 0.15s ease;
      }
      .btn-primary { background: #2563eb; color: #ffffff; }
      .btn-primary:hover { background: #1d4ed8; }
      .btn-success { background: #16a34a; color: #ffffff; }
      .btn-success:hover { background: #15803d; }
      .btn-warning { background: #f59e0b; color: #ffffff; }
      .btn-warning:hover { background: #d97706; }
      .btn-danger { background: #dc2626; color: #ffffff; }
      .btn-danger:hover { background: #b91c1c; }
      .btn-secondary { background: #f1f5f9; color: #334155; border: 1px solid #cbd5e1; }
      .btn-secondary:hover { background: #e2e8f0; }
      .btn-sm { padding: 5px 10px; font-size: 0.8rem; }
      .action-cell { display: flex; gap: 6px; align-items: center; }
      .form-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 16px;
        margin-bottom: 16px;
      }
      .form-group { display: flex; flex-direction: column; }
      .form-group.full-width { grid-column: 1 / -1; }
      .form-group label {
        font-weight: 600;
        font-size: 0.85rem;
        color: #334155;
        margin-bottom: 6px;
      }
      .form-control {
        padding: 10px 12px;
        border: 1px solid #cbd5e1;
        border-radius: 6px;
        font-size: 0.9rem;
        outline: none;
        transition: border-color 0.15s ease;
        font-family: inherit;
      }
      .form-control:focus { border-color: #2563eb; ring: 2px solid #93c5fd; }
      textarea.form-control { resize: vertical; min-height: 100px; }
      .stats-bar {
        display: flex;
        gap: 16px;
        margin-bottom: 24px;
        flex-wrap: wrap;
      }
      .stat-card {
        flex: 1;
        min-width: 160px;
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        padding: 16px;
        box-shadow: 0 1px 2px rgba(0,0,0,0.05);
      }
      .stat-val { font-size: 1.6rem; font-weight: 700; color: #0f172a; }
      .stat-lbl { color: #64748b; font-size: 0.8rem; font-weight: 500; text-transform: uppercase; margin-top: 2px; }
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
    const tableRows = announcements.map(a => {
      const formattedDate = new Date(a.createdAt).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
      const badgeClass = `badge-${a.category || 'General'}`;

      return `
        <tr>
          <td style="font-weight: 600; color: #64748b;">#${a.id}</td>
          <td>
            <a href="/announcements/${a.id}" style="font-weight: 600; color: #0f172a; text-decoration: none;">${a.title}</a>
            <div style="color: #64748b; font-size: 0.8rem; margin-top: 2px;">
              ${a.content.length > 75 ? a.content.substring(0, 75) + '...' : a.content}
            </div>
          </td>
          <td><span class="badge ${badgeClass}">${a.category || 'General'}</span></td>
          <td style="color: #475569;">${a.author || 'Alumni Office'}</td>
          <td style="color: #64748b; white-space: nowrap;">${formattedDate}</td>
          <td>
            <div class="action-cell">
              <a href="/announcements/${a.id}" class="btn btn-secondary btn-sm" title="View details">🔍 View</a>
              <a href="/announcements/${a.id}/edit" class="btn btn-warning btn-sm" title="Edit announcement">✏️ Edit</a>
              <form action="/announcements/${a.id}/delete" method="POST" style="margin:0;" onsubmit="return confirm('Delete announcement #${a.id}: &quot;${a.title.replace(/"/g, '&quot;')}&quot;?');">
                <button type="submit" class="btn btn-danger btn-sm" title="Delete">🗑️ Delete</button>
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
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Announcements | Alumni Tracking System</title>
        <style>${this.getBaseStyles()}</style>
      </head>
      <body>
        <div class="container">
          <!-- Header -->
          <div class="header">
            <div>
              <h1 class="title">📢 Announcement Management</h1>
              <p class="subtitle">Publish institutional news, event broadcasts, and career opportunities (${announcements.length} active)</p>
            </div>
            <div class="nav-links">
              <a href="#new-announcement" class="btn btn-success" style="color: #fff;">➕ New Announcement</a>
              <a href="/users" class="secondary">🎓 Alumni Directory</a>
              <a href="/api/swagger" target="_blank">Swagger API</a>
              <a href="/api/announcements" class="secondary" target="_blank">REST API JSON</a>
            </div>
          </div>

          <!-- Stats Bar -->
          <div class="stats-bar">
            <div class="stat-card">
              <div class="stat-val">${announcements.length}</div>
              <div class="stat-lbl">Total Announcements</div>
            </div>
            <div class="stat-card">
              <div class="stat-val">${announcements.filter(a => a.category === 'Event').length}</div>
              <div class="stat-lbl">Events</div>
            </div>
            <div class="stat-card">
              <div class="stat-val">${announcements.filter(a => a.category === 'Career').length}</div>
              <div class="stat-lbl">Career Postings</div>
            </div>
            <div class="stat-card">
              <div class="stat-val">${announcements.filter(a => a.category === 'Academic').length}</div>
              <div class="stat-lbl">Academic</div>
            </div>
          </div>

          <!-- Table of Announcements -->
          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th style="width: 50px;">ID</th>
                  <th>Title & Summary</th>
                  <th style="width: 110px;">Category</th>
                  <th style="width: 160px;">Author</th>
                  <th style="width: 110px;">Date</th>
                  <th style="width: 190px;">Actions</th>
                </tr>
              </thead>
              <tbody>
                ${announcements.length > 0 ? tableRows : `
                  <tr>
                    <td colspan="6" style="text-align: center; color: #64748b; padding: 32px;">
                      No announcements published yet. Fill out the form below to create one.
                    </td>
                  </tr>
                `}
              </tbody>
            </table>
          </div>

          <!-- CREATE FORM: POST /announcements -->
          <div class="card" id="new-announcement">
            <h2 style="margin: 0 0 16px 0; font-size: 1.25rem; color: #0f172a; display: flex; align-items: center; gap: 8px;">
              <span>➕ Publish New Announcement (POST /announcements)</span>
            </h2>
            <form action="/announcements" method="POST">
              <div class="form-grid">
                <div class="form-group" style="grid-column: span 2;">
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
                <div class="form-group full-width">
                  <label for="content">Announcement Content *</label>
                  <textarea id="content" name="content" class="form-control" placeholder="Write full announcement details, schedules, links, or instructions..." required></textarea>
                </div>
              </div>
              <div style="display: flex; justify-content: flex-end; gap: 8px;">
                <button type="reset" class="btn btn-secondary">Clear</button>
                <button type="submit" class="btn btn-success">📢 Publish Announcement</button>
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
   * @returns {string} HTML markup
   */
  static renderDetail(announcement) {
    const badgeClass = `badge-${announcement.category || 'General'}`;
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
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${announcement.title} | Alumni Tracking System</title>
        <style>${this.getBaseStyles()}</style>
      </head>
      <body>
        <div class="container" style="max-width: 720px; margin-top: 24px;">
          <div class="card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
              <a href="/announcements" style="color: #2563eb; text-decoration: none; font-size: 0.9rem; font-weight: 500;">&larr; Back to Announcements</a>
              <div class="action-cell">
                <a href="/announcements/${announcement.id}/edit" class="btn btn-warning btn-sm">✏️ Edit</a>
                <form action="/announcements/${announcement.id}/delete" method="POST" style="margin: 0;" onsubmit="return confirm('Are you sure you want to delete this announcement?');">
                  <button type="submit" class="btn btn-danger btn-sm">🗑️ Delete</button>
                </form>
              </div>
            </div>

            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
              <span class="badge ${badgeClass}">${announcement.category || 'General'}</span>
              <span style="color: #64748b; font-size: 0.85rem;">Announcement #${announcement.id}</span>
            </div>

            <h1 style="margin: 0 0 12px 0; font-size: 1.8rem; color: #0f172a; line-height: 1.3;">
              ${announcement.title}
            </h1>

            <div style="display: flex; gap: 16px; color: #64748b; font-size: 0.85rem; border-bottom: 1px solid #e2e8f0; padding-bottom: 16px; margin-bottom: 20px; flex-wrap: wrap;">
              <span><strong>Author:</strong> ${announcement.author || 'Alumni Office'}</span>
              <span><strong>Published:</strong> ${createdStr}</span>
              ${updatedStr ? `<span><strong>Updated:</strong> ${updatedStr}</span>` : ''}
            </div>

            <div style="font-size: 1.05rem; line-height: 1.7; color: #1e293b; white-space: pre-line; margin-bottom: 28px;">
              ${announcement.content}
            </div>

            <div style="border-top: 1px solid #f1f5f9; padding-top: 16px; display: flex; justify-content: space-between; align-items: center;">
              <a href="/announcements" class="btn btn-secondary">&larr; Return to Announcements</a>
              <a href="/announcements/${announcement.id}/edit" class="btn btn-warning">✏️ Edit Announcement</a>
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
   * @returns {string} HTML markup
   */
  static renderEditForm(announcement) {
    const categories = ['General', 'Event', 'Career', 'Academic', 'News', 'Urgent'];

    const categoryOptions = categories.map(cat => `
      <option value="${cat}" ${announcement.category === cat ? 'selected' : ''}>${cat}</option>
    `).join('');

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Edit: ${announcement.title} | Alumni Tracking System</title>
        <style>${this.getBaseStyles()}</style>
      </head>
      <body>
        <div class="container" style="max-width: 720px; margin-top: 24px;">
          <div class="card">
            <div style="margin-bottom: 16px;">
              <a href="/announcements/${announcement.id}" style="color: #2563eb; text-decoration: none; font-size: 0.9rem; font-weight: 500;">&larr; Back to Announcement #${announcement.id}</a>
            </div>

            <h1 style="margin: 0 0 6px 0; font-size: 1.5rem; color: #0f172a;">✏️ Edit Announcement #${announcement.id}</h1>
            <p style="color: #64748b; margin: 0 0 24px 0; font-size: 0.95rem;">Update the announcement title, body, author, or category.</p>

            <form action="/announcements/${announcement.id}/edit" method="POST">
              <div class="form-grid">
                <div class="form-group" style="grid-column: span 2;">
                  <label for="title">Title *</label>
                  <input type="text" id="title" name="title" class="form-control" value="${announcement.title.replace(/"/g, '&quot;')}" required />
                </div>
                <div class="form-group">
                  <label for="category">Category</label>
                  <select id="category" name="category" class="form-control">
                    ${categoryOptions}
                  </select>
                </div>
                <div class="form-group">
                  <label for="author">Author / Office</label>
                  <input type="text" id="author" name="author" class="form-control" value="${(announcement.author || '').replace(/"/g, '&quot;')}" />
                </div>
                <div class="form-group full-width">
                  <label for="content">Announcement Content *</label>
                  <textarea id="content" name="content" class="form-control" style="min-height: 140px;" required>${announcement.content}</textarea>
                </div>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 20px; border-top: 1px solid #e2e8f0; padding-top: 16px;">
                <a href="/announcements/${announcement.id}" class="btn btn-secondary">Cancel</a>
                <button type="submit" class="btn btn-warning">💾 Save Changes (Update)</button>
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
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Announcement | Alumni Tracking System</title>
        <style>${this.getBaseStyles()}</style>
      </head>
      <body>
        <div class="container" style="max-width: 720px; margin-top: 24px;">
          <div class="card">
            <div style="margin-bottom: 16px;">
              <a href="/announcements" style="color: #2563eb; text-decoration: none; font-size: 0.9rem; font-weight: 500;">&larr; Back to Announcements</a>
            </div>

            <h1 style="margin: 0 0 6px 0; font-size: 1.5rem; color: #0f172a;">➕ Create New Announcement</h1>
            <p style="color: #64748b; margin: 0 0 24px 0; font-size: 0.95rem;">Publish an announcement visible across the alumni network.</p>

            <form action="/announcements" method="POST">
              <div class="form-grid">
                <div class="form-group" style="grid-column: span 2;">
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
                <div class="form-group full-width">
                  <label for="content">Announcement Content *</label>
                  <textarea id="content" name="content" class="form-control" style="min-height: 140px;" placeholder="Write full details..." required></textarea>
                </div>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 20px; border-top: 1px solid #e2e8f0; padding-top: 16px;">
                <a href="/announcements" class="btn btn-secondary">Cancel</a>
                <button type="submit" class="btn btn-success">📢 Publish Announcement</button>
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
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Announcement Published | Alumni Tracking System</title>
        <style>${this.getBaseStyles()}</style>
      </head>
      <body>
        <div class="container" style="max-width: 650px; margin-top: 40px;">
          <div class="card" style="border-top: 5px solid #16a34a; text-align: center; padding: 36px;">
            <div style="font-size: 3rem; margin-bottom: 12px;">🎉</div>
            <h1 style="color: #15803d; margin: 0 0 8px 0; font-size: 1.6rem;">Announcement Published Successfully!</h1>
            <p style="color: #475569; margin: 0 0 24px 0;">The announcement has been registered and is now active.</p>
            
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; text-align: left; margin-bottom: 24px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <strong style="color: #0f172a; font-size: 1.15rem;">${announcement.title}</strong>
                <span class="badge badge-${announcement.category || 'General'}">${announcement.category || 'General'}</span>
              </div>
              <p style="margin: 4px 0; color: #475569; font-size: 0.9rem;"><strong>Author:</strong> ${announcement.author}</p>
              <p style="margin: 4px 0; color: #475569; font-size: 0.9rem;"><strong>Announcement ID:</strong> #${announcement.id}</p>
              <p style="margin: 8px 0 0 0; color: #1e293b; font-size: 0.95rem; white-space: pre-line;">${announcement.content}</p>
            </div>

            <div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
              <a href="/announcements" class="btn btn-primary">&larr; Back to Announcements</a>
              <a href="/announcements/${announcement.id}" class="btn btn-secondary">🔍 View Announcement</a>
              <a href="/announcements#new-announcement" class="btn btn-success">➕ Publish Another</a>
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
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Announcement Updated | Alumni Tracking System</title>
        <style>${this.getBaseStyles()}</style>
      </head>
      <body>
        <div class="container" style="max-width: 650px; margin-top: 40px;">
          <div class="card" style="border-top: 5px solid #f59e0b; text-align: center; padding: 36px;">
            <div style="font-size: 3rem; margin-bottom: 12px;">✅</div>
            <h1 style="color: #d97706; margin: 0 0 8px 0; font-size: 1.6rem;">Announcement Updated!</h1>
            <p style="color: #475569; margin: 0 0 24px 0;">Announcement #${announcement.id} has been modified successfully.</p>
            
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; text-align: left; margin-bottom: 24px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <strong style="color: #0f172a; font-size: 1.15rem;">${announcement.title}</strong>
                <span class="badge badge-${announcement.category || 'General'}">${announcement.category || 'General'}</span>
              </div>
              <p style="margin: 4px 0; color: #475569; font-size: 0.9rem;"><strong>Author:</strong> ${announcement.author}</p>
              <p style="margin: 8px 0 0 0; color: #1e293b; font-size: 0.95rem; white-space: pre-line;">${announcement.content}</p>
            </div>

            <div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
              <a href="/announcements" class="btn btn-primary">&larr; Back to Announcements</a>
              <a href="/announcements/${announcement.id}" class="btn btn-secondary">🔍 View Announcement</a>
              <a href="/announcements/${announcement.id}/edit" class="btn btn-warning">✏️ Edit Again</a>
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
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Announcement Deleted | Alumni Tracking System</title>
        <style>${this.getBaseStyles()}</style>
      </head>
      <body>
        <div class="container" style="max-width: 600px; margin-top: 40px;">
          <div class="card" style="border-top: 5px solid #dc2626; text-align: center; padding: 36px;">
            <div style="font-size: 3rem; margin-bottom: 12px;">🗑️</div>
            <h1 style="color: #b91c1c; margin: 0 0 8px 0; font-size: 1.6rem;">Announcement Deleted</h1>
            <p style="color: #475569; margin: 0 0 20px 0;">The announcement has been permanently removed.</p>
            
            <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 16px; text-align: left; margin-bottom: 24px;">
              <p style="margin: 4px 0; color: #991b1b; font-size: 0.95rem;"><strong>Deleted Announcement:</strong> ${deleted.title} (#${deleted.id})</p>
              <p style="margin: 4px 0; color: #991b1b; font-size: 0.85rem;"><strong>Category:</strong> ${deleted.category}</p>
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
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Error | Alumni Tracking System</title>
        <style>${this.getBaseStyles()}</style>
      </head>
      <body>
        <div class="container" style="max-width: 600px; margin-top: 40px;">
          <div class="card" style="border-top: 5px solid #dc2626; text-align: center; padding: 36px;">
            <div style="font-size: 3rem; margin-bottom: 12px;">⚠️</div>
            <h1 style="color: #b91c1c; margin: 0 0 8px 0; font-size: 1.5rem;">Operation Error</h1>
            <p style="color: #475569; margin: 0 0 20px 0;">Could not complete the requested action:</p>
            <div style="background: #fef2f2; border: 1px solid #fecaca; color: #991b1b; padding: 14px; border-radius: 6px; margin-bottom: 24px; font-weight: 500;">
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

module.exports = AnnouncementViews;
