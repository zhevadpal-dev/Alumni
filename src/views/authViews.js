/**
 * Auth Views (Presentation Layer)
 *
 * Renders the Alumly Registration experience (/register) following the
 * canonical Alumly iOS Glassmorphism Design System.
 */

const { getHeadTags, BRAND_SVG_ICON, renderUserSessionControls } = require('./styles');

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

      <!-- Right Column: Logged-in User Pill or Balancing Spacer -->
      <div class="nav-actions">${renderUserSessionControls()}</div>
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
            <div class="password-input-wrapper">
              <input
                type="password"
                id="password"
                name="password"
                class="form-control password-input"
                placeholder="Create a strong password"
                minlength="8"
                autocomplete="new-password"
                required
              />
              <button
                type="button"
                class="password-toggle-btn"
                data-target="password"
                aria-label="Toggle password visibility"
                aria-pressed="false"
              >
                <svg class="icon-eye" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
                <svg class="icon-eye-off" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
                  <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c6.4 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
                  <path d="M6.61 6.61A13.53 13.53 0 0 0 2 12s3.6 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
                  <line x1="2" y1="2" x2="22" y2="22"/>
                </svg>
              </button>
            </div>
            <div class="password-checklist" id="passwordChecklist" aria-live="polite">
              <span class="pw-rule" data-rule="length"><span class="pw-icon" aria-hidden="true">○</span> 8+ chars</span>
              <span class="pw-rule" data-rule="upper"><span class="pw-icon" aria-hidden="true">○</span> Uppercase</span>
              <span class="pw-rule" data-rule="lower"><span class="pw-icon" aria-hidden="true">○</span> Lowercase</span>
              <span class="pw-rule" data-rule="number"><span class="pw-icon" aria-hidden="true">○</span> Number</span>
              <span class="pw-rule" data-rule="special"><span class="pw-icon" aria-hidden="true">○</span> Special</span>
            </div>
          </div>

          <div class="form-group">
            <label for="confirmPassword">Confirm Password *</label>
            <div class="password-input-wrapper">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                class="form-control password-input"
                placeholder="Re-enter your password"
                minlength="8"
                autocomplete="new-password"
                required
              />
              <button
                type="button"
                class="password-toggle-btn"
                data-target="confirmPassword"
                aria-label="Toggle password visibility"
                aria-pressed="false"
              >
                <svg class="icon-eye" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
                <svg class="icon-eye-off" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
                  <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c6.4 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
                  <path d="M6.61 6.61A13.53 13.53 0 0 0 2 12s3.6 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
                  <line x1="2" y1="2" x2="22" y2="22"/>
                </svg>
              </button>
            </div>
            <span class="form-hint" id="passwordMatchHint">Re-type your password to confirm.</span>
          </div>
        </div>

        <!-- Section 2: Academic & Profile Info -->
        <div class="register-section-label">Academic Profile</div>
        <div class="form-grid-2col">
          <div class="form-group combobox-group" id="departmentCombobox">
            <label for="department">Department / Major *</label>
            <div class="combobox-wrapper">
              <input
                type="text"
                id="department"
                name="department"
                class="form-control combobox-input"
                placeholder="Select or type your major"
                value="${escapeHtml(values.department || '')}"
                autocomplete="off"
                role="combobox"
                aria-autocomplete="list"
                aria-expanded="false"
                aria-controls="departmentListbox"
                required
              />
              <button
                type="button"
                class="combobox-chevron-btn"
                id="departmentToggleBtn"
                aria-label="Toggle departments list"
                tabindex="-1"
              >
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M5.5 7.75L10 12.25L14.5 7.75" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <div class="combobox-dropdown" id="departmentListbox" role="listbox" aria-label="University Departments and Majors"></div>
            </div>
          </div>

          <div class="form-group">
            <label for="graduationYear" id="graduationYearLabel">${isStudent ? 'Expected Graduation Year *' : 'Graduation Year *'}</label>
            <input
              type="text"
              inputmode="numeric"
              maxlength="4"
              pattern="[0-9]{4}"
              id="graduationYear"
              name="graduationYear"
              class="form-control"
              placeholder="${isStudent ? 'e.g. 2027' : 'e.g. 2024'}"
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

        <!-- Mandatory KVKK Personal Data Protection Consent -->
        <div class="kvkk-consent-box">
          <label class="kvkk-checkbox-label" for="kvkkConsent">
            <input
              type="checkbox"
              id="kvkkConsent"
              name="kvkkConsent"
              value="on"
              class="kvkk-checkbox-input"
              ${values.kvkkConsent ? 'checked' : ''}
              required
            />
            <span class="kvkk-checkbox-text">
              I have read and accept the
              <button type="button" class="kvkk-policy-link" id="openKvkkModal">KVKK Personal Data Protection Policy</button> *
            </span>
          </label>
        </div>

        <!-- Submit CTA & Sign-in Link -->
        <div class="register-actions">
          <button type="submit" class="btn btn-primary register-submit-btn" id="registerSubmitBtn" ${values.kvkkConsent ? '' : 'disabled'}>Create Account</button>
          <p class="register-footer-link">
            Already have an account? <a href="/users">Sign in</a>
          </p>
        </div>
      </form>
    </div>
  </main>

  <!-- Sleek iOS Glassmorphism KVKK Policy Modal -->
  <div class="glass-modal-backdrop" id="kvkkModalBackdrop" role="dialog" aria-modal="true" aria-labelledby="kvkkModalTitle" aria-hidden="true">
    <div class="glass-modal-card">
      <div class="glass-modal-header">
        <div>
          <span class="badge register-eyebrow" style="margin-bottom: 6px;">● PRIVACY &amp; KVKK</span>
          <h2 class="glass-modal-title" id="kvkkModalTitle">KVKK Personal Data Protection Policy</h2>
        </div>
        <button type="button" class="glass-modal-close" id="closeKvkkModal" aria-label="Close policy modal">&times;</button>
      </div>
      <div class="glass-modal-body">
        <p><strong>1. Data Controller:</strong> Alumly operates as the academic alumni and career networking platform for your institution in compliance with Law No. 6698 on the Protection of Personal Data (KVKK).</p>
        <p><strong>2. Data Collected:</strong> We process only the account and profile details you explicitly provide—Full Name, Email Address, Academic Role, Department / Major, Graduation Year, optional LinkedIn URL, and optional Career Information—alongside your cryptographically hashed password.</p>
        <p><strong>3. Purpose of Processing:</strong> Your information is used solely to maintain the verified Alumni Directory, connect graduates and students with career opportunities, process job applications, and deliver institutional announcements.</p>
        <p><strong>4. Security &amp; Your Rights:</strong> Passwords are never stored in plaintext. Under Article 11 of KVKK, you may access, update, or permanently delete your profile and associated applications at any time from your Alumly account.</p>
      </div>
      <div class="glass-modal-footer">
        <button type="button" class="btn btn-secondary btn-sm" id="dismissKvkkModal">Close</button>
        <button type="button" class="btn btn-primary btn-sm" id="acceptKvkkModal">I Accept &amp; Close</button>
      </div>
    </div>
  </div>

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

      var passwordChecklist = document.getElementById('passwordChecklist');
      var kvkkCheckbox = document.getElementById('kvkkConsent');
      var submitBtn = document.getElementById('registerSubmitBtn');
      var registerForm = document.getElementById('registerForm');
      var kvkkBackdrop = document.getElementById('kvkkModalBackdrop');
      var openKvkkBtn = document.getElementById('openKvkkModal');
      var closeKvkkBtn = document.getElementById('closeKvkkModal');
      var dismissKvkkBtn = document.getElementById('dismissKvkkModal');
      var acceptKvkkBtn = document.getElementById('acceptKvkkModal');

      function updatePasswordChecklist() {
        var val = passwordInput.value || '';
        var checks = {
          length: val.length >= 8,
          upper: /[A-Z]/.test(val),
          lower: /[a-z]/.test(val),
          number: /[0-9]/.test(val),
          special: /[^A-Za-z0-9]/.test(val)
        };
        Object.keys(checks).forEach(function (key) {
          var el = passwordChecklist.querySelector('[data-rule="' + key + '"]');
          if (!el) return;
          var met = checks[key];
          el.classList.toggle('is-met', met);
          var icon = el.querySelector('.pw-icon');
          if (icon) icon.textContent = met ? '✓' : '○';
        });
      }

      function checkPasswordMatch() {
        if (!confirmInput.value) {
          matchHint.textContent = 'Re-type your password to confirm.';
          matchHint.style.color = '';
          return;
        }
        if (passwordInput.value === confirmInput.value) {
          matchHint.textContent = 'Passwords match.';
          matchHint.style.color = '#16191c';
        } else {
          matchHint.textContent = 'Passwords do not match.';
          matchHint.style.color = '#b91c1c';
        }
      }

      function syncSubmitState() {
        if (submitBtn && kvkkCheckbox) {
          submitBtn.disabled = !kvkkCheckbox.checked;
        }
      }

      passwordInput.addEventListener('input', function () {
        updatePasswordChecklist();
        checkPasswordMatch();
      });
      confirmInput.addEventListener('input', checkPasswordMatch);

      if (kvkkCheckbox) {
        kvkkCheckbox.addEventListener('change', syncSubmitState);
        syncSubmitState();
      }

      if (registerForm) {
        registerForm.addEventListener('submit', function (e) {
          if (kvkkCheckbox && !kvkkCheckbox.checked) {
            e.preventDefault();
            kvkkCheckbox.focus();
          }
        });
      }

      function openKvkkModal() {
        kvkkBackdrop.classList.add('is-open');
        kvkkBackdrop.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }

      function closeKvkkModal() {
        kvkkBackdrop.classList.remove('is-open');
        kvkkBackdrop.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }

      if (openKvkkBtn) openKvkkBtn.addEventListener('click', openKvkkModal);
      if (closeKvkkBtn) closeKvkkBtn.addEventListener('click', closeKvkkModal);
      if (dismissKvkkBtn) dismissKvkkBtn.addEventListener('click', closeKvkkModal);
      if (acceptKvkkBtn) {
        acceptKvkkBtn.addEventListener('click', function () {
          if (kvkkCheckbox) {
            kvkkCheckbox.checked = true;
            syncSubmitState();
          }
          closeKvkkModal();
        });
      }
      if (kvkkBackdrop) {
        kvkkBackdrop.addEventListener('click', function (e) {
          if (e.target === kvkkBackdrop) closeKvkkModal();
        });
      }
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && kvkkBackdrop && kvkkBackdrop.classList.contains('is-open')) {
          closeKvkkModal();
        }
      });

      updatePasswordChecklist();

      // Independent Show/Hide Password Toggle Buttons
      var toggleButtons = document.querySelectorAll('.password-toggle-btn');
      toggleButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
          var targetId = btn.getAttribute('data-target');
          var input = document.getElementById(targetId);
          if (!input) return;
          var isCurrentlyHidden = input.type === 'password';
          input.type = isCurrentlyHidden ? 'text' : 'password';
          btn.classList.toggle('is-visible', isCurrentlyHidden);
          btn.setAttribute('aria-pressed', String(isCurrentlyHidden));
        });
      });

      // Scrollable iOS Glassmorphism Combobox for Department / Major
      var MAJORS = [
        'Management Information Systems',
        'Computer Engineering',
        'Software Engineering',
        'Data Science & Artificial Intelligence',
        'Business Administration',
        'Economics',
        'Finance & Banking',
        'Industrial Engineering',
        'Electrical & Electronics Engineering',
        'Mechanical Engineering',
        'Civil Engineering',
        'Architecture',
        'Interior Architecture & Environmental Design',
        'Psychology',
        'Law',
        'Medicine',
        'Pharmacy',
        'Nursing & Health Sciences',
        'Communication & Media',
        'International Relations',
        'Political Science',
        'Graphic Design',
        'Mathematics',
        'Physics',
        'Chemistry',
        'Molecular Biology & Genetics',
        'Sociology',
        'English Language & Literature'
      ];

      var combobox = document.getElementById('departmentCombobox');
      var deptInput = document.getElementById('department');
      var deptToggle = document.getElementById('departmentToggleBtn');
      var deptList = document.getElementById('departmentListbox');
      var activeIndex = -1;
      var isOpen = false;

      function renderOptions(queryText) {
        var trimmed = (queryText || '').trim();
        var lower = trimmed.toLowerCase();
        var matches = MAJORS.filter(function (major) {
          return !lower || major.toLowerCase().indexOf(lower) !== -1;
        });

        var exactMatch = MAJORS.some(function (major) {
          return major.toLowerCase() === lower;
        });

        deptList.innerHTML = '';
        activeIndex = -1;

        matches.forEach(function (major) {
          var item = document.createElement('div');
          item.className = 'combobox-option';
          item.setAttribute('role', 'option');
          item.setAttribute('data-value', major);
          if (major.toLowerCase() === lower) {
            item.classList.add('is-selected');
            item.setAttribute('aria-selected', 'true');
          }
          item.textContent = major;
          item.addEventListener('mousedown', function (e) {
            e.preventDefault();
            selectMajor(major);
          });
          deptList.appendChild(item);
        });

        if (trimmed && !exactMatch) {
          var customItem = document.createElement('div');
          customItem.className = 'combobox-option combobox-custom-option';
          customItem.setAttribute('role', 'option');
          customItem.setAttribute('data-value', trimmed);
          customItem.textContent = 'Use custom major: "' + trimmed + '"';
          customItem.addEventListener('mousedown', function (e) {
            e.preventDefault();
            selectMajor(trimmed);
          });
          deptList.appendChild(customItem);
        }
      }

      function openDropdown() {
        renderOptions(deptInput.value);
        deptList.classList.add('is-open');
        combobox.classList.add('is-open');
        deptInput.setAttribute('aria-expanded', 'true');
        isOpen = true;
      }

      function closeDropdown() {
        deptList.classList.remove('is-open');
        combobox.classList.remove('is-open');
        deptInput.setAttribute('aria-expanded', 'false');
        activeIndex = -1;
        isOpen = false;
      }

      function selectMajor(value) {
        deptInput.value = value;
        closeDropdown();
      }

      function highlightOption(index) {
        var options = deptList.querySelectorAll('.combobox-option');
        if (!options.length) return;
        options.forEach(function (el) { el.classList.remove('is-active'); });
        if (index < 0) index = options.length - 1;
        if (index >= options.length) index = 0;
        activeIndex = index;
        options[activeIndex].classList.add('is-active');
        options[activeIndex].scrollIntoView({ block: 'nearest' });
      }

      deptInput.addEventListener('focus', openDropdown);
      deptInput.addEventListener('click', function () {
        if (!isOpen) openDropdown();
      });
      deptInput.addEventListener('input', function () {
        if (!isOpen) openDropdown();
        else renderOptions(deptInput.value);
      });

      deptInput.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
          closeDropdown();
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          if (!isOpen) openDropdown();
          highlightOption(activeIndex + 1);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          if (!isOpen) openDropdown();
          highlightOption(activeIndex - 1);
        } else if (e.key === 'Enter' && isOpen && activeIndex >= 0) {
          var options = deptList.querySelectorAll('.combobox-option');
          if (options[activeIndex]) {
            e.preventDefault();
            selectMajor(options[activeIndex].getAttribute('data-value'));
          }
        }
      });

      deptToggle.addEventListener('mousedown', function (e) {
        e.preventDefault();
        if (isOpen) {
          closeDropdown();
        } else {
          deptInput.focus();
          openDropdown();
        }
      });

      document.addEventListener('click', function (e) {
        if (isOpen && !combobox.contains(e.target)) {
          closeDropdown();
        }
      });
    })();
  </script>
</body>
</html>`;
  }
}

module.exports = AuthViews;
