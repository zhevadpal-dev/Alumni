const express = require('express');
const router = express.Router();

/**
 * GET /
 * Tahtadaki iki gereksinimi de karşılar:
 * 1) GET / -> "ok" yanıtı dönsün (API / Test / curl istekleri için)
 * 2) GET / veya ana sayfa için geçici basit bir HTML/metin ("temporary one main page")
 */
router.get('/', (req, res) => {
  // Eğer tarayıcı üzerinden HTML talebi gelmişse veya query ile ana sayfa istenirse
  const isBrowserRequest = req.headers.accept && req.headers.accept.includes('text/html');
  const isHomePageRequest = req.query.page === 'home' || req.query.page === 'main';

  if ((isBrowserRequest || isHomePageRequest) && req.query.status !== 'ok') {
    return res.send('temporary one main page');
  }

  // API, test veya düz metin istekleri için "ok"
  res.send('ok');
});

/**
 * GET /home & GET /main
 * Ana sayfa için geçici basit bir HTML / metin
 */
router.get(['/home', '/main'], (req, res) => {
  res.send('temporary one main page');
});

/**
 * GET /ok
 * Açıkça "ok" yanıtı isteyen çağrılar için alternatif uç nokta
 */
router.get('/ok', (req, res) => {
  res.send('ok');
});

/**
 * GET /hello
 * "Hello, World!" yanıtı döner
 */
router.get('/hello', (req, res) => {
  res.send('Hello, World!');
});

/**
 * GET /hello/:name
 * Girilen isme göre selamlama yanıtı döner (Örn: /hello/emre -> "Hello, Emre!")
 */
router.get('/hello/:name', (req, res) => {
  const { name } = req.params;
  if (!name) {
    return res.send('Hello, World!');
  }
  // İsmin ilk harfini büyük yapar (emre -> Emre)
  const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
  res.send(`Hello, ${formattedName}!`);
});

/**
 * GET /sum/:number1/:number2
 * İki sayıyı toplayıp sonucunu döner
 */
router.get('/sum/:number1/:number2', (req, res) => {
  const num1 = Number(req.params.number1);
  const num2 = Number(req.params.number2);

  if (isNaN(num1) || isNaN(num2)) {
    return res.status(400).send('Lütfen geçerli iki sayı giriniz.');
  }

  const sum = num1 + num2;
  res.send(sum.toString());
});

/**
 * GET /about
 * Geçici hakkında sayfası ("temp. about page")
 */
router.get('/about', (req, res) => {
  res.send('temp. about page');
});

module.exports = router;
