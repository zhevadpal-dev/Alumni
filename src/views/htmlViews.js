/**
 * HTML Views (Presentation Layer)
 * Generates rendered HTML view responses for web browser clients.
 */

class HtmlViews {
  /**
   * Home page placeholder view
   * @returns {string}
   */
  static renderHome() {
    return 'temporary one main page';
  }

  /**
   * About page placeholder view
   * @returns {string}
   */
  static renderAbout() {
    return 'temp. about page';
  }

  /**
   * Render HTML page listing all registered alumni users
   * @param {Array<Object>} users
   * @returns {string} HTML markup
   */
  static renderUsersList(users = []) {
    const userCards = users.map(u => `
      <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <h3 style="margin: 0; color: #1e293b; font-size: 1.15rem;">${u.name}</h3>
          <span style="background: #e0f2fe; color: #0369a1; padding: 3px 10px; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; text-transform: uppercase;">${u.role || 'alumni'}</span>
        </div>
        <p style="margin: 6px 0; color: #475569; font-size: 0.9rem;"><strong>Email:</strong> ${u.email}</p>
        ${u.department ? `<p style="margin: 4px 0; color: #64748b; font-size: 0.85rem;"><strong>Department:</strong> ${u.department}</p>` : ''}
        ${u.graduationYear ? `<p style="margin: 4px 0; color: #64748b; font-size: 0.85rem;"><strong>Graduation Year:</strong> ${u.graduationYear}</p>` : ''}
        ${u.company ? `<p style="margin: 4px 0; color: #64748b; font-size: 0.85rem;"><strong>Company:</strong> ${u.company} (${u.jobTitle || 'N/A'})</p>` : ''}
        <div style="margin-top: 10px;">
          <a href="/users/${u.id}" style="color: #2563eb; text-decoration: none; font-size: 0.85rem; font-weight: 500;">View Profile &rarr;</a>
        </div>
      </div>
    `).join('');

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Alumni Directory | Alumni Tracking System</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #0f172a; margin: 0; padding: 24px; }
          .container { max-width: 800px; margin: 0 auto; }
          .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e2e8f0; padding-bottom: 16px; margin-bottom: 24px; }
          .title { font-size: 1.5rem; font-weight: 700; color: #0f172a; margin: 0; }
          .meta { color: #64748b; font-size: 0.9rem; }
          .api-link { display: inline-block; background: #2563eb; color: #ffffff; padding: 8px 16px; border-radius: 6px; text-decoration: none; font-weight: 500; font-size: 0.85rem; }
          .api-link:hover { background: #1d4ed8; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div>
              <h1 class="title">🎓 Alumni Directory</h1>
              <p class="meta">Registered graduates & network members (${users.length} total)</p>
            </div>
            <div>
              <a href="/api/swagger" class="api-link">API Swagger Docs</a>
            </div>
          </div>
          <div>
            ${users.length > 0 ? userCards : '<p style="color: #64748b;">No alumni registered yet.</p>'}
          </div>
        </div>
      </body>
      </html>
    `;
  }

  /**
   * Render single user profile view in HTML
   * @param {Object} user
   * @returns {string} HTML markup
   */
  static renderUserProfile(user) {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${user.name} - Profile | Alumni Tracking System</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #0f172a; margin: 0; padding: 24px; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); border: 1px solid #e2e8f0; padding: 32px; }
          .back-link { display: inline-block; color: #2563eb; text-decoration: none; font-size: 0.9rem; margin-bottom: 20px; }
          .name { margin: 0 0 8px 0; font-size: 1.75rem; color: #0f172a; }
          .badge { display: inline-block; background: #e0f2fe; color: #0369a1; padding: 4px 12px; border-radius: 9999px; font-size: 0.8rem; font-weight: 600; text-transform: uppercase; margin-bottom: 24px; }
          .detail-row { display: flex; padding: 10px 0; border-bottom: 1px solid #f1f5f9; }
          .detail-label { width: 140px; color: #64748b; font-weight: 500; font-size: 0.9rem; }
          .detail-value { flex: 1; color: #0f172a; font-weight: 500; font-size: 0.9rem; }
        </style>
      </head>
      <body>
        <div class="container">
          <a href="/users" class="back-link">&larr; Back to Directory</a>
          <h1 class="name">${user.name}</h1>
          <span class="badge">${user.role || 'alumni'}</span>
          <div class="detail-row"><span class="detail-label">User ID:</span><span class="detail-value">#${user.id}</span></div>
          <div class="detail-row"><span class="detail-label">Email:</span><span class="detail-value">${user.email}</span></div>
          ${user.department ? `<div class="detail-row"><span class="detail-label">Department:</span><span class="detail-value">${user.department}</span></div>` : ''}
          ${user.graduationYear ? `<div class="detail-row"><span class="detail-label">Graduation Year:</span><span class="detail-value">${user.graduationYear}</span></div>` : ''}
          ${user.phone ? `<div class="detail-row"><span class="detail-label">Phone:</span><span class="detail-value">${user.phone}</span></div>` : ''}
          ${user.company ? `<div class="detail-row"><span class="detail-label">Company:</span><span class="detail-value">${user.company}</span></div>` : ''}
          ${user.jobTitle ? `<div class="detail-row"><span class="detail-label">Job Title:</span><span class="detail-value">${user.jobTitle}</span></div>` : ''}
          <div class="detail-row"><span class="detail-label">Member Since:</span><span class="detail-value">${new Date(user.createdAt).toLocaleDateString()}</span></div>
        </div>
      </body>
      </html>
    `;
  }
}

module.exports = HtmlViews;
