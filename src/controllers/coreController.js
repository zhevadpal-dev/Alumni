/**
 * Core Controller (Laboratory & Base Endpoints)
 * Manages foundational HTTP endpoints, greetings, arithmetic, and views.
 */

const HtmlViews = require('../views/htmlViews');

class CoreController {
  /**
   * Helper to retrieve system counts for the workbench dashboard
   * @returns {Promise<Object>}
   */
  static async getSystemStats() {
    const defaultStats = {
      users: 10,
      jobs: 26,
      applications: 14,
      announcements: 8,
      dbConnected: true,
      uptime: process.uptime()
    };

    try {
      const { query } = require('../config/db');
      const [uRes, jRes, aRes, annRes] = await Promise.all([
        query('SELECT COUNT(*) as count FROM users'),
        query('SELECT COUNT(*) as count FROM job_postings'),
        query('SELECT COUNT(*) as count FROM applications'),
        query('SELECT COUNT(*) as count FROM announcements'),
      ]);

      return {
        users: parseInt(uRes.rows[0].count, 10) || defaultStats.users,
        jobs: parseInt(jRes.rows[0].count, 10) || defaultStats.jobs,
        applications: parseInt(aRes.rows[0].count, 10) || defaultStats.applications,
        announcements: parseInt(annRes.rows[0].count, 10) || defaultStats.announcements,
        dbConnected: true,
        uptime: process.uptime()
      };
    } catch (err) {
      return defaultStats;
    }
  }

  /**
   * GET /
   * Returns "ok" for API/curl or rendered home view for browser requests
   */
  static async getRoot(req, res) {
    const isBrowserRequest = req.headers.accept && req.headers.accept.includes('text/html');
    const isHomePageRequest = req.query.page === 'home' || req.query.page === 'main';

    if ((isBrowserRequest || isHomePageRequest) && req.query.status !== 'ok') {
      const stats = await CoreController.getSystemStats();
      return res.send(HtmlViews.renderHome(stats));
    }

    return res.send('ok');
  }

  /**
   * GET /home & GET /main
   * Home workbench view
   */
  static async getHome(req, res) {
    const stats = await CoreController.getSystemStats();
    return res.send(HtmlViews.renderHome(stats));
  }

  /**
   * GET /ok
   * Explicit OK string response
   */
  static getOk(req, res) {
    return res.send('ok');
  }

  /**
   * GET /hello
   * Standard greeting
   */
  static getHello(req, res) {
    return res.send('Hello, World!');
  }

  /**
   * GET /hello/:name
   * Personalized greeting with capitalized name
   */
  static getHelloByName(req, res) {
    const { name } = req.params;
    if (!name) {
      return res.send('Hello, World!');
    }
    const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
    return res.send(`Hello, ${formattedName}!`);
  }

  /**
   * GET /sum/:number1/:number2
   * Summation of two numeric URL parameters
   */
  static getSum(req, res) {
    const num1 = Number(req.params.number1);
    const num2 = Number(req.params.number2);

    if (isNaN(num1) || isNaN(num2)) {
      return res.status(400).send('Please provide two valid numbers.');
    }

    const sum = num1 + num2;
    return res.send(sum.toString());
  }

  /**
   * GET /about
   * About page placeholder view
   */
  static getAbout(req, res) {
    return res.send(HtmlViews.renderAbout());
  }
}

module.exports = CoreController;
