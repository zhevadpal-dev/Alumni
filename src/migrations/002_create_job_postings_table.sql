-- =============================================================================
-- Migration: 002_create_job_postings_table.sql
-- Description: Create job_postings table, indexes, timestamp triggers, and seed initial records
-- Reference: docs/ddd.md (Section 3.3, 6.3, 8)
-- =============================================================================

-- 1. Create Job Postings Table
CREATE TABLE IF NOT EXISTS job_postings (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL DEFAULT 'Remote',
    job_type VARCHAR(50) NOT NULL DEFAULT 'Full-Time'
        CHECK (job_type IN ('Full-Time', 'Part-Time', 'Contract', 'Internship', 'Remote')),
    description TEXT NOT NULL,
    requirements TEXT,
    salary_range VARCHAR(100),
    application_url VARCHAR(500),
    contact_email VARCHAR(255),
    poster_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Active'
        CHECK (status IN ('Active', 'Closed', 'Draft', 'Expired')),
    deadline TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 2. Indexes for Frequent Queries & Search
CREATE INDEX IF NOT EXISTS idx_job_postings_poster_id ON job_postings(poster_id);
CREATE INDEX IF NOT EXISTS idx_job_postings_status ON job_postings(status);
CREATE INDEX IF NOT EXISTS idx_job_postings_job_type ON job_postings(job_type);
CREATE INDEX IF NOT EXISTS idx_job_postings_company ON job_postings(company);
CREATE INDEX IF NOT EXISTS idx_job_postings_created_at ON job_postings(created_at DESC);

-- 3. Ensure Announcements Table Has author_id FK to Users (Relational Integrity)
ALTER TABLE announcements 
ADD COLUMN IF NOT EXISTS author_id INTEGER REFERENCES users(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_announcements_author_id ON announcements(author_id);

-- Optional: Link initial announcements without author_id to default admin user
UPDATE announcements
SET author_id = (SELECT id FROM users WHERE role = 'admin' LIMIT 1)
WHERE author_id IS NULL;

-- 3. Automatic Timestamp Trigger Function & Trigger
CREATE OR REPLACE FUNCTION update_timestamp_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_timestamp_job_postings ON job_postings;
CREATE TRIGGER set_timestamp_job_postings
BEFORE UPDATE ON job_postings
FOR EACH ROW
EXECUTE FUNCTION update_timestamp_column();

-- 4. Seed Initial Job Postings (Idempotent)
INSERT INTO job_postings (
    title,
    company,
    location,
    job_type,
    description,
    requirements,
    salary_range,
    application_url,
    contact_email,
    poster_id,
    status,
    deadline
)
SELECT
    'Senior Backend Engineer',
    'TechCorp Global',
    'Istanbul / Remote',
    'Full-Time',
    'Join our core backend infrastructure team to design scalable distributed microservices, maintain high-throughput PostgreSQL databases, and lead technical architecture reviews.',
    '3+ years experience with Node.js, TypeScript, PostgreSQL, and Docker. Strong understanding of distributed architectures and asynchronous messaging.',
    '$80,000 - $110,000',
    'https://careers.techcorp.example.com/jobs/senior-backend',
    'recruiting@techcorp.example.com',
    (SELECT id FROM users WHERE email = 'said@example.com' LIMIT 1),
    'Active',
    CURRENT_TIMESTAMP + INTERVAL '60 days'
WHERE NOT EXISTS (
    SELECT 1 FROM job_postings WHERE title = 'Senior Backend Engineer' AND company = 'TechCorp Global'
);

INSERT INTO job_postings (
    title,
    company,
    location,
    job_type,
    description,
    requirements,
    salary_range,
    application_url,
    contact_email,
    poster_id,
    status,
    deadline
)
SELECT
    'Full Stack Cloud Developer',
    'FinTech Innovations',
    'Remote',
    'Full-Time',
    'Building modern financial dashboard web applications and resilient REST/GraphQL backend services for over 50,000 active institutional users.',
    'Proficiency with JavaScript/TypeScript, React, Node.js, SQL, and AWS or GCP cloud services.',
    '$70,000 - $95,000',
    'https://fintechinnovations.example.com/careers/fullstack',
    'talent@fintechinnovations.example.com',
    (SELECT id FROM users WHERE email = 'zeynep@example.com' LIMIT 1),
    'Active',
    CURRENT_TIMESTAMP + INTERVAL '45 days'
WHERE NOT EXISTS (
    SELECT 1 FROM job_postings WHERE title = 'Full Stack Cloud Developer' AND company = 'FinTech Innovations'
);

INSERT INTO job_postings (
    title,
    company,
    location,
    job_type,
    description,
    requirements,
    salary_range,
    application_url,
    contact_email,
    poster_id,
    status,
    deadline
)
SELECT
    'AI & Machine Learning Research Intern',
    'Applied AI Research Labs',
    'Hybrid - Ankara',
    'Internship',
    'Participate in state-of-the-art machine learning evaluation benchmarks, data engineering pipelines, and university research collaborations.',
    'Undergraduate or graduate student in Computer Science or Electrical Engineering. Solid grounding in Python, PyTorch, and linear algebra.',
    '$2,500 / month stipend',
    'https://ailabs.example.com/internships/apply',
    'research-interns@ailabs.example.com',
    (SELECT id FROM users WHERE email = 'ceyda@example.com' LIMIT 1),
    'Active',
    CURRENT_TIMESTAMP + INTERVAL '30 days'
WHERE NOT EXISTS (
    SELECT 1 FROM job_postings WHERE title = 'AI & Machine Learning Research Intern' AND company = 'Applied AI Research Labs'
);
