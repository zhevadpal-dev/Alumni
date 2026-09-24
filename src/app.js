const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Sağlık kontrolü (Healthcheck endpoint)
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Alumni Tracking System API is running healthy',
    timestamp: new Date().toISOString()
  });
});

// Temel karşılama rotası
app.get('/', (req, res) => {
  res.send('Alumni Tracking System Backend API');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
