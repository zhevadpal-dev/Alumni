/**
 * Auth Views (Presentation Layer)
 *
 * Renders the Alumly Registration experience (/register) following the
 * canonical Alumly iOS Glassmorphism Design System.
 */

const { getHeadTags, BRAND_SVG_ICON } = require('./styles');

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

class AuthViews {
  /**
   * Render the Register page (GET /register or re-render with errors on POST /register)
   *
   * @param {Object} [options={}]
   * @param {string|null} [options.error=null] - Error summary message
   * @param {Array<string>} [options.errors=[]] - Individual validation error messages
   * @param {Object} [options.values={}] - Preserved form values
   * @returns {string} HTML markup
   */
  static renderRegisterPage(options = {}) {
    const { error = null, errors = [], values = {} } = options;
    const selectedRole = String(values.role || 'alumni').toLowerCase() === 'student' ? 'student' : 'alumni';
    const isStudent = selectedRole === 'student';

    const errorList = errors.length > 0 ? errors : (error ? [error] : []);
    const errorAlertHtml = errorList.length > 0
      ? `
        <div class="glass-alert-error" role="alert" aria-live="polite">
          <div class="glass-alert-icon" aria-hidden="true">!</div>
          <div class="glass-alert-body">
            <strong>Unable to create account</strong>
            ${errorList.length === 1
              ? `<p>${escapeHtml(errorList[0])}</p>`
              : `<ul>${errorList.map(msg => `<li>${escapeHtml(msg)}</li>`).join('')}</ul>`
            }
          </div>
        </div>
      `
      : '';

    return `<!DOCTYPE html>
<html lang="en">
<head>
  ${getHeadTags('Create Account | Alumly')}
</head>
<body>
  <!-- Unified Full-Width 3-Column CSS Grid Header -->
  <header class="top-nav">
    <div class="nav-wrapper">
      <a href="/" class="nav-logo" title="Alumly — Alumni & Career Network">
        <span class="nav-logo-icon" aria-hidden="true">
          ${BRAND_SVG_ICON}
        </span>
        <span class="nav-brand-text">Alumly</span>
      </a>

      <!-- Centered Floating iOS-Style Frosted-Glass Pill Navigation -->
      <nav class="nav-pill-menu" aria-label="Main Navigation">
        <ul class="nav-links">
          <li><a href="/" class="nav-link">Home</a></li>
          <li><a href="/users" class="nav-link">Alumni Directory</a></li>
          <li><a href="/jobs" class="nav-link">Job Board</a></li>
          <li><a href="/applications" class="nav-link">Applications</a></li>
          <li><a href="/announcements" class="nav-link">Announcements</a></li>
          <li><a href="/api/swagger" target="_blank" class="nav-link">API Docs</a></li>
        </ul>
      </nav>

      <!-- Empty Right Spacer Column to Keep Center Pill Strictly Centered -->
      <div class="nav-actions"></div>
    </div>
  </header>

  <!-- Centered Frosted-Glass Registration Stage -->
  <main class="container register-stage">
    <div class="register-glass-card">
      <div class="register-header">
        <span class="badge register-eyebrow">● JOIN ALUMLY</span>
        <h1 class="register-title">Create your Alumly account</h1>
        <p class="register-subtitle">Connect with graduates, explore curated opportunities, and stay part of your academic community.</p>
      </div>

      ${errorAlertHtml}

      <form action="/register" method="POST" id="registerForm" novalidate>
        <!-- Dynamic iOS-Style Role Segmented Control -->
        <div class="role-toggle-wrapper">
          <span class="role-toggle-label">I am joining as</span>
          <div class="role-segmented-control" role="tablist" aria-label="Select Account Role">
            <div class="role-segmented-slider ${isStudent ? 'is-student' : ''}" id="roleSlider" aria-hidden="true"></div>
            <button
              type="button"
              class="role-segment-btn ${!isStudent ? 'active' : ''}"
              data-role="alumni"
              role="tab"
              aria-selected="${!isStudent ? 'true' : 'false'}"
              id="tabAlumni"
            >
              🎓 Alumni
            </button>
            <button
              type="button"
              class="role-segment-btn ${isStudent ? 'active' : ''}"
              data-role="student"
              role="tab"
              aria-selected="${isStudent ? 'true' : 'false'}"
              id="tabStudent"
            >
              📚 Student
            </button>
          </div>
          <input type="hidden" name="role" id="roleInput" value="${selectedRole}" />
        </div>

        <!-- Section 1: Account Information -->
        <div class="register-section-label">Account Details</div>
        <div class="form-grid-2col">
          <div class="form-group">
            <label for="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              class="form-control"
              placeholder="e.g. Zeynep Naz"
              value="${escapeHtml(values.name || '')}"
              autocomplete="name"
              required
            />
          </div>

          <div class="form-group">
            <label for="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              class="form-control"
              placeholder="e.g. name@university.edu"
              value="${escapeHtml(values.email || '')}"
              autocomplete="email"
              required
            />
          </div>

          <div class="form-group">
            <label for="password">Password *</label>
            <input
              type="password"
              id="password"
              name="password"
              class="form-control"
              placeholder="Create a password"
              minlength="6"
              autocomplete="new-password"
              required
            />
            <span class="form-hint">Must be at least 6 characters long.</span>
          </div>

          <div class="form-group">
            <label for="confirmPassword">Confirm Password *</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              class="form-control"
              placeholder="Re-enter your password"
              minlength="6"
              autocomplete="new-password"
              required
            />
            <span class="form-hint" id="passwordMatchHint">Re-type your password to confirm.</span>
          </div>
        </div>

        <!-- Section 2: Academic & Profile Info -->
        <div class="register-section-label">Academic Profile</div>
        <div class="form-grid-2col">
          <div class="form-group">
            <label for="department">Department / Major *</label>
            <input
              type="text"
              id="department"
              name="department"
              class="form-control"
              placeholder="e.g. Computer Engineering"
              value="${escapeHtml(values.department || '')}"
              required
            />
          </div>

          <div class="form-group">
            <label for="graduationYear" id="graduationYearLabel">${isStudent ? 'Expected Graduation Year *' : 'Graduation Year *'}</label>
            <input
              type="number"
              id="graduationYear"
              name="graduationYear"
              class="form-control"
              placeholder="${isStudent ? 'e.g. 2027' : 'e.g. 2024'}"
              min="1900"
              max="2100"
              value="${escapeHtml(values.graduationYear || '')}"
              required
            />
          </div>

          <div class="form-group" style="grid-column: 1 / -1;">
            <label for="linkedinUrl">LinkedIn Profile URL</label>
            <input
              type="url"
              id="linkedinUrl"
              name="linkedinUrl"
              class="form-control"
              placeholder="https://linkedin.com/in/yourprofile"
              value="${escapeHtml(values.linkedinUrl || '')}"
            />
            <span class="form-hint">Optional — share your LinkedIn profile to help classmates and recruiters connect with you.</span>
          </div>
        </div>

        <!-- Section 3: Career Info (Alumni Only — Smooth Collapsible Panel) -->
        <div class="career-fields-panel ${isStudent ? 'is-hidden' : ''}" id="careerFieldsPanel" aria-hidden="${isStudent ? 'true' : 'false'}">
          <div class="career-fields-inner">
            <div class="register-section-label">Career Information <span class="optional-tag">Optional</span></div>
            <div class="form-grid-2col">
              <div class="form-group">
                <label for="company">Company / Institution</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  class="form-control"
                  placeholder="e.g. TechCorp Global"
                  value="${escapeHtml(values.company || '')}"
                  ${isStudent ? 'disabled' : ''}
                />
              </div>

              <div class="form-group">
                <label for="jobTitle">Job Title</label>
                <input
                  type="text"
                  id="jobTitle"
                  name="jobTitle"
                  class="form-control"
                  placeholder="e.g. Senior Software Engineer"
                  value="${escapeHtml(values.jobTitle || '')}"
                  ${isStudent ? 'disabled' : ''}
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Submit CTA & Sign-in Link -->
        <div class="register-actions">
          <button type="submit" class="btn btn-primary register-submit-btn">Create Account</button>
          <p class="register-footer-link">
            Already have an account? <a href="/users">Sign in</a>
          </p>
        </div>
      </form>
    </div>
  </main>

  <script>
    (function () {
      var roleInput = document.getElementById('roleInput');
      var roleSlider = document.getElementById('roleSlider');
      var tabAlumni = document.getElementById('tabAlumni');
      var tabStudent = document.getElementById('tabStudent');
      var careerPanel = document.getElementById('careerFieldsPanel');
      var companyInput = document.getElementById('company');
      var jobTitleInput = document.getElementById('jobTitle');
      var yearLabel = document.getElementById('graduationYearLabel');
      var yearInput = document.getElementById('graduationYear');
      var passwordInput = document.getElementById('password');
      var confirmInput = document.getElementById('confirmPassword');
      var matchHint = document.getElementById('passwordMatchHint');

      function setRole(role) {
        var isStudent = role === 'student';
        roleInput.value = isStudent ? 'student' : 'alumni';

        tabAlumni.classList.toggle('active', !isStudent);
        tabAlumni.setAttribute('aria-selected', String(!isStudent));
        tabStudent.classList.toggle('active', isStudent);
        tabStudent.setAttribute('aria-selected', String(isStudent));

        roleSlider.classList.toggle('is-student', isStudent);

        careerPanel.classList.toggle('is-hidden', isStudent);
        careerPanel.setAttribute('aria-hidden', String(isStudent));
        companyInput.disabled = isStudent;
        jobTitleInput.disabled = isStudent;

        yearLabel.textContent = isStudent ? 'Expected Graduation Year *' : 'Graduation Year *';
        yearInput.placeholder = isStudent ? 'e.g. 2027' : 'e.g. 2024';
      }

      tabAlumni.addEventListener('click', function () { setRole('alumni'); });
      tabStudent.addEventListener('click', function () { setRole('student'); });

      function checkPasswordMatch() {
        if (!confirmInput.value) {
          matchHint.textContent = 'Re-type your password to confirm.';
          matchHint.style.color = '';
          return;
        }
        if (passwordInput.value === confirmInput.value) {
          matchHint.textContent = 'Passwords match.';
          matchHint.style.color = '#15803d';
        } else {
          matchHint.textContent = 'Passwords do not match.';
          matchHint.style.color = '#b91c1c';
        }
      }

      passwordInput.addEventListener('input', checkPasswordMatch);
      confirmInput.addEventListener('input', checkPasswordMatch);
    })();
  </script>
</body>
</html>`;
  }
}

module.exports = AuthViews;
