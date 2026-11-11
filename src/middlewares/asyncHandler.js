/**
 * Asynchronous Handler Wrapper
 * 
 * Wraps asynchronous Express route handlers to automatically catch any thrown
 * exceptions or rejected Promises and pass them directly to next(err).
 * 
 * @param {Function} fn - Async Express middleware / route handler (req, res, next)
 * @returns {Function} Express middleware function
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
