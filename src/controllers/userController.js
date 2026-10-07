/**
 * User Controller (Web & Presentation MVC Controller)
 * 
 * Manages web-facing user endpoints (/users, /users/:id).
 * Directly connects to the HTML View Layer (HtmlViews) for browser rendering,
 * while maintaining content negotiation for automated HTTP clients.
 * Implements complete CRUD functions (Create, Read, Update, Delete).
 */

const UserModel = require('../models/userModel');
const HtmlViews = require('../views/htmlViews');

class UserController {
  /**
   * GET /users
   * View Layer Route: Renders the Alumni Directory HTML page (with registration form)
   * or emits JSON array for programmatic clients.
   */
  static getAllUsers(req, res) {
    try {
      const users = UserModel.findAll(req.query);
      const isHtml = req.headers.accept && req.headers.accept.includes('text/html');

      // Content negotiation: Return HTML view for browser clients
      if (isHtml || !req.headers.accept || req.headers.accept.includes('*/*')) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.status(200).send(HtmlViews.renderUsersList(users));
      }

      return res.status(200).json({
        status: 'success',
        count: users.length,
        data: users
      });
    } catch (err) {
      const isHtml = req.headers.accept && req.headers.accept.includes('text/html');
      if (isHtml) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.status(500).send(HtmlViews.renderUserError(err.message || 'Internal server error.'));
      }
      return res.status(500).json({
        status: 'error',
        message: err.message || 'Internal server error while fetching users.'
      });
    }
  }

  /**
   * POST /users
   * View Layer Route: Processes web registration form submission and renders
   * the HTML success view or error alert (or returns JSON 201 for API clients).
   */
  static createUser(req, res) {
    const isHtml = req.headers.accept && req.headers.accept.includes('text/html');
    const name = req.body?.name || req.query?.name;
    const email = req.body?.email || req.query?.email;
    const role = req.body?.role || req.query?.role;
    const graduationYear = req.body?.graduationYear || req.query?.graduationYear;
    const department = req.body?.department || req.query?.department;
    const phone = req.body?.phone || req.query?.phone;
    const company = req.body?.company || req.query?.company;
    const jobTitle = req.body?.jobTitle || req.query?.jobTitle;

    // Validation: name and email required
    if (!name || !email) {
      if (isHtml) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.status(400).send(HtmlViews.renderUserError('Name and email are required fields.'));
      }
      return res.status(400).json({
        status: 'error',
        message: 'Name and email are required fields.'
      });
    }

    // Check email uniqueness
    const existingUser = UserModel.findByEmail(email);
    if (existingUser) {
      if (isHtml) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.status(409).send(HtmlViews.renderUserError('A user with this email already exists.'));
      }
      return res.status(409).json({
        status: 'error',
        message: 'A user with this email already exists.'
      });
    }

    try {
      const newUser = UserModel.create({
        name,
        email,
        role,
        department,
        graduationYear,
        phone,
        company,
        jobTitle
      });

      // View layer response for browsers / web forms
      if (isHtml) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.status(201).send(HtmlViews.renderUserCreatedSuccess(newUser));
      }

      return res.status(201).json({
        status: 'success',
        message: 'User created successfully',
        data: newUser
      });
    } catch (err) {
      if (isHtml) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.status(err.statusCode || 400).send(HtmlViews.renderUserError(err.message));
      }
      return res.status(err.statusCode || 400).json({
        status: 'error',
        message: err.message
      });
    }
  }

  /**
   * GET /users/:id
   * View Layer Route: Retrieves single user profile as HTML view or JSON.
   */
  static getUserById(req, res) {
    const userId = parseInt(req.params.id, 10);
    const isHtml = req.headers.accept && req.headers.accept.includes('text/html');

    if (isNaN(userId)) {
      if (isHtml) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.status(400).send(HtmlViews.renderUserError('User ID must be a valid integer.'));
      }
      return res.status(400).json({
        status: 'error',
        message: 'User ID must be a valid integer.'
      });
    }

    const user = UserModel.findById(userId);
    if (!user) {
      if (isHtml) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.status(404).send(HtmlViews.renderUserError(`User with ID ${userId} not found.`));
      }
      return res.status(404).json({
        status: 'error',
        message: `User with ID ${userId} not found.`
      });
    }

    if (isHtml) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.status(200).send(HtmlViews.renderUserProfile(user));
    }

    return res.status(200).json({
      status: 'success',
      data: user
    });
  }

  /**
   * PUT /users/:id
   * Update (U) - Fully updates/replaces an existing user record.
   */
  static updateUserPut(req, res) {
    const userId = parseInt(req.params.id, 10);
    if (isNaN(userId)) {
      return res.status(400).json({
        status: 'error',
        message: 'User ID must be a valid integer.'
      });
    }

    const existingUser = UserModel.findById(userId);
    if (!existingUser) {
      return res.status(404).json({
        status: 'error',
        message: `User with ID ${userId} not found.`
      });
    }

    const name = req.body?.name || req.query?.name;
    const email = req.body?.email || req.query?.email;
    const role = req.body?.role || req.query?.role;
    const graduationYear = req.body?.graduationYear || req.query?.graduationYear;
    const department = req.body?.department || req.query?.department;
    const phone = req.body?.phone || req.query?.phone;
    const company = req.body?.company || req.query?.company;
    const jobTitle = req.body?.jobTitle || req.query?.jobTitle;

    if (!name || !email) {
      return res.status(400).json({
        status: 'error',
        message: 'PUT request requires both name and email for full update.'
      });
    }

    const emailOwner = UserModel.findByEmail(email);
    if (emailOwner && emailOwner.id !== userId) {
      return res.status(409).json({
        status: 'error',
        message: 'Email address is already in use by another user.'
      });
    }

    try {
      const updatedUser = UserModel.update(userId, {
        name,
        email,
        role,
        department,
        graduationYear,
        phone,
        company,
        jobTitle
      });

      return res.status(200).json({
        status: 'success',
        message: 'User completely updated successfully (PUT)',
        data: updatedUser
      });
    } catch (err) {
      return res.status(err.statusCode || 400).json({
        status: 'error',
        message: err.message
      });
    }
  }

  /**
   * PATCH /users/:id
   * Update (U) - Partially updates specific fields of an existing user.
   */
  static updateUserPatch(req, res) {
    const userId = parseInt(req.params.id, 10);
    if (isNaN(userId)) {
      return res.status(400).json({
        status: 'error',
        message: 'User ID must be a valid integer.'
      });
    }

    const existingUser = UserModel.findById(userId);
    if (!existingUser) {
      return res.status(404).json({
        status: 'error',
        message: `User with ID ${userId} not found.`
      });
    }

    const name = req.body?.name || req.query?.name;
    const email = req.body?.email || req.query?.email;
    const role = req.body?.role || req.query?.role;
    const graduationYear = req.body?.graduationYear || req.query?.graduationYear;
    const department = req.body?.department || req.query?.department;
    const phone = req.body?.phone || req.query?.phone;
    const company = req.body?.company || req.query?.company;
    const jobTitle = req.body?.jobTitle || req.query?.jobTitle;

    if (email) {
      const emailOwner = UserModel.findByEmail(email);
      if (emailOwner && emailOwner.id !== userId) {
        return res.status(409).json({
          status: 'error',
          message: 'Email address is already in use by another user.'
        });
      }
    }

    const patchPayload = {};
    if (name !== undefined) patchPayload.name = name;
    if (email !== undefined) patchPayload.email = email;
    if (role !== undefined) patchPayload.role = role;
    if (department !== undefined) patchPayload.department = department;
    if (graduationYear !== undefined) patchPayload.graduationYear = graduationYear;
    if (phone !== undefined) patchPayload.phone = phone;
    if (company !== undefined) patchPayload.company = company;
    if (jobTitle !== undefined) patchPayload.jobTitle = jobTitle;

    try {
      const updatedUser = UserModel.patch(userId, patchPayload);

      return res.status(200).json({
        status: 'success',
        message: 'User partially updated successfully (PATCH)',
        data: updatedUser
      });
    } catch (err) {
      return res.status(err.statusCode || 400).json({
        status: 'error',
        message: err.message
      });
    }
  }

  /**
   * DELETE /users/:id
   * Delete (D) - Deletes an existing user record.
   */
  static deleteUser(req, res) {
    const userId = parseInt(req.params.id, 10);
    if (isNaN(userId)) {
      return res.status(400).json({
        status: 'error',
        message: 'User ID must be a valid integer.'
      });
    }

    const deletedUser = UserModel.delete(userId);
    if (!deletedUser) {
      return res.status(404).json({
        status: 'error',
        message: `User with ID ${userId} not found.`
      });
    }

    return res.status(200).json({
      status: 'success',
      message: `User with ID ${userId} has been successfully deleted.`,
      data: deletedUser
    });
  }
}

// REST Resource Aliases
UserController.index = UserController.getAllUsers;
UserController.show = UserController.getUserById;
UserController.create = UserController.createUser;
UserController.update = UserController.updateUserPut;
UserController.patch = UserController.updateUserPatch;
UserController.delete = UserController.deleteUser;

module.exports = UserController;
