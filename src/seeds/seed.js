/**
 * Database Seeder
 * 
 * Cleans up and seeds the PostgreSQL database with default data and
 * factory-generated records for users and announcements.
 */

const { pool, query } = require('../config/db');
const { createUsers } = require('../factories/userFactory');
const { createAnnouncements } = require('../factories/announcementFactory');

/**
 Default primary users
 */
const DEFAULT_USERS = [
  {
    name: 'Said Hasan',
    email: 'said@example.com',
    role: 'admin',
    department: 'Computer Science',
    graduationYear: 2022
  },
  {
    name: 'Zeynep Naz',
    email: 'zeynep@example.com',
    role: 'alumni',
    department: 'Computer Engineering',
    graduationYear: 2024
  },
  {
    name: 'Ece',
    email: 'ece@example.com',
    role: 'alumni',
    department: 'Industrial Engineering',
    graduationYear: 2023
  },
  {
    name: 'Rumeysa',
    email: 'rumeysa@example.com',
    role: 'student',
    department: 'Electrical & Electronics Engineering',
    graduationYear: 2025
  },
  {
    name: 'Ceyda',
    email: 'ceyda@example.com',
    role: 'faculty',
    department: 'Software Engineering',
    graduationYear: 2020
  }
];

/**
 * Default initial announcements
 */
const DEFAULT_ANNOUNCEMENTS = [
  {
    title: 'Welcome to Alumni Portal',
    content: 'Welcome to the official Alumni Tracking System! Reconnect with classmates, explore career opportunities, and stay updated with the latest university news and events.',
    author: 'Alumni Relations Office',
    category: 'General'
  },
  {
    title: 'Upcoming Career Fair',
    content: 'Join over 50 premier tech, finance, and engineering firms at the Annual Campus Career Fair. Bring your updated resume and connect with industry recruiters.',
    author: 'Career Development Center',
    category: 'Career'
  },
  {
    title: 'Mentorship Program',
    content: 'The Alumni-Student Mentorship Program for 2026 is officially accepting mentor and mentee applications. Help guide the next generation of professionals.',
    author: 'Alumni Association',
    category: 'Event'
  }
];

/**
 * Seed the database with users and announcements
 * 
 * @param {Object} [options={}]
 * @param {number} [options.factoryUsersCount=5] - Number of factory users to generate
 * @param {number} [options.factoryAnnouncementsCount=2] - Number of factory announcements to generate
 * @returns {Promise<{usersCount: number, announcementsCount: number}>}
 */
async function seedDatabase(options = {}) {
  const factoryUsersCount = options.factoryUsersCount !== undefined ? options.factoryUsersCount : 5;
  const factoryAnnouncementsCount = options.factoryAnnouncementsCount !== undefined ? options.factoryAnnouncementsCount : 2;

  console.log('🌱 Starting database seeding process...');

  // Ensure tables exist before truncating
  await query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      role VARCHAR(50) DEFAULT 'alumni',
      department VARCHAR(255),
      graduation_year INTEGER,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS announcements (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      content TEXT NOT NULL,
      author VARCHAR(255) DEFAULT 'Alumni Relations Office',
      category VARCHAR(50) DEFAULT 'General',
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `);

  // Safely truncate existing tables and restart identity sequence
  console.log('🧹 Truncating existing users and announcements tables...');
  await query('TRUNCATE TABLE announcements, users RESTART IDENTITY CASCADE;');

  // Prepare users list (default users + factory generated alumni records)
  const factoryUsers = createUsers(factoryUsersCount, { role: 'alumni' });
  const allUsers = [...DEFAULT_USERS, ...factoryUsers];

  console.log(`👤 Inserting ${allUsers.length} users (${DEFAULT_USERS.length} core + ${factoryUsers.length} factory generated)...`);
  for (const user of allUsers) {
    await query(
      `INSERT INTO users (name, email, role, department, graduation_year, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, NOW(), NOW())`,
      [user.name, user.email, user.role, user.department, user.graduationYear]
    );
  }

  // Prepare announcements list (default announcements + factory generated announcements)
  const factoryAnnouncements = createAnnouncements(factoryAnnouncementsCount);
  const allAnnouncements = [...DEFAULT_ANNOUNCEMENTS, ...factoryAnnouncements];

  console.log(`📢 Inserting ${allAnnouncements.length} announcements (${DEFAULT_ANNOUNCEMENTS.length} core + ${factoryAnnouncements.length} factory generated)...`);
  for (const notice of allAnnouncements) {
    await query(
      `INSERT INTO announcements (title, content, author, category, created_at, updated_at)
       VALUES ($1, $2, $3, $4, NOW(), NOW())`,
      [notice.title, notice.content, notice.author, notice.category]
    );
  }

  // Verify counts
  const userCountRes = await query('SELECT COUNT(*) as count FROM users');
  const announcementCountRes = await query('SELECT COUNT(*) as count FROM announcements');

  const seededUsers = parseInt(userCountRes.rows[0].count, 10);
  const seededAnnouncements = parseInt(announcementCountRes.rows[0].count, 10);

  console.log('====================================================');
  console.log(`✅ Database seeding completed successfully!`);
  console.log(`   - Users seeded:         ${seededUsers}`);
  console.log(`   - Announcements seeded: ${seededAnnouncements}`);
  console.log('====================================================');

  return {
    usersCount: seededUsers,
    announcementsCount: seededAnnouncements
  };
}

// Execute directly if run as a standalone CLI script
if (require.main === module) {
  seedDatabase()
    .then(async () => {
      await pool.end();
      process.exit(0);
    })
    .catch(async (err) => {
      console.error('❌ Database seeding failed:', err);
      await pool.end();
      process.exit(1);
    });
}

module.exports = {
  seedDatabase,
  DEFAULT_USERS,
  DEFAULT_ANNOUNCEMENTS
};
