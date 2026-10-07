/**
 * Core Controller (Laboratory & Base Endpoints)
 * Manages foundational HTTP endpoints, greetings, arithmetic, and views.
 */

const HtmlViews = require('../views/htmlViews');

class CoreController {
  /**
   * GET /
   * Returns "ok" for API/curl or rendered home view for browser requests
   */
  static getRoot(req, res) {
    const isBrowserRequest = req.headers.accept && req.headers.accept.includes('text/html');
    const isHomePageRequest = req.query.page === 'home' || req.query.page === 'main';

    if ((isBrowserRequest || isHomePageRequest) && req.query.status !== 'ok') {
      return res.send(HtmlViews.renderHome());
    }

    return res.send('ok');
  }

  /**
   * GET /home & GET /main
   * Home placeholder view
   */
  static getHome(req, res) {
    return res.send(HtmlViews.renderHome());
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
