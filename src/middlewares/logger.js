/**
 * Request Logger Middleware
 * 
 * Intercepts every incoming HTTP request and outputs a clean single-line log
 * to the terminal in the format:
 * [time] [method] [route] [res.type] [duration]
 * 
 * Example:
 * 10:20:30 POST /users 201 18ms
 * 10:20:35 GET /api/announcements 200 12ms
 */

function formatTime(date = new Date()) {
  const pad = (n) => String(n).padStart(2, '0');
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  return `${hours}:${minutes}:${seconds}`;
}

function requestLogger(req, res, next) {
  const start = process.hrtime.bigint();
  const requestTime = formatTime();

  res.on('finish', () => {
    const end = process.hrtime.bigint();
    const duration = Math.round(Number(end - start) / 1e6);
    const method = req.method;
    const route = req.originalUrl || req.url;
    const statusCode = res.statusCode;

    console.log(`${requestTime} ${method} ${route} ${statusCode} ${duration}ms`);
  });

  next();
}

module.exports = requestLogger;
