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

  const migrationFiles = fs.readdirSync(__dirname)
    .filter(file => file.endsWith('.sql'))
    .sort();

  console.log(`Discovered ${migrationFiles.length} migration file(s): ${migrationFiles.join(', ')}`);

  for (const file of migrationFiles) {
    const filePath = path.join(__dirname, file);
    console.log(`Executing migration: ${file}...`);
    const sql = fs.readFileSync(filePath, 'utf8');
    await pool.query(sql);
    console.log(`✓ Migration ${file} applied successfully.`);
  }

  // Verify counts
  const usersCountRes = await pool.query('SELECT COUNT(*) FROM users');
  const announcementsCountRes = await pool.query('SELECT COUNT(*) FROM announcements');
  let jobPostingsCount = 0;
  try {
    const jobPostingsCountRes = await pool.query('SELECT COUNT(*) FROM job_postings');
    jobPostingsCount = jobPostingsCountRes.rows[0].count;
  } catch (_) {}

  let applicationsCount = 0;
  try {
    const applicationsCountRes = await pool.query('SELECT COUNT(*) FROM applications');
    applicationsCount = applicationsCountRes.rows[0].count;
  } catch (_) {}

  console.log(`✓ All migrations applied successfully.`);
  console.log(`--- Migration Summary ---`);
  console.log(`  - Total Users in DB: ${usersCountRes.rows[0].count}`);
  console.log(`  - Total Announcements in DB: ${announcementsCountRes.rows[0].count}`);
  console.log(`  - Total Job Postings in DB: ${jobPostingsCount}`);
  console.log(`  - Total Applications in DB: ${applicationsCount}`);
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
