const app = require('./src/app');
const { testConnection } = require('./src/config/db');
const { runMigrations } = require('./src/migrations/runner');

const PORT = process.env.PORT || 5001;

async function startServer() {
  try {
    // 1. Verify PostgreSQL connection and log success
    await testConnection();

    // 2. Ensure initial tables and seeds are migrated
    await runMigrations();
  } catch (err) {
    console.error('Warning: Database initialization encountered an error:', err.message);
  }

  // 3. Start listening for incoming HTTP connections
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}

startServer();
