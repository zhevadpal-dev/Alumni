/**
 * Web Job Posting Routes
 * 
 * Maps web UI / management endpoints (/jobs) to JobController.
 */

const express = require('express');
const router = express.Router();
const JobController = require('../controllers/jobController');

// 1. READ (List view with search, filters, metrics, and quick-post form)
router.get('/jobs', JobController.list);

// 2. CREATE (Standalone creation form & POST action)
router.get('/jobs/new', JobController.newForm);
router.post('/jobs', JobController.create);

// 3. READ (Single job detail view with applicant list & apply form)
router.get('/jobs/:id', JobController.detail);

// 4. UPDATE (Edit form view & update actions)
router.get('/jobs/:id/edit', JobController.editForm);
router.post('/jobs/:id/edit', JobController.update);
router.put('/jobs/:id', JobController.update);

// 5. DELETE (Delete action via web form POST or DELETE verb)
router.post('/jobs/:id/delete', JobController.deleteAction);
router.delete('/jobs/:id', JobController.deleteAction);

// 6. APPLY (Candidate application submission from job detail view)
router.post('/jobs/:id/apply', JobController.apply);

module.exports = router;
