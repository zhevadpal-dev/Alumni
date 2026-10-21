/**
 * Web Application Tracking Routes
 * 
 * Maps web UI / management endpoints (/applications) to ApplicationController.
 */

const express = require('express');
const router = express.Router();
const ApplicationController = require('../controllers/applicationController');

// 1. READ (List view dashboard with summary metrics & registration form)
router.get('/applications', ApplicationController.list);

// 2. CREATE (Direct registration form submission)
router.post('/applications', ApplicationController.create);

// 3. READ (Single application dossier view)
router.get('/applications/:id', ApplicationController.detail);

// 4. UPDATE (Advance application review status)
router.post('/applications/:id/status', ApplicationController.updateStatus);
router.put('/applications/:id/status', ApplicationController.updateStatus);

// 5. DELETE (Withdraw or remove application record)
router.post('/applications/:id/delete', ApplicationController.deleteAction);
router.delete('/applications/:id', ApplicationController.deleteAction);

module.exports = router;
