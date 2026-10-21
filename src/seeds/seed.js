/**
 * Database Seeder
 * 
 * Cleans up and seeds the PostgreSQL database with default data and
 * factory-generated records for users, announcements, and job postings,
 * preserving relational foreign key integrity.
 */

const { pool, query } = require('../config/db');
const { createUsers } = require('../factories/userFactory');
const { createAnnouncements } = require('../factories/announcementFactory');
const { createJobPostings } = require('../factories/jobPostingFactory');
const { createApplications } = require('../factories/applicationFactory');


/**
 * Default primary users
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
 * Default initial job postings
 */
const DEFAULT_JOB_POSTINGS = [
  {
    title: 'Senior Backend Engineer',
    company: 'TechCorp Solutions',
    location: 'Istanbul / Remote',
    jobType: 'Full-Time',
    description: 'Design and operate scalable distributed cloud microservices, maintain relational PostgreSQL databases, and lead architecture reviews.',
    requirements: '3+ years experience with Node.js/TypeScript, PostgreSQL, and Docker containerization.',
    salaryRange: '$85,000 - $115,000',
    applicationUrl: 'https://careers.techcorp.example.com/apply/senior-backend',
    contactEmail: 'recruiting@techcorp.example.com',
    status: 'Active'
  },
  {
    title: 'Full Stack Cloud Developer',
    company: 'FinTech Innovations',
    location: 'Remote',
    jobType: 'Full-Time',
    description: 'Build responsive financial dashboard web applications and resilient REST backend APIs for institutional clients.',
    requirements: 'Proficiency in React, Express/Node.js, SQL, and cloud infrastructure.',
    salaryRange: '$75,000 - $100,000',
    applicationUrl: 'https://fintechinnovations.example.com/apply',
    contactEmail: 'careers@fintechinnovations.example.com',
    status: 'Active'
  },
  {
    title: 'Machine Learning Research Intern',
    company: 'Applied AI Labs',
    location: 'Ankara / Hybrid',
    jobType: 'Internship',
    description: 'Participate in model benchmarking, dataset engineering pipelines, and university research collaborations.',
    requirements: 'Enrolled in Computer Science or Electrical Engineering. Python, PyTorch background.',
    salaryRange: '$2,500 / month stipend',
    applicationUrl: 'https://ailabs.example.com/internships',
    contactEmail: 'internships@ailabs.example.com',
    status: 'Active'
  }
];

/**
 * Seed the database with users, announcements, and job postings
 * 
 * @param {Object} [options={}]
 * @param {number} [options.factoryUsersCount=5] - Number of factory users to generate
 * @param {number} [options.factoryAnnouncementsCount=2] - Number of factory announcements to generate
 * @param {number} [options.factoryJobPostingsCount=3] - Number of factory job postings to generate
 * @returns {Promise<{usersCount: number, announcementsCount: number, jobPostingsCount: number}>}
 */
async function seedDatabase(options = {}) {
  const factoryUsersCount = options.factoryUsersCount !== undefined ? options.factoryUsersCount : 5;
  const factoryAnnouncementsCount = options.factoryAnnouncementsCount !== undefined ? options.factoryAnnouncementsCount : 2;
  const factoryJobPostingsCount = options.factoryJobPostingsCount !== undefined ? options.factoryJobPostingsCount : 3;

  console.log('🌱 Starting database seeding process...');

  // Ensure tables and columns exist before truncating
  await query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      role VARCHAR(50) DEFAULT 'alumni',
      department VARCHAR(255),
      graduation_year INTEGER,
      phone VARCHAR(50),
      company VARCHAR(255),
      job_title VARCHAR(255),
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS announcements (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      content TEXT NOT NULL,
      author VARCHAR(255) DEFAULT 'Alumni Relations Office',
      author_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
      category VARCHAR(50) DEFAULT 'General',
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS job_postings (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      company VARCHAR(255) NOT NULL,
      location VARCHAR(255) DEFAULT 'Remote',
      job_type VARCHAR(50) DEFAULT 'Full-Time',
      description TEXT NOT NULL,
      requirements TEXT,
      salary_range VARCHAR(100),
      application_url VARCHAR(500),
      contact_email VARCHAR(255),
      poster_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
      status VARCHAR(50) DEFAULT 'Active',
      deadline TIMESTAMPTZ,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS applications (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      job_id INTEGER NOT NULL REFERENCES job_postings(id) ON DELETE CASCADE,
      status VARCHAR(50) NOT NULL DEFAULT 'Submitted',
      cover_letter TEXT,
      resume_url VARCHAR(500),
      notes TEXT,
      applied_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
      created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT uq_applications_user_job UNIQUE (user_id, job_id)
    );
  `);

  // Safely truncate existing tables and restart identity sequence
  console.log('🧹 Truncating existing tables (applications, job_postings, announcements, users)...');
  await query('TRUNCATE TABLE applications, job_postings, announcements, users RESTART IDENTITY CASCADE;');

  // Prepare users list (default users + factory generated alumni records)
  const factoryUsers = createUsers(factoryUsersCount, { role: 'alumni' });
  const allUsers = [...DEFAULT_USERS, ...factoryUsers];

  console.log(`👤 Inserting ${allUsers.length} users (${DEFAULT_USERS.length} core + ${factoryUsers.length} factory generated)...`);
  const insertedUserIds = [];
  for (const user of allUsers) {
    const res = await query(
      `INSERT INTO users (name, email, role, department, graduation_year, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
       RETURNING id`,
      [user.name, user.email, user.role, user.department, user.graduationYear]
    );
    insertedUserIds.push(res.rows[0].id);
  }

  const adminUserId = insertedUserIds[0] || null; // Said Hasan (admin)
  const alumniUserId = insertedUserIds[1] || null; // Zeynep Naz (alumni)

  // Prepare announcements list (default announcements + factory generated announcements)
  const factoryAnnouncements = createAnnouncements(factoryAnnouncementsCount);
  const allAnnouncements = [...DEFAULT_ANNOUNCEMENTS, ...factoryAnnouncements];

  console.log(`📢 Inserting ${allAnnouncements.length} announcements with author_id relations...`);
  for (let i = 0; i < allAnnouncements.length; i += 1) {
    const notice = allAnnouncements[i];
    const authorId = (i % 2 === 0) ? adminUserId : alumniUserId;
    await query(
      `INSERT INTO announcements (title, content, author, author_id, category, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, NOW(), NOW())`,
      [notice.title, notice.content, notice.author, authorId, notice.category]
    );
  }

  // Prepare job postings list (default postings + factory generated job postings)
  const factoryJobs = createJobPostings(factoryJobPostingsCount);
  const allJobPostings = [...DEFAULT_JOB_POSTINGS, ...factoryJobs];

  console.log(`💼 Inserting ${allJobPostings.length} job postings with poster_id relations...`);
  const insertedJobIds = [];
  for (let i = 0; i < allJobPostings.length; i += 1) {
    const job = allJobPostings[i];
    // Rotate posters among created users
    const posterId = insertedUserIds[i % insertedUserIds.length] || null;
    const res = await query(
      `INSERT INTO job_postings (
        title, company, location, job_type, description, requirements,
        salary_range, application_url, contact_email, poster_id, status, deadline,
        created_at, updated_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW() + INTERVAL '45 days', NOW(), NOW())
      RETURNING id`,
      [
        job.title,
        job.company,
        job.location || 'Remote',
        job.jobType || 'Full-Time',
        job.description,
        job.requirements || null,
        job.salaryRange || null,
        job.applicationUrl || null,
        job.contactEmail || null,
        posterId,
        job.status || 'Active'
      ]
    );
    insertedJobIds.push(res.rows[0].id);
  }

  // Prepare initial core applications (Many-to-Many candidate action records)
  console.log('📝 Inserting applications (Many-to-Many User <-> JobPosting)...');
  const appliedPairs = new Set();
  const seedApplicationList = [
    {
      userId: insertedUserIds[1] || 2,
      jobId: insertedJobIds[0] || 1,
      status: 'Under Review',
      coverLetter: 'Excited to apply for this backend engineering role with strong Node.js and PostgreSQL experience.',
      resumeUrl: 'https://storage.alumni-portal.example.com/resumes/zeynep-resume.pdf',
      notes: 'First-round screening passed.'
    },
    {
      userId: insertedUserIds[2] || 3,
      jobId: insertedJobIds[1] || 2,
      status: 'Interview Scheduled',
      coverLetter: 'Applying for Full Stack Developer position with extensive React and cloud systems background.',
      resumeUrl: 'https://storage.alumni-portal.example.com/resumes/ece-resume.pdf',
      notes: 'Technical interview set for next week.'
    },
    {
      userId: insertedUserIds[3] || 4,
      jobId: insertedJobIds[2] || 3,
      status: 'Submitted',
      coverLetter: 'Eager to contribute to machine learning research and distributed dataset benchmarking pipelines.',
      resumeUrl: 'https://storage.alumni-portal.example.com/resumes/rumeysa-resume.pdf',
      notes: 'Faculty academic reference attached.'
    },
    {
      userId: insertedUserIds[0] || 1,
      jobId: insertedJobIds[1] || 2,
      status: 'Accepted',
      coverLetter: 'Senior systems engineer looking forward to collaborating on cloud-native financial platform architectures.',
      resumeUrl: 'https://storage.alumni-portal.example.com/resumes/said-resume.pdf',
      notes: 'Offer letter signed.'
    }
  ];

  for (const app of seedApplicationList) {
    const pairKey = `${app.userId}-${app.jobId}`;
    if (!appliedPairs.has(pairKey)) {
      appliedPairs.add(pairKey);
      await query(
        `INSERT INTO applications (user_id, job_id, status, cover_letter, resume_url, notes, applied_at, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, NOW() - INTERVAL '3 days', NOW(), NOW())
         ON CONFLICT (user_id, job_id) DO NOTHING`,
        [app.userId, app.jobId, app.status, app.coverLetter, app.resumeUrl, app.notes]
      );
    }
  }

  // Insert factory applications ensuring uniqueness
  const factoryApps = createApplications(4);
  for (let i = 0; i < factoryApps.length; i += 1) {
    const app = factoryApps[i];
    const candidateId = insertedUserIds[(i + 2) % insertedUserIds.length];
    const targetJobId = insertedJobIds[(i + 1) % insertedJobIds.length];
    const pairKey = `${candidateId}-${targetJobId}`;
    if (!appliedPairs.has(pairKey) && candidateId && targetJobId) {
      appliedPairs.add(pairKey);
      await query(
        `INSERT INTO applications (user_id, job_id, status, cover_letter, resume_url, notes, applied_at, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, NOW() - INTERVAL '1 day', NOW(), NOW())
         ON CONFLICT (user_id, job_id) DO NOTHING`,
        [candidateId, targetJobId, app.status, app.coverLetter, app.resumeUrl, app.notes]
      );
    }
  }

  // Verify counts
  const userCountRes = await query('SELECT COUNT(*) as count FROM users');
  const announcementCountRes = await query('SELECT COUNT(*) as count FROM announcements');
  const jobCountRes = await query('SELECT COUNT(*) as count FROM job_postings');
  const applicationCountRes = await query('SELECT COUNT(*) as count FROM applications');

  const seededUsers = parseInt(userCountRes.rows[0].count, 10);
  const seededAnnouncements = parseInt(announcementCountRes.rows[0].count, 10);
  const seededJobs = parseInt(jobCountRes.rows[0].count, 10);
  const seededApplications = parseInt(applicationCountRes.rows[0].count, 10);

  console.log('====================================================');
  console.log(`✅ Database seeding completed successfully!`);
  console.log(`   - Users seeded:         ${seededUsers}`);
  console.log(`   - Announcements seeded: ${seededAnnouncements}`);
  console.log(`   - Job Postings seeded:  ${seededJobs}`);
  console.log(`   - Applications seeded:  ${seededApplications}`);
  console.log('====================================================');

  return {
    usersCount: seededUsers,
    announcementsCount: seededAnnouncements,
    jobPostingsCount: seededJobs,
    applicationsCount: seededApplications
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
  DEFAULT_ANNOUNCEMENTS,
  DEFAULT_JOB_POSTINGS
};
