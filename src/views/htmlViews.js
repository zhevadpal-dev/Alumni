/**
 * HTML Views (Presentation Layer)
 * 
 * Generates server-rendered, responsive HTML view templates for web browser clients.
 * Provides views for the homepage, about page, user directory with embedded registration form,
 * user creation success confirmation, error alerts, and single user profile cards.
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
   * Common CSS styling shared across view templates
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
      .container { max-width: 860px; margin: 0 auto; }
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 2px solid #e2e8f0;
        padding-bottom: 16px;
        margin-bottom: 24px;
      }
      .title { font-size: 1.6rem; font-weight: 700; color: #0f172a; margin: 0; }
      .subtitle { color: #64748b; font-size: 0.95rem; margin-top: 4px; }
      .nav-links a {
        display: inline-block;
        background: #2563eb;
        color: #ffffff;
        padding: 8px 16px;
        border-radius: 6px;
        text-decoration: none;
        font-weight: 500;
        font-size: 0.85rem;
        margin-left: 8px;
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
        background: #e0f2fe;
        color: #0369a1;
        padding: 3px 10px;
        border-radius: 9999px;
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
      }
      .badge.student { background: #fef3c7; color: #92400e; }
      .badge.faculty { background: #f3e8ff; color: #6b21a8; }
      .badge.admin { background: #fee2e2; color: #991b1b; }
      .form-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 16px;
        margin-bottom: 16px;
      }
      .form-group { display: flex; flex-direction: column; }
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
      }
      .form-control:focus { border-color: #2563eb; ring: 2px solid #93c5fd; }
      .btn-submit {
        background: #16a34a;
        color: #ffffff;
        border: none;
        padding: 12px 24px;
        border-radius: 6px;
        font-size: 0.95rem;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.15s ease;
      }
      .btn-submit:hover { background: #15803d; }
    `;
  }

  /**
   * Render HTML view for GET /users
   * Includes the user registration form and the list of registered alumni members.
   * 
   * @param {Array<Object>} users
   * @returns {string} HTML markup
   */
  static renderUsersList(users = []) {
    const userCards = users.map(u => `
      <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px; margin-bottom: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
        <div style="flex: 1; min-width: 250px;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
            <h3 style="margin: 0; color: #0f172a; font-size: 1.15rem;">${u.name}</h3>
            <span class="badge ${u.role || 'alumni'}">${u.role || 'alumni'}</span>
          </div>
          <p style="margin: 3px 0; color: #475569; font-size: 0.9rem;"><strong>Email:</strong> ${u.email}</p>
          ${u.department ? `<p style="margin: 2px 0; color: #64748b; font-size: 0.85rem;"><strong>Department:</strong> ${u.department} ${u.graduationYear ? `(Class of ${u.graduationYear})` : ''}</p>` : ''}
          ${u.company ? `<p style="margin: 2px 0; color: #64748b; font-size: 0.85rem;"><strong>Company:</strong> ${u.company} ${u.jobTitle ? `&bull; ${u.jobTitle}` : ''}</p>` : ''}
        </div>
        <div>
          <a href="/users/${u.id}" style="display: inline-block; background: #f1f5f9; color: #2563eb; border: 1px solid #cbd5e1; padding: 8px 14px; border-radius: 6px; text-decoration: none; font-size: 0.85rem; font-weight: 600;">View Profile &rarr;</a>
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
        <style>${this.getBaseStyles()}</style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div>
              <h1 class="title">🎓 Alumni Directory & Management</h1>
              <p class="subtitle">View Layer: Browser-rendered interface with active user records (${users.length} total)</p>
            </div>
            <div class="nav-links">
              <a href="/api/swagger" target="_blank">Swagger API</a>
              <a href="/api/users" class="secondary" target="_blank">Raw JSON</a>
            </div>
          </div>

          <!-- POST /users Form Section -->
          <div class="card" id="create-user-form">
            <h2 style="margin: 0 0 16px 0; font-size: 1.25rem; color: #0f172a; display: flex; align-items: center; gap: 8px;">
              <span>➕ Register New User / Graduate</span>
            </h2>
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
                  <label for="role">User Role</label>
                  <select id="role" name="role" class="form-control">
                    <option value="alumni" selected>Alumni</option>
                    <option value="student">Student</option>
                    <option value="faculty">Faculty</option>
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
                <button type="submit" class="btn-submit">Submit Registration (POST /users)</button>
              </div>
            </form>
          </div>

          <!-- User Directory Listing Section -->
          <div>
            <h2 style="margin: 0 0 16px 0; font-size: 1.25rem; color: #0f172a;">
              📋 Current Alumni & Members (${users.length})
            </h2>
            ${users.length > 0 ? userCards : '<div class="card"><p style="color: #64748b; margin: 0;">No alumni members found. Use the form above to add the first user.</p></div>'}
          </div>
        </div>
      </body>
      </html>
    `;
  }

  /**
   * Render HTML view for POST /users (Success View)
   * 
   * @param {Object} user - The newly created user object
   * @returns {string} HTML markup
   */
  static renderUserCreatedSuccess(user) {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Registration Successful | Alumni Tracking System</title>
        <style>${this.getBaseStyles()}</style>
      </head>
      <body>
        <div class="container" style="max-width: 650px; margin-top: 40px;">
          <div class="card" style="border-top: 5px solid #16a34a; text-align: center; padding: 36px;">
            <div style="font-size: 3rem; margin-bottom: 12px;">🎉</div>
            <h1 style="color: #15803d; margin: 0 0 8px 0; font-size: 1.6rem;">User Registered Successfully!</h1>
            <p style="color: #475569; margin: 0 0 24px 0;">The user record has been created via the View Layer (POST /users) and stored in memory.</p>
            
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; text-align: left; margin-bottom: 24px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">
                <strong style="color: #0f172a; font-size: 1.1rem;">${user.name}</strong>
                <span class="badge ${user.role || 'alumni'}">${user.role || 'alumni'}</span>
              </div>
              <p style="margin: 4px 0; color: #334155; font-size: 0.9rem;"><strong>User ID:</strong> #${user.id}</p>
              <p style="margin: 4px 0; color: #334155; font-size: 0.9rem;"><strong>Email:</strong> ${user.email}</p>
              ${user.department ? `<p style="margin: 4px 0; color: #334155; font-size: 0.9rem;"><strong>Department:</strong> ${user.department}</p>` : ''}
              ${user.graduationYear ? `<p style="margin: 4px 0; color: #334155; font-size: 0.9rem;"><strong>Graduation Year:</strong> ${user.graduationYear}</p>` : ''}
              ${user.company ? `<p style="margin: 4px 0; color: #334155; font-size: 0.9rem;"><strong>Company:</strong> ${user.company} ${user.jobTitle ? `(${user.jobTitle})` : ''}</p>` : ''}
              <p style="margin: 4px 0; color: #64748b; font-size: 0.8rem;"><strong>Registered At:</strong> ${new Date(user.createdAt).toLocaleString()}</p>
            </div>

            <div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
              <a href="/users" style="display: inline-block; background: #2563eb; color: #ffffff; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 0.9rem;">&larr; Back to Directory</a>
              <a href="/users/${user.id}" style="display: inline-block; background: #f1f5f9; color: #334155; border: 1px solid #cbd5e1; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 0.9rem;">View User Profile &rarr;</a>
              <a href="/users#create-user-form" style="display: inline-block; background: #16a34a; color: #ffffff; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 0.9rem;">➕ Register Another</a>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  /**
   * Render HTML view for POST /users (Error View)
   * 
   * @param {string} errorMessage
   * @returns {string} HTML markup
   */
  static renderUserError(errorMessage) {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Registration Error | Alumni Tracking System</title>
        <style>${this.getBaseStyles()}</style>
      </head>
      <body>
        <div class="container" style="max-width: 600px; margin-top: 40px;">
          <div class="card" style="border-top: 5px solid #dc2626; text-align: center; padding: 36px;">
            <div style="font-size: 3rem; margin-bottom: 12px;">⚠️</div>
            <h1 style="color: #b91c1c; margin: 0 0 8px 0; font-size: 1.5rem;">Registration Error</h1>
            <p style="color: #475569; margin: 0 0 20px 0;">Could not complete user registration:</p>
            <div style="background: #fef2f2; border: 1px solid #fecaca; color: #991b1b; padding: 14px; border-radius: 6px; margin-bottom: 24px; font-weight: 500;">
              ${errorMessage}
            </div>
            <div>
              <a href="/users" style="display: inline-block; background: #2563eb; color: #ffffff; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: 600;">&larr; Return to Form</a>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  /**
   * Render single user profile view in HTML (GET /users/:id)
   * 
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
        <style>${this.getBaseStyles()}</style>
      </head>
      <body>
        <div class="container" style="max-width: 620px; margin-top: 24px;">
          <div class="card">
            <a href="/users" style="display: inline-block; color: #2563eb; text-decoration: none; font-size: 0.9rem; margin-bottom: 16px; font-weight: 500;">&larr; Back to Directory</a>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <h1 style="margin: 0; font-size: 1.75rem; color: #0f172a;">${user.name}</h1>
              <span class="badge ${user.role || 'alumni'}">${user.role || 'alumni'}</span>
            </div>
            
            <div style="border-top: 1px solid #e2e8f0; margin-top: 16px; padding-top: 16px;">
              <div style="display: flex; padding: 8px 0; border-bottom: 1px solid #f1f5f9;">
                <span style="width: 140px; color: #64748b; font-weight: 600; font-size: 0.9rem;">User ID:</span>
                <span style="flex: 1; color: #0f172a; font-weight: 500; font-size: 0.9rem;">#${user.id}</span>
              </div>
              <div style="display: flex; padding: 8px 0; border-bottom: 1px solid #f1f5f9;">
                <span style="width: 140px; color: #64748b; font-weight: 600; font-size: 0.9rem;">Email:</span>
                <span style="flex: 1; color: #0f172a; font-weight: 500; font-size: 0.9rem;">${user.email}</span>
              </div>
              ${user.department ? `
              <div style="display: flex; padding: 8px 0; border-bottom: 1px solid #f1f5f9;">
                <span style="width: 140px; color: #64748b; font-weight: 600; font-size: 0.9rem;">Department:</span>
                <span style="flex: 1; color: #0f172a; font-weight: 500; font-size: 0.9rem;">${user.department}</span>
              </div>` : ''}
              ${user.graduationYear ? `
              <div style="display: flex; padding: 8px 0; border-bottom: 1px solid #f1f5f9;">
                <span style="width: 140px; color: #64748b; font-weight: 600; font-size: 0.9rem;">Graduation Year:</span>
                <span style="flex: 1; color: #0f172a; font-weight: 500; font-size: 0.9rem;">${user.graduationYear}</span>
              </div>` : ''}
              ${user.phone ? `
              <div style="display: flex; padding: 8px 0; border-bottom: 1px solid #f1f5f9;">
                <span style="width: 140px; color: #64748b; font-weight: 600; font-size: 0.9rem;">Phone:</span>
                <span style="flex: 1; color: #0f172a; font-weight: 500; font-size: 0.9rem;">${user.phone}</span>
              </div>` : ''}
              ${user.company ? `
              <div style="display: flex; padding: 8px 0; border-bottom: 1px solid #f1f5f9;">
                <span style="width: 140px; color: #64748b; font-weight: 600; font-size: 0.9rem;">Company:</span>
                <span style="flex: 1; color: #0f172a; font-weight: 500; font-size: 0.9rem;">${user.company}</span>
              </div>` : ''}
              ${user.jobTitle ? `
              <div style="display: flex; padding: 8px 0; border-bottom: 1px solid #f1f5f9;">
                <span style="width: 140px; color: #64748b; font-weight: 600; font-size: 0.9rem;">Job Title:</span>
                <span style="flex: 1; color: #0f172a; font-weight: 500; font-size: 0.9rem;">${user.jobTitle}</span>
              </div>` : ''}
              <div style="display: flex; padding: 8px 0;">
                <span style="width: 140px; color: #64748b; font-weight: 600; font-size: 0.9rem;">Joined:</span>
                <span style="flex: 1; color: #0f172a; font-weight: 500; font-size: 0.9rem;">${new Date(user.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}

module.exports = HtmlViews;
