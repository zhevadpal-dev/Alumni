/**
 * Core Routes (Laboratory & Base Endpoints)
 * Maps root, greeting, calculation, and view endpoints to CoreController.
 */

const express = require('express');
const router = express.Router();
const CoreController = require('../controllers/coreController');
const asyncHandler = require('../middlewares/asyncHandler');

// Base and HTML view routes
router.get('/', asyncHandler(CoreController.getRoot));
router.get(['/home', '/main'], asyncHandler(CoreController.getHome));
router.get('/ok', CoreController.getOk);
router.get('/hello', CoreController.getHello);
router.get('/hello/:name', CoreController.getHelloByName);
router.get('/sum/:number1/:number2', CoreController.getSum);
router.get('/about', CoreController.getAbout);

module.exports = router;
