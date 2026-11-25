/**
 * User Web / MVC Routes
 * 
 * Maps all web CRUD operations for users to UserController with full View Layer support:
 * - Read (List): GET /users
 * - Create: POST /users
 * - Read (Detail): GET /users/:id
 * - Update (Form): GET /users/:id/edit
 * - Update (Full): PUT /users/:id & POST /users/:id/edit
 * - Update (Partial): PATCH /users/:id
 * - Delete: DELETE /users/:id & POST /users/:id/delete
 */

const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const asyncHandler = require('../middlewares/asyncHandler');
const {
  requireAuth,
  requireRole,
  requireOwnerOrAdmin
} = require('../middlewares/authMiddleware');

// 1. READ (Public Alumni Directory browsing)
router.get('/users', asyncHandler(UserController.getAllUsers));

// 2. CREATE (Admin-only direct user record creation from directory)
router.post('/users', requireAuth, requireRole('admin'), asyncHandler(UserController.createUser));

// 3. READ (Single User Profile View — requires authentication)
router.get('/users/:id', requireAuth, asyncHandler(UserController.getUserById));

// 4. UPDATE (Edit Form View — profile owner or Admin only)
router.get('/users/:id/edit', requireAuth, requireOwnerOrAdmin, asyncHandler(UserController.renderEditForm));

// 5. UPDATE (Full Replacement Action — profile owner or Admin only)
router.put('/users/:id', requireAuth, requireOwnerOrAdmin, asyncHandler(UserController.updateUserPut));
router.post('/users/:id/edit', requireAuth, requireOwnerOrAdmin, asyncHandler(UserController.updateUserPut));
router.post('/users/:id/update', requireAuth, requireOwnerOrAdmin, asyncHandler(UserController.updateUserPut));

// 6. UPDATE (Partial Modification Action — profile owner or Admin only)
router.patch('/users/:id', requireAuth, requireOwnerOrAdmin, asyncHandler(UserController.updateUserPatch));

// 7. DELETE (Delete Action — profile owner or Admin only)
router.delete('/users/:id', requireAuth, requireOwnerOrAdmin, asyncHandler(UserController.deleteUser));
router.post('/users/:id/delete', requireAuth, requireOwnerOrAdmin, asyncHandler(UserController.deleteUser));

module.exports = router;
