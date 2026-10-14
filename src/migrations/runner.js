/**
 * Database Migration Runner
 * 
 * Executes pending SQL migration files against the PostgreSQL database.
 */

const fs = require('fs');
const path = require('path');
const { pool, testConnection } = require('../config/db');

async function runMigrations() {
  console.log('--- Running Database Migrations ---');
  await testConnection();

  const migrationFile = path.join(__dirname, '001_create_initial_tables.sql');
  const sql = fs.readFileSync(migrationFile, 'utf8');

  console.log(`Executing migration: ${path.basename(migrationFile)}...`);
  await pool.query(sql);

  // Verify counts
  const usersCountRes = await pool.query('SELECT COUNT(*) FROM users');
  const announcementsCountRes = await pool.query('SELECT COUNT(*) FROM announcements');

  console.log(`✓ Migration applied successfully.`);
  console.log(`  - Total Users in DB: ${usersCountRes.rows[0].count}`);
  console.log(`  - Total Announcements in DB: ${announcementsCountRes.rows[0].count}`);
  console.log('-----------------------------------');
}

// If executed directly from CLI: node src/migrations/runner.js
if (require.main === module) {
  runMigrations()
    .then(() => {
      console.log('Migrations completed successfully.');
      pool.end();
      process.exit(0);
    })
    .catch((err) => {
      console.error('Migration failed:', err);
      pool.end();
      process.exit(1);
    });
}

module.exports = { runMigrations };
