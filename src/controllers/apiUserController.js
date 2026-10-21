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
  static async getAllUsers(req, res) {
    try {
      const users = await UserModel.findAll(req.query);
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
  static async getUserById(req, res) {
    const userId = parseInt(req.params.id, 10);
    if (isNaN(userId)) {
      return res.status(400).json({
        status: 'error',
        message: 'User ID must be a valid integer.'
      });
    }

    try {
      const user = await UserModel.findById(userId);
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
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message || 'Internal server error while fetching user.'
      });
    }
  }

  /**
   * POST /api/users
   * Create a new user record in PostgreSQL.
   */
  static async createUser(req, res) {
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
  static async updateUserPut(req, res) {
    const userId = parseInt(req.params.id, 10);
    if (isNaN(userId)) {
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
        return res.status(404).json({
          status: 'error',
          message: `User with ID ${userId} not found.`
        });
      }

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
  static async updateUserPatch(req, res) {
    const userId = parseInt(req.params.id, 10);
    if (isNaN(userId)) {
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
        return res.status(404).json({
          status: 'error',
          message: `User with ID ${userId} not found.`
        });
      }

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
  static async deleteUser(req, res) {
    const userId = parseInt(req.params.id, 10);
    if (isNaN(userId)) {
      return res.status(400).json({
        status: 'error',
        message: 'User ID must be a valid integer.'
      });
    }

    try {
      const deletedUser = await UserModel.delete(userId);
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
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message || 'Internal server error while deleting user.'
      });
    }
  }

  // ==========================================
  // RELATIONAL SUB-ROUTES
  // ==========================================

  /**
   * GET /api/users/:id/announcements
   * Retrieve all announcements authored by a specific user.
   */
  static async getUserAnnouncements(req, res) {
    const userId = parseInt(req.params.id, 10);
    if (isNaN(userId)) {
      return res.status(400).json({
        status: 'error',
        message: 'User ID must be a valid integer.'
      });
    }

    try {
      const exists = await UserModel.exists(userId);
      if (!exists) {
        return res.status(404).json({
          status: 'error',
          message: `User with ID ${userId} not found.`
        });
      }

      const announcements = await UserModel.getAnnouncements(userId, req.query);
      return res.status(200).json({
        status: 'success',
        userId,
        count: announcements.length,
        data: announcements
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message || 'Internal server error while fetching user announcements.'
      });
    }
  }

  /**
   * GET /api/users/:id/jobs
   * Retrieve all job postings created by a specific user.
   */
  static async getUserJobs(req, res) {
    const userId = parseInt(req.params.id, 10);
    if (isNaN(userId)) {
      return res.status(400).json({
        status: 'error',
        message: 'User ID must be a valid integer.'
      });
    }

    try {
      const exists = await UserModel.exists(userId);
      if (!exists) {
        return res.status(404).json({
          status: 'error',
          message: `User with ID ${userId} not found.`
        });
      }

      const jobs = await UserModel.getJobPostings(userId, req.query);
      return res.status(200).json({
        status: 'success',
        userId,
        count: jobs.length,
        data: jobs
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message || 'Internal server error while fetching user job postings.'
      });
    }
  }

  /**
   * GET /api/users/:id/relations
   * Retrieve full user profile with eager-loaded announcements and jobPostings.
   */
  static async getUserRelations(req, res) {
    const userId = parseInt(req.params.id, 10);
    if (isNaN(userId)) {
      return res.status(400).json({
        status: 'error',
        message: 'User ID must be a valid integer.'
      });
    }

    try {
      const user = await UserModel.findByIdWithRelations(userId);
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
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message || 'Internal server error while fetching user relations.'
      });
    }
  }

  /**
   * GET /api/users/:id/applications
   * Retrieve all job applications submitted by a specific user.
   */
  static async getUserApplications(req, res) {
    const userId = parseInt(req.params.id, 10);
    if (isNaN(userId)) {
      return res.status(400).json({
        status: 'error',
        message: 'User ID must be a valid integer.'
      });
    }

    try {
      const exists = await UserModel.exists(userId);
      if (!exists) {
        return res.status(404).json({
          status: 'error',
          message: `User with ID ${userId} not found.`
        });
      }

      const applications = await UserModel.getApplications(userId, req.query);
      return res.status(200).json({
        status: 'success',
        userId,
        count: applications.length,
        data: applications
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message || 'Internal server error while fetching user applications.'
      });
    }
  }

  /**
   * GET /api/users/:id/applied-jobs
   * Retrieve all job postings that a specific user has applied to (Many-to-Many).
   */
  static async getUserAppliedJobs(req, res) {
    const userId = parseInt(req.params.id, 10);
    if (isNaN(userId)) {
      return res.status(400).json({
        status: 'error',
        message: 'User ID must be a valid integer.'
      });
    }

    try {
      const exists = await UserModel.exists(userId);
      if (!exists) {
        return res.status(404).json({
          status: 'error',
          message: `User with ID ${userId} not found.`
        });
      }

      const jobs = await UserModel.getAppliedJobs(userId, req.query);
      return res.status(200).json({
        status: 'success',
        userId,
        count: jobs.length,
        data: jobs
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message || 'Internal server error while fetching user applied jobs.'
      });
    }
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
