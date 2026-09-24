const express = require('express');
const cors = require('cors');
require('dotenv').config();

const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Essential middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount routes
app.use('/', routes);

// System health check endpoint (for Docker / DevOps monitoring)
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Alumni Tracking System API is running healthy',
    timestamp: new Date().toISOString()
  });
});

// Modularity: Start server if executed directly, export app for testing
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
