/**
 * Auth Controller (Registration MVC Controller)
 *
 * Handles GET /register and POST /register for Alumly public account creation.
 * Supports both server-rendered HTML (with inline error preservation) and JSON API clients.
 */

const UserModel = require('../models/userModel');
const AuthViews = require('../views/authViews');

class AuthController {
  /**
   * GET /register
   * Renders the Alumly Registration page.
   */
  static async renderRegister(req, res) {
    const initialRole = req.query?.role === 'student' ? 'student' : 'alumni';
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(
      AuthViews.renderRegisterPage({
        values: { role: initialRole }
      })
    );
  }

  /**
   * POST /register
   * Validates inputs, restricts roles strictly to Alumni/Student, hashes password,
   * persists user to PostgreSQL, and redirects or returns JSON.
   */
  static async handleRegister(req, res) {
    const acceptsJsonOnly =
      req.xhr ||
      (req.headers.accept &&
        req.headers.accept.includes('application/json') &&
        !req.headers.accept.includes('text/html'));

    const payload = {
      name: req.body?.name,
      email: req.body?.email,
      password: req.body?.password,
      confirmPassword: req.body?.confirmPassword,
      role: req.body?.role,
      department: req.body?.department,
      graduationYear: req.body?.graduationYear,
      company: req.body?.company,
      jobTitle: req.body?.jobTitle,
      linkedinUrl: req.body?.linkedinUrl
    };

    try {
      const newUser = await UserModel.register(payload);

      if (acceptsJsonOnly) {
        return res.status(201).json({
          status: 'success',
          message: 'Account registered successfully.',
          data: newUser
        });
      }

      const welcomeMsg = encodeURIComponent(
        `Welcome to Alumly, ${newUser.name}! Your ${newUser.role} account has been created.`
      );
      return res.redirect(`/users?msg=${welcomeMsg}&type=success`);
    } catch (err) {
      const statusCode = err.statusCode && err.statusCode < 500 ? err.statusCode : 400;

      if (acceptsJsonOnly) {
        return res.status(statusCode).json({
          status: 'error',
          message: err.message,
          errors: err.validationErrors || [err.message]
        });
      }

      // Re-render form with inline glass alert while preserving non-sensitive user inputs
      const safeValues = {
        name: payload.name || '',
        email: payload.email || '',
        role: payload.role === 'student' ? 'student' : 'alumni',
        department: payload.department || '',
        graduationYear: payload.graduationYear || '',
        company: payload.company || '',
        jobTitle: payload.jobTitle || '',
        linkedinUrl: payload.linkedinUrl || ''
      };

      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.status(statusCode).send(
        AuthViews.renderRegisterPage({
          error: err.message,
          errors: err.validationErrors || [err.message],
          values: safeValues
        })
      );
    }
  }
}

module.exports = AuthController;
