const express = require('express');
const cors = require('cors');
require('dotenv').config();

const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Temel ara yazılımlar (Middlewares)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotaları bağla
app.use('/', routes);

// Sistem sağlık kontrolü (Docker / DevOps için)
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Alumni Tracking System API is running healthy',
    timestamp: new Date().toISOString()
  });
});

// Modülerlik: Doğrudan çalıştırıldığında portu dinle, testlerde require edilebilsin
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
