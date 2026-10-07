/**
 * API User Controller (RESTful JSON Endpoints)
 * 
 * Exclusively handles API requests targeting `/api/users`.
 * Performs input parsing, delegates CRUD actions to UserModel, and emits standard JSON payloads.
 */

const UserModel = require('../models/userModel');

class ApiUserController {
  /**
   * GET /api/users
   * List all user records with optional filter, search, and pagination.
   */
  static getAllUsers(req, res) {
    try {
      const users = UserModel.findAll(req.query);
      return res.status(200).json({
        status: 'success',
        count: users.length,
        data: users
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message || 'Internal server error while fetching users.'
      });
    }
  }

  /**
   * GET /api/users/:id
   * Retrieve a single user record by numeric ID.
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
   * Create a new user record in the in-memory store.
   */
  static createUser(req, res) {
    const name = req.body?.name || req.query?.name;
    const email = req.body?.email || req.query?.email;
    const role = req.body?.role || req.query?.role;
    const graduationYear = req.body?.graduationYear || req.query?.graduationYear;
    const department = req.body?.department || req.query?.department;
    const phone = req.body?.phone || req.query?.phone;
    const company = req.body?.company || req.query?.company;
    const jobTitle = req.body?.jobTitle || req.query?.jobTitle;

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

      return res.status(201).json({
        status: 'success',
        message: 'User created successfully',
        data: newUser
      });
    } catch (err) {
      return res.status(err.statusCode || 400).json({
        status: 'error',
        message: err.message
      });
    }
  }

  /**
   * PUT /api/users/:id
   * Fully update/replace an existing user record.
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

    // Check unique email conflict
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
   * PATCH /api/users/:id
   * Partially update specific fields of an existing user record.
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

    // Check unique email conflict if changing email
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
   * DELETE /api/users/:id
   * Delete an existing user record by numeric ID.
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

// REST Resource Aliases for standard MVC frameworks
ApiUserController.index = ApiUserController.getAllUsers;
ApiUserController.show = ApiUserController.getUserById;
ApiUserController.store = ApiUserController.createUser;
ApiUserController.update = ApiUserController.updateUserPut;
ApiUserController.patch = ApiUserController.updateUserPatch;
ApiUserController.destroy = ApiUserController.deleteUser;

module.exports = ApiUserController;
