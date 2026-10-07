/**
 * HTML Views (Presentation Layer)
 * 
 * Generates server-rendered, responsive HTML view templates for web browser clients.
 * Provides complete view coverage for all CRUD operations:
 * - Read (List): renderUsersList(users) with embedded registration form & action buttons
 * - Read (Detail): renderUserProfile(user) with edit & delete actions
 * - Create (Form & Success): embedded form + renderUserCreatedSuccess(user)
 * - Update (Form & Success): renderUserEditForm(user) + renderUserUpdatedSuccess(user)
 * - Delete (Confirmation View): renderUserDeletedSuccess(user)
 * - Error Handling: renderUserError(errorMessage, backUrl)
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
   * Shared CSS styling across all view templates
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
      .container { max-width: 880px; margin: 0 auto; }
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
      .btn {
        display: inline-block;
        padding: 9px 18px;
        border-radius: 6px;
        font-size: 0.9rem;
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
      .btn-sm { padding: 6px 12px; font-size: 0.8rem; }
      .action-group { display: flex; gap: 8px; align-items: center; }
    `;
  }

  // ==========================================
  // READ (R) - LIST VIEW WITH CREATE FORM
  // ==========================================

  /**
   * Render HTML view for GET /users
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
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Alumni Directory | Alumni Tracking System</title>
        <style>${this.getBaseStyles()}</style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div>
              <h1 class="title">🎓 Alumni Directory & User Management</h1>
              <p class="subtitle">Complete MVC View Layer: Read, Create, Edit, and Delete operations (${users.length} members)</p>
            </div>
            <div class="nav-links">
              <a href="/api/swagger" target="_blank">Swagger Docs</a>
              <a href="/api/users" class="secondary" target="_blank">REST API JSON</a>
            </div>
          </div>

          <!-- CREATE SECTION: POST /users Form -->
          <div class="card" id="create-user-form">
            <h2 style="margin: 0 0 16px 0; font-size: 1.25rem; color: #0f172a; display: flex; align-items: center; gap: 8px;">
              <span>➕ Create New User (POST /users)</span>
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
                  <label for="role">Role</label>
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
                <button type="submit" class="btn btn-success">➕ Create User Record</button>
              </div>
            </form>
          </div>

          <!-- READ SECTION: Current Users Directory -->
          <div>
            <h2 style="margin: 0 0 16px 0; font-size: 1.25rem; color: #0f172a;">
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
        <div class="container" style="max-width: 650px; margin-top: 24px;">
          <div class="card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
              <a href="/users" style="color: #2563eb; text-decoration: none; font-size: 0.9rem; font-weight: 500;">&larr; Back to Directory</a>
              <div class="action-group">
                <a href="/users/${user.id}/edit" class="btn btn-warning btn-sm">✏️ Edit Profile</a>
                <form action="/users/${user.id}/delete" method="POST" style="margin: 0;" onsubmit="return confirm('Are you sure you want to delete ${user.name}?');">
                  <button type="submit" class="btn btn-danger btn-sm">🗑️ Delete</button>
                </form>
              </div>
            </div>

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
              <div style="display: flex; padding: 8px 0; border-bottom: 1px solid #f1f5f9;">
                <span style="width: 140px; color: #64748b; font-weight: 600; font-size: 0.9rem;">Joined:</span>
                <span style="flex: 1; color: #0f172a; font-weight: 500; font-size: 0.9rem;">${new Date(user.createdAt).toLocaleDateString()}</span>
              </div>
              ${user.updatedAt ? `
              <div style="display: flex; padding: 8px 0;">
                <span style="width: 140px; color: #64748b; font-weight: 600; font-size: 0.9rem;">Last Updated:</span>
                <span style="flex: 1; color: #0f172a; font-weight: 500; font-size: 0.9rem;">${new Date(user.updatedAt).toLocaleString()}</span>
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
   * @returns {string} HTML markup
   */
  static renderUserEditForm(user) {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Edit User: ${user.name} | Alumni Tracking System</title>
        <style>${this.getBaseStyles()}</style>
      </head>
      <body>
        <div class="container" style="max-width: 750px; margin-top: 24px;">
          <div class="card">
            <div style="margin-bottom: 16px;">
              <a href="/users/${user.id}" style="color: #2563eb; text-decoration: none; font-size: 0.9rem; font-weight: 500;">&larr; Back to Profile</a>
            </div>

            <h1 style="margin: 0 0 6px 0; font-size: 1.5rem; color: #0f172a;">✏️ Edit User Record #${user.id}</h1>
            <p style="color: #64748b; margin: 0 0 24px 0; font-size: 0.95rem;">Update profile information and contact details.</p>

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
              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 16px; border-top: 1px solid #e2e8f0; padding-top: 16px;">
                <a href="/users/${user.id}" class="btn btn-secondary">Cancel</a>
                <button type="submit" class="btn btn-warning">💾 Save Changes (Update User)</button>
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
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Registration Successful | Alumni Tracking System</title>
        <style>${this.getBaseStyles()}</style>
      </head>
      <body>
        <div class="container" style="max-width: 650px; margin-top: 40px;">
          <div class="card" style="border-top: 5px solid #16a34a; text-align: center; padding: 36px;">
            <div style="font-size: 3rem; margin-bottom: 12px;">🎉</div>
            <h1 style="color: #15803d; margin: 0 0 8px 0; font-size: 1.6rem;">User Created Successfully!</h1>
            <p style="color: #475569; margin: 0 0 24px 0;">The user record has been created via the View Layer (POST /users).</p>
            
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
              <a href="/users" class="btn btn-primary">&larr; Back to Directory</a>
              <a href="/users/${user.id}" class="btn btn-secondary">🔍 View Profile</a>
              <a href="/users#create-user-form" class="btn btn-success">➕ Add Another</a>
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
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>User Updated | Alumni Tracking System</title>
        <style>${this.getBaseStyles()}</style>
      </head>
      <body>
        <div class="container" style="max-width: 650px; margin-top: 40px;">
          <div class="card" style="border-top: 5px solid #f59e0b; text-align: center; padding: 36px;">
            <div style="font-size: 3rem; margin-bottom: 12px;">✅</div>
            <h1 style="color: #d97706; margin: 0 0 8px 0; font-size: 1.6rem;">User Record Updated!</h1>
            <p style="color: #475569; margin: 0 0 24px 0;">The user record #${user.id} has been modified via the View Layer.</p>
            
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
              <p style="margin: 4px 0; color: #64748b; font-size: 0.8rem;"><strong>Last Updated:</strong> ${new Date(user.updatedAt || user.createdAt).toLocaleString()}</p>
            </div>

            <div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
              <a href="/users" class="btn btn-primary">&larr; Back to Directory</a>
              <a href="/users/${user.id}" class="btn btn-secondary">🔍 View Profile</a>
              <a href="/users/${user.id}/edit" class="btn btn-warning">✏️ Edit Again</a>
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
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>User Deleted | Alumni Tracking System</title>
        <style>${this.getBaseStyles()}</style>
      </head>
      <body>
        <div class="container" style="max-width: 600px; margin-top: 40px;">
          <div class="card" style="border-top: 5px solid #dc2626; text-align: center; padding: 36px;">
            <div style="font-size: 3rem; margin-bottom: 12px;">🗑️</div>
            <h1 style="color: #b91c1c; margin: 0 0 8px 0; font-size: 1.6rem;">User Deleted Successfully</h1>
            <p style="color: #475569; margin: 0 0 20px 0;">The user record has been removed from the directory.</p>
            
            <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 16px; text-align: left; margin-bottom: 24px;">
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
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Error | Alumni Tracking System</title>
        <style>${this.getBaseStyles()}</style>
      </head>
      <body>
        <div class="container" style="max-width: 600px; margin-top: 40px;">
          <div class="card" style="border-top: 5px solid #dc2626; text-align: center; padding: 36px;">
            <div style="font-size: 3rem; margin-bottom: 12px;">⚠️</div>
            <h1 style="color: #b91c1c; margin: 0 0 8px 0; font-size: 1.5rem;">Action Failed</h1>
            <p style="color: #475569; margin: 0 0 20px 0;">An error occurred while processing your request:</p>
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

module.exports = HtmlViews;
