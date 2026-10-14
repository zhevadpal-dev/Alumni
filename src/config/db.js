/**
 * Database Configuration & Connection Pool
 * 
 * Configures the PostgreSQL connection pool using 'pg'.
 * Reads from process.env.DATABASE_URL with fallback to individual DB_* env variables.
 */

const { Pool } = require('pg');
require('dotenv').config();

// Determine connection settings
const poolConfig = process.env.DATABASE_URL
  ? { connectionString: process.env.DATABASE_URL }
  : {
      host: process.env.DB_HOST || 'db',
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      user: process.env.DB_USER || 'alumni_user',
      password: process.env.DB_PASSWORD || 'alumni_secret_password',
      database: process.env.DB_NAME || 'alumni_db',
    };

const pool = new Pool({
  ...poolConfig,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle PostgreSQL client:', err.message);
});

/**
 * Execute a SQL query with optional parameters
 * @param {string} text - SQL statement
 * @param {Array} [params] - Query parameters
 * @returns {Promise<import('pg').QueryResult>}
 */
const query = (text, params) => pool.query(text, params);

/**
 * Test database connectivity on application startup
 * @returns {Promise<boolean>}
 */
const testConnection = async () => {
  try {
    const res = await pool.query('SELECT NOW() as now, current_database() as db');
    console.log(`✓ PostgreSQL Connected: database "${res.rows[0].db}" at ${res.rows[0].now}`);
    return true;
  } catch (err) {
    console.error('✗ PostgreSQL Connection Error:', err.message);
    throw err;
  }
};

module.exports = {
  pool,
  query,
  testConnection
};
