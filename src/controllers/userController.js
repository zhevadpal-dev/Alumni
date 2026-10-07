/**
 * User Controller (Business Logic & Request Orchestration)
 * Handles input parsing, validation, calls the User Model, and formats HTTP responses.
 */

const UserModel = require('../models/userModel');

class UserController {
  /**
   * GET /api/users
   * Returns list of all registered users
   */
  static getAllUsers(req, res) {
    const users = UserModel.findAll();
    return res.status(200).json({
      status: 'success',
      count: users.length,
      data: users
    });
  }

  /**
   * GET /api/users/:id
   * Retrieves single user record by ID
   */
  static getUserById(req, res) {
    const userId = parseInt(req.params.id, 10);
    if (isNaN(userId)) {
      return res.status(400).json({
        status: 'error',
        message: 'User ID must be a valid integer.'
      });
    }

    const user = UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: `User with ID ${userId} not found.`
      });
    }

    return res.status(200).json({
      status: 'success',
      data: user
    });
  }

  /**
   * POST /api/users
   * Creates a new user record
   */
  static createUser(req, res) {
    const name = req.body?.name || req.query?.name;
    const email = req.body?.email || req.query?.email;
    const role = req.body?.role || req.query?.role;
    const graduationYear = req.body?.graduationYear || req.query?.graduationYear;
    const department = req.body?.department || req.query?.department;

    // Validation: name and email are mandatory
    if (!name || !email) {
      return res.status(400).json({
        status: 'error',
        message: 'Name and email are required fields.'
      });
    }

    // Check unique email constraint
    const existingUser = UserModel.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        status: 'error',
        message: 'A user with this email already exists.'
      });
    }

    const newUser = UserModel.create({
      name,
      email,
      role,
      department,
      graduationYear
    });

    return res.status(201).json({
      status: 'success',
      message: 'User created successfully',
      data: newUser
    });
  }

  /**
   * PUT /api/users/:id
   * Full update/replacement of an existing user record
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

    if (!name || !email) {
      return res.status(400).json({
        status: 'error',
        message: 'PUT request requires both name and email for full update.'
      });
    }

    // Ensure email is not taken by another user
    const emailOwner = UserModel.findByEmail(email);
    if (emailOwner && emailOwner.id !== userId) {
      return res.status(409).json({
        status: 'error',
        message: 'Email address is already in use by another user.'
      });
    }

    const updatedUser = UserModel.update(userId, {
      name,
      email,
      role,
      department,
      graduationYear
    });

    return res.status(200).json({
      status: 'success',
      message: 'User completely updated successfully (PUT)',
      data: updatedUser
    });
  }

  /**
   * PATCH /api/users/:id
   * Partial update of an existing user record
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

    // Check unique email if updating email
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

    const updatedUser = UserModel.patch(userId, patchPayload);

    return res.status(200).json({
      status: 'success',
      message: 'User partially updated successfully (PATCH)',
      data: updatedUser
    });
  }

  /**
   * DELETE /api/users/:id
   * Deletes an existing user record by ID
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

module.exports = UserController;
