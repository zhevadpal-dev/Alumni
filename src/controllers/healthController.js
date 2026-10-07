/**
 * Health Controller (System Monitoring & Telemetry)
 * Gathers server runtime telemetry, uptime, memory, and environment details.
 */

class HealthController {
  /**
   * GET /api/health & GET /health
   * Returns comprehensive system health check in JSON format
   */
  static getHealth(req, res) {
    const mem = process.memoryUsage();
    const uptimeSeconds = process.uptime();

    return res.status(200).json({
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
  }
}

module.exports = HealthController;
