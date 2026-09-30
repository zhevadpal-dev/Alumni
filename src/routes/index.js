const express = require('express');
const router = express.Router();

// In-memory data store (temporary storage without database)
const users = [
  {
    id: 1,
    name: 'Sample Alumni',
    email: 'alumni@example.com',
    role: 'alumni',
    department: 'Computer Science',
    graduationYear: 2023,
    createdAt: new Date().toISOString()
  }
];

/**
 * GET /
 * Satisfies both route requirements:
 * 1) GET / -> returns "ok" (for API, automated test, and curl requests)
 * 2) GET / or home page -> returns temporary placeholder content ("temporary one main page")
 */
router.get('/', (req, res) => {
  // Check if request is from a browser accepting HTML or explicitly requesting home page
  const isBrowserRequest = req.headers.accept && req.headers.accept.includes('text/html');
  const isHomePageRequest = req.query.page === 'home' || req.query.page === 'main';

  if ((isBrowserRequest || isHomePageRequest) && req.query.status !== 'ok') {
    return res.send('temporary one main page');
  }

  // Return "ok" for API, test, or plain text requests
  res.send('ok');
});

/**
 * GET /home & GET /main
 * Temporary simple HTML / text for home page
 */
router.get(['/home', '/main'], (req, res) => {
  res.send('temporary one main page');
});

/**
 * GET /ok
 * Explicit endpoint returning "ok"
 */
router.get('/ok', (req, res) => {
  res.send('ok');
});

/**
 * GET /hello
 * Returns "Hello, World!"
 */
router.get('/hello', (req, res) => {
  res.send('Hello, World!');
});

/**
 * GET /hello/:name
 * Returns greeting based on parameter (e.g., /hello/emre -> "Hello, Emre!")
 */
router.get('/hello/:name', (req, res) => {
  const { name } = req.params;
  if (!name) {
    return res.send('Hello, World!');
  }
  // Capitalize the first letter of the name (e.g., emre -> Emre)
  const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
  res.send(`Hello, ${formattedName}!`);
});

/**
 * GET /sum/:number1/:number2
 * Calculates and returns the sum of two numbers
 */
router.get('/sum/:number1/:number2', (req, res) => {
  const num1 = Number(req.params.number1);
  const num2 = Number(req.params.number2);

  if (isNaN(num1) || isNaN(num2)) {
    return res.status(400).send('Please provide two valid numbers.');
  }

  const sum = num1 + num2;
  res.send(sum.toString());
});

/**
 * GET /about
 * Temporary about page ("temp. about page")
 */
router.get('/about', (req, res) => {
  res.send('temp. about page');
});

/**
 * GET /api/health & GET /health
 * Returns comprehensive system health information in JSON format
 */
router.get(['/api/health', '/health'], (req, res) => {
  const mem = process.memoryUsage();
  const uptimeSeconds = process.uptime();

  res.status(200).json({
    status: 'OK',
    healthy: true,
    message: 'Alumni Tracking System API is running healthy',
    timestamp: new Date().toISOString(),
    uptime: uptimeSeconds,
    uptimeFormatted: `${Math.floor(uptimeSeconds / 60)}m ${Math.floor(uptimeSeconds % 60)}s`,
    environment: process.env.NODE_ENV || 'development',
    service: 'Alumni Tracking System Backend',
    version: '1.0.0',
    system: {
      platform: process.platform,
      arch: process.arch,
      nodeVersion: process.version,
      pid: process.pid
    },
    memory: {
      rss: `${(mem.rss / 1024 / 1024).toFixed(2)} MB`,
      heapTotal: `${(mem.heapTotal / 1024 / 1024).toFixed(2)} MB`,
      heapUsed: `${(mem.heapUsed / 1024 / 1024).toFixed(2)} MB`,
      external: `${(mem.external / 1024 / 1024).toFixed(2)} MB`
    }
  });
});

/**
 * POST /api/users & POST /users
 * Adds a new user from form data or JSON body (in-memory store, no database yet)
 */
router.post(['/api/users', '/users'], (req, res) => {
  const name = req.body?.name || req.query?.name;
  const email = req.body?.email || req.query?.email;
  const role = req.body?.role || req.query?.role;
  const graduationYear = req.body?.graduationYear || req.query?.graduationYear;
  const department = req.body?.department || req.query?.department;

  // Validation: name and email are required
  if (!name || !email) {
    return res.status(400).json({
      status: 'error',
      message: 'Name and email are required fields.'
    });
  }

  // Check if email already exists
  const emailExists = users.some(u => u.email.toLowerCase() === email.trim().toLowerCase());
  if (emailExists) {
    return res.status(409).json({
      status: 'error',
      message: 'A user with this email already exists.'
    });
  }

  // Create new user object
  const newUser = {
    id: users.length + 1,
    name: name.trim(),
    email: email.trim(),
    role: role ? role.trim() : 'alumni',
    department: department ? department.trim() : null,
    graduationYear: graduationYear ? Number(graduationYear) : null,
    createdAt: new Date().toISOString()
  };

  // Store in memory
  users.push(newUser);

  return res.status(201).json({
    status: 'success',
    message: 'User created successfully',
    data: newUser
  });
});

/**
 * GET /api/users & GET /users
 * Returns list of all in-memory users
 */
router.get(['/api/users', '/users'], (req, res) => {
  res.status(200).json({
    status: 'success',
    count: users.length,
    data: users
  });
});

/**
 * GET /api/users/:id & GET /users/:id
 * Retrieves a single user by ID
 */
router.get(['/api/users/:id', '/users/:id'], (req, res) => {
  const userId = parseInt(req.params.id, 10);
  if (isNaN(userId)) {
    return res.status(400).json({
      status: 'error',
      message: 'User ID must be a valid integer.'
    });
  }

  const user = users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: `User with ID ${userId} not found.`
    });
  }

  res.status(200).json({
    status: 'success',
    data: user
  });
});

/**
 * PUT /api/users/:id & PUT /users/:id
 * Fully updates/replaces an existing user record
 */
router.put(['/api/users/:id', '/users/:id'], (req, res) => {
  const userId = parseInt(req.params.id, 10);
  if (isNaN(userId)) {
    return res.status(400).json({
      status: 'error',
      message: 'User ID must be a valid integer.'
    });
  }

  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex === -1) {
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

  // PUT requires full primary fields (name and email)
  if (!name || !email) {
    return res.status(400).json({
      status: 'error',
      message: 'PUT request requires both name and email for full update.'
    });
  }

  // Check if new email is already used by another user
  const emailInUse = users.some(u => u.id !== userId && u.email.toLowerCase() === email.trim().toLowerCase());
  if (emailInUse) {
    return res.status(409).json({
      status: 'error',
      message: 'Email address is already in use by another user.'
    });
  }

  // Update user record completely
  users[userIndex] = {
    ...users[userIndex],
    name: name.trim(),
    email: email.trim(),
    role: role ? role.trim() : 'alumni',
    department: department ? department.trim() : null,
    graduationYear: graduationYear ? Number(graduationYear) : null,
    updatedAt: new Date().toISOString()
  };

  return res.status(200).json({
    status: 'success',
    message: 'User completely updated successfully (PUT)',
    data: users[userIndex]
  });
});

/**
 * PATCH /api/users/:id & PATCH /users/:id
 * Partially updates an existing user record (only modifies provided fields)
 */
router.patch(['/api/users/:id', '/users/:id'], (req, res) => {
  const userId = parseInt(req.params.id, 10);
  if (isNaN(userId)) {
    return res.status(400).json({
      status: 'error',
      message: 'User ID must be a valid integer.'
    });
  }

  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex === -1) {
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

  // If email is being changed, check if it's taken by another user
  if (email) {
    const emailInUse = users.some(u => u.id !== userId && u.email.toLowerCase() === email.trim().toLowerCase());
    if (emailInUse) {
      return res.status(409).json({
        status: 'error',
        message: 'Email address is already in use by another user.'
      });
    }
  }

  // Update only provided fields
  const user = users[userIndex];
  if (name !== undefined) user.name = name.trim();
  if (email !== undefined) user.email = email.trim();
  if (role !== undefined) user.role = role.trim();
  if (department !== undefined) user.department = department.trim();
  if (graduationYear !== undefined) user.graduationYear = Number(graduationYear);
  user.updatedAt = new Date().toISOString();

  return res.status(200).json({
    status: 'success',
    message: 'User partially updated successfully (PATCH)',
    data: user
  });
});

module.exports = router;
