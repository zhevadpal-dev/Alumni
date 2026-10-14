/**
 * User Controller (Web & Presentation MVC Controller)
 * 
 * Manages web-facing user endpoints (/users, /users/:id).
 * Implements complete CRUD operations with dedicated View Layer templates:
 * - Read: Lists users (renderUsersList) and single user profile (renderUserProfile)
 * - Create: Processes web registration and renders confirmation (renderUserCreatedSuccess)
 * - Update: Renders edit form (renderUserEditForm) and update confirmation (renderUserUpdatedSuccess)
 * - Delete: Deletes user and renders confirmation (renderUserDeletedSuccess)
 * Maintains content-negotiation fallback to JSON for automated clients.
 */

const UserModel = require('../models/userModel');
const HtmlViews = require('../views/htmlViews');

class UserController {
  /**
   * GET /users
   * Read (R) - Lists users with view layer.
   */
  static async getAllUsers(req, res) {
    try {
      const users = await UserModel.findAll(req.query);
      const isHtml = req.headers.accept && req.headers.accept.includes('text/html');

      if (isHtml || !req.headers.accept || req.headers.accept.includes('*/*')) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.status(200).send(HtmlViews.renderUsersList(users, req.query));
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
   * GET /users/:id
   * Read (R) - Retrieves a single user profile with view layer.
   */
  static async getUserById(req, res) {
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

    try {
      const user = await UserModel.findById(userId);
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

      if (isHtml || !req.headers.accept || req.headers.accept.includes('*/*')) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.status(200).send(HtmlViews.renderUserProfile(user, req.query));
      }

      return res.status(200).json({
        status: 'success',
        data: user
      });
    } catch (err) {
      if (isHtml) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.status(500).send(HtmlViews.renderUserError(err.message));
      }
      return res.status(500).json({
        status: 'error',
        message: err.message || 'Internal server error.'
      });
    }
  }

  /**
   * GET /users/:id/edit
   * Update (U) - View Layer: Renders the edit form populated with current user data.
   */
  static async renderEditForm(req, res) {
    const userId = parseInt(req.params.id, 10);
    const isHtml = req.headers.accept && req.headers.accept.includes('text/html');

    if (isNaN(userId)) {
      if (isHtml) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.status(400).send(HtmlViews.renderUserError('User ID must be a valid integer.'));
      }
      return res.status(400).json({ status: 'error', message: 'User ID must be a valid integer.' });
    }

    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        if (isHtml) {
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          return res.status(404).send(HtmlViews.renderUserError(`User with ID ${userId} not found.`));
        }
        return res.status(404).json({ status: 'error', message: `User with ID ${userId} not found.` });
      }

      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.status(200).send(HtmlViews.renderUserEditForm(user, req.query));
    } catch (err) {
      if (isHtml) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.status(500).send(HtmlViews.renderUserError(err.message));
      }
      return res.status(500).json({ status: 'error', message: err.message });
    }
  }

  /**
   * POST /users
   * Create (C) - Processes new user creation with view layer.
   */
  static async createUser(req, res) {
    const isHtml = req.headers.accept && req.headers.accept.includes('text/html');
    const name = req.body?.name || req.query?.name;
    const email = req.body?.email || req.query?.email;
    const role = req.body?.role || req.query?.role;
    const graduationYear = req.body?.graduationYear || req.query?.graduationYear;
    const department = req.body?.department || req.query?.department;
    const phone = req.body?.phone || req.query?.phone;
    const company = req.body?.company || req.query?.company;
    const jobTitle = req.body?.jobTitle || req.query?.jobTitle;

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

    try {
      const newUser = await UserModel.create({
        name,
        email,
        role,
        department,
        graduationYear,
        phone,
        company,
        jobTitle
      });

      if (isHtml) {
        if (req.query.view === 'card') {
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          return res.status(201).send(HtmlViews.renderUserCreatedSuccess(newUser));
        }
        return res.redirect(`/users?msg=User%20%22${encodeURIComponent(newUser.name)}%22%20created%20successfully!&type=success`);
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
   * PUT /users/:id & POST /users/:id/edit
   * Update (U) - Fully updates user record and renders update view.
   */
  static async updateUserPut(req, res) {
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

    const name = req.body?.name || req.query?.name;
    const email = req.body?.email || req.query?.email;
    const role = req.body?.role || req.query?.role;
    const graduationYear = req.body?.graduationYear || req.query?.graduationYear;
    const department = req.body?.department || req.query?.department;
    const phone = req.body?.phone || req.query?.phone;
    const company = req.body?.company || req.query?.company;
    const jobTitle = req.body?.jobTitle || req.query?.jobTitle;

    if (!name || !email) {
      if (isHtml) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.status(400).send(HtmlViews.renderUserError('PUT request requires both name and email.', `/users/${userId}/edit`));
      }
      return res.status(400).json({
        status: 'error',
        message: 'PUT request requires both name and email for full update.'
      });
    }

    try {
      const updatedUser = await UserModel.update(userId, {
        name,
        email,
        role,
        department,
        graduationYear,
        phone,
        company,
        jobTitle
      });

      if (!updatedUser) {
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
        if (req.query.view === 'card') {
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          return res.status(200).send(HtmlViews.renderUserUpdatedSuccess(updatedUser));
        }
        return res.redirect(`/users/${userId}?msg=User%20%22${encodeURIComponent(updatedUser.name)}%22%20updated%20successfully!&type=success`);
      }

      return res.status(200).json({
        status: 'success',
        message: 'User completely updated successfully (PUT)',
        data: updatedUser
      });
    } catch (err) {
      if (isHtml) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.status(err.statusCode || 400).send(HtmlViews.renderUserError(err.message, `/users/${userId}/edit`));
      }
      return res.status(err.statusCode || 400).json({
        status: 'error',
        message: err.message
      });
    }
  }

  /**
   * PATCH /users/:id
   * Update (U) - Partially updates specific user fields with view layer.
   */
  static async updateUserPatch(req, res) {
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

    const name = req.body?.name || req.query?.name;
    const email = req.body?.email || req.query?.email;
    const role = req.body?.role || req.query?.role;
    const graduationYear = req.body?.graduationYear || req.query?.graduationYear;
    const department = req.body?.department || req.query?.department;
    const phone = req.body?.phone || req.query?.phone;
    const company = req.body?.company || req.query?.company;
    const jobTitle = req.body?.jobTitle || req.query?.jobTitle;

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
      const updatedUser = await UserModel.patch(userId, patchPayload);

      if (!updatedUser) {
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
        return res.status(200).send(HtmlViews.renderUserUpdatedSuccess(updatedUser));
      }

      return res.status(200).json({
        status: 'success',
        message: 'User partially updated successfully (PATCH)',
        data: updatedUser
      });
    } catch (err) {
      if (isHtml) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.status(err.statusCode || 400).send(HtmlViews.renderUserError(err.message, `/users/${userId}/edit`));
      }
      return res.status(err.statusCode || 400).json({
        status: 'error',
        message: err.message
      });
    }
  }

  /**
   * DELETE /users/:id & POST /users/:id/delete
   * Delete (D) - Deletes an existing user record and renders delete confirmation view.
   */
  static async deleteUser(req, res) {
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

    try {
      const deletedUser = await UserModel.delete(userId);
      if (!deletedUser) {
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
        if (req.query.view === 'card') {
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          return res.status(200).send(HtmlViews.renderUserDeletedSuccess(deletedUser));
        }
        return res.redirect(`/users?msg=User%20%22${encodeURIComponent(deletedUser.name)}%22%20deleted%20successfully&type=success`);
      }

      return res.status(200).json({
        status: 'success',
        message: `User with ID ${userId} has been successfully deleted.`,
        data: deletedUser
      });
    } catch (err) {
      if (isHtml) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.status(500).send(HtmlViews.renderUserError(err.message || 'Internal server error.'));
      }
      return res.status(500).json({
        status: 'error',
        message: err.message || 'Internal server error.'
      });
    }
  }
}

// REST Resource Aliases
UserController.index = UserController.getAllUsers;
UserController.show = UserController.getUserById;
UserController.create = UserController.createUser;
UserController.edit = UserController.renderEditForm;
UserController.update = UserController.updateUserPut;
UserController.patch = UserController.updateUserPatch;
UserController.destroy = UserController.deleteUser;

module.exports = UserController;
