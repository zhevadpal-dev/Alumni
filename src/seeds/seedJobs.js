/**
 * Standalone Job Postings Seeder Script
 * 
 * Specifically seeds and populates the `job_postings` table in PostgreSQL
 * with realistic domain records and factory-generated opportunities.
 * Connects poster_id foreign keys to active platform users.
 * 
 * Usage:
 *   npm run seed:jobs
 *   docker compose exec app npm run seed:jobs
 */

const { pool, query } = require('../config/db');
const { createJobPostings } = require('../factories/jobPostingFactory');

/**
 * Curated list of realistic job postings across diverse tech & industry domains
 */
const SEED_JOB_POSTINGS = [
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
    status: 'Active',
    deadlineDays: 45
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
    status: 'Active',
    deadlineDays: 30
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
    status: 'Active',
    deadlineDays: 60
  },
  {
    title: 'DevOps & Cloud Infrastructure Lead',
    company: 'CloudScale Systems',
    location: 'London, UK / Remote',
    jobType: 'Full-Time',
    description: 'Automate CI/CD delivery pipelines, manage Kubernetes clusters on AWS/GCP, and ensure 99.99% system availability.',
    requirements: 'Experience with Terraform, Docker, Kubernetes, Prometheus, and multi-region cloud networks.',
    salaryRange: '$95,000 - $130,000',
    applicationUrl: 'https://cloudscale.example.com/careers/devops-lead',
    contactEmail: 'hiring@cloudscale.example.com',
    status: 'Active',
    deadlineDays: 40
  },
  {
    title: 'Frontend UI/UX Engineer (React / TypeScript)',
    company: 'Nexus Data Labs',
    location: 'Berlin, Germany / Hybrid',
    jobType: 'Full-Time',
    description: 'Design responsive web applications, component libraries, and interactive analytical dashboards for enterprise clients.',
    requirements: 'Proficiency in React, Next.js, TypeScript, TailwindCSS, and state management.',
    salaryRange: '$70,000 - $95,000',
    applicationUrl: 'https://nexusdata.example.com/jobs/frontend',
    contactEmail: 'jobs@nexusdata.example.com',
    status: 'Active',
    deadlineDays: 25
  },
  {
    title: 'Cybersecurity SOC Analyst',
    company: 'CyberShield Security',
    location: 'Izmir / On-site',
    jobType: 'Contract',
    description: 'Perform penetration testing, audit identity/access management protocols, and coordinate SOC incident responses.',
    requirements: 'Knowledge of OWASP top 10, network protocols, ISO 27001 compliance, and SIEM monitoring tools.',
    salaryRange: '$60 - $85 / hour',
    applicationUrl: 'https://cybershield.example.com/careers/soc-analyst',
    contactEmail: 'security-hiring@cybershield.example.com',
    status: 'Active',
    deadlineDays: 35
  },
  {
    title: 'Data Platform & Streaming Engineer',
    company: 'Global Telecom Network',
    location: 'Remote',
    jobType: 'Full-Time',
    description: 'Build real-time ETL streaming pipelines, maintain analytics data lakes, and design automated reporting frameworks.',
    requirements: 'Hands-on background with Python, SQL, Apache Kafka, Spark, and PostgreSQL.',
    salaryRange: '$80,000 - $110,000',
    applicationUrl: 'https://telecom.example.com/careers/data-engineer',
    contactEmail: 'careers@telecom.example.com',
    status: 'Active',
    deadlineDays: 50
  },
  {
    title: 'AI Robotics Software Engineer',
    company: 'Apex Robotics AI',
    location: 'New York, NY / Remote',
    jobType: 'Full-Time',
    description: 'Develop autonomous perception algorithms, real-time sensor fusion systems, and robotic fleet management controllers.',
    requirements: 'C++, Python, ROS2, computer vision, and robotics simulation experience.',
    salaryRange: '$110,000 - $145,000',
    applicationUrl: 'https://apexrobotics.example.com/apply/robotics-eng',
    contactEmail: 'talent@apexrobotics.example.com',
    status: 'Active',
    deadlineDays: 45
  }
];

/**
 * Seed job postings table with curated records and factory-generated items
 * 
 * @param {Object} [options={}]
 * @param {number} [options.factoryCount=4] - Additional factory job postings to generate
 * @param {boolean} [options.truncate=false] - Whether to clear the job_postings table before inserting
 * @returns {Promise<{insertedCount: number, totalCount: number, jobs: Array<Object>}>}
 */
async function seedJobPostings(options = {}) {
  const factoryCount = options.factoryCount !== undefined ? options.factoryCount : 4;
  const shouldTruncate = options.truncate === true;

  console.log('💼 Starting Job Postings seeding process...');

  // Ensure table exists
  await query(`
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
  `);

  if (shouldTruncate) {
    console.log('🧹 Truncating job_postings table...');
    await query('TRUNCATE TABLE job_postings RESTART IDENTITY CASCADE;');
  }

  // Fetch available users to assign as posters
  const userRes = await query('SELECT id, name, email FROM users ORDER BY id ASC');
  const availableUsers = userRes.rows;
  if (availableUsers.length === 0) {
    console.warn('⚠️ No users found in database. Poster IDs will be set to NULL.');
  } else {
    console.log(`👤 Found ${availableUsers.length} available users to associate as job posters.`);
  }

  const insertedJobs = [];

  // Insert Core Curated Job Postings
  for (let i = 0; i < SEED_JOB_POSTINGS.length; i += 1) {
    const job = SEED_JOB_POSTINGS[i];
    const poster = availableUsers.length > 0 ? availableUsers[i % availableUsers.length] : null;
    const posterId = poster ? poster.id : null;
    const deadlineDays = job.deadlineDays || 30;

    const res = await query(
      `INSERT INTO job_postings (
        title, company, location, job_type, description, requirements,
        salary_range, application_url, contact_email, poster_id, status, deadline,
        created_at, updated_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW() + ($12 || ' days')::INTERVAL, NOW(), NOW())
      RETURNING id, title, company, location, job_type AS "jobType", salary_range AS "salaryRange", status, poster_id AS "posterId"`,
      [
        job.title,
        job.company,
        job.location,
        job.jobType,
        job.description,
        job.requirements,
        job.salaryRange,
        job.applicationUrl,
        job.contactEmail,
        posterId,
        job.status,
        deadlineDays
      ]
    );

    insertedJobs.push({
      ...res.rows[0],
      posterName: poster ? poster.name : 'Unassigned'
    });
  }

  // Insert Factory-Generated Job Postings
  if (factoryCount > 0) {
    const factoryList = createJobPostings(factoryCount);
    for (let i = 0; i < factoryList.length; i += 1) {
      const job = factoryList[i];
      const poster = availableUsers.length > 0 ? availableUsers[(i + 3) % availableUsers.length] : null;
      const posterId = poster ? poster.id : null;

      const res = await query(
        `INSERT INTO job_postings (
          title, company, location, job_type, description, requirements,
          salary_range, application_url, contact_email, poster_id, status, deadline,
          created_at, updated_at
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW(), NOW())
        RETURNING id, title, company, location, job_type AS "jobType", salary_range AS "salaryRange", status, poster_id AS "posterId"`,
        [
          job.title,
          job.company,
          job.location,
          job.jobType,
          job.description,
          job.requirements,
          job.salaryRange,
          job.applicationUrl,
          job.contactEmail,
          posterId,
          job.status,
          job.deadline
        ]
      );

      insertedJobs.push({
        ...res.rows[0],
        posterName: poster ? poster.name : 'Unassigned'
      });
    }
  }

  // Get total count in DB
  const countRes = await query('SELECT COUNT(*) as count FROM job_postings');
  const totalCount = parseInt(countRes.rows[0].count, 10);

  console.log('========================================================================');
  console.log(`✅ Job postings seeding completed successfully!`);
  console.log(`   - Newly inserted in this run: ${insertedJobs.length}`);
  console.log(`   - Total job postings in DB:  ${totalCount}`);
  console.log('========================================================================');
  console.table(insertedJobs.map(j => ({
    ID: j.id,
    Title: j.title,
    Company: j.company,
    Type: j.jobType,
    Salary: j.salaryRange,
    Location: j.location,
    Status: j.status,
    Poster: j.posterName
  })));

  return {
    insertedCount: insertedJobs.length,
    totalCount,
    jobs: insertedJobs
  };
}

if (require.main === module) {
  seedJobPostings()
    .then(async () => {
      await pool.end();
      process.exit(0);
    })
    .catch(async (err) => {
      console.error('❌ Job postings seeding failed:', err);
      await pool.end();
      process.exit(1);
    });
}

module.exports = {
  seedJobPostings,
  SEED_JOB_POSTINGS
};
