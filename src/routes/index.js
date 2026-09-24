const express = require('express');
const router = express.Router();

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

module.exports = router;
