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

// 1. READ (List View with embedded Create Form)
router.get('/users', UserController.getAllUsers);

// 2. CREATE (Process form submission -> Success View)
router.post('/users', UserController.createUser);

// 3. READ (Single User Profile View)
router.get('/users/:id', UserController.getUserById);

// 4. UPDATE (Edit Form View)
router.get('/users/:id/edit', UserController.renderEditForm);

// 5. UPDATE (Full Replacement Action -> Updated View)
router.put('/users/:id', UserController.updateUserPut);
router.post('/users/:id/edit', UserController.updateUserPut);
router.post('/users/:id/update', UserController.updateUserPut);

// 6. UPDATE (Partial Modification Action -> Updated View)
router.patch('/users/:id', UserController.updateUserPatch);

// 7. DELETE (Delete Action -> Deleted View)
router.delete('/users/:id', UserController.deleteUser);
router.post('/users/:id/delete', UserController.deleteUser);

module.exports = router;
