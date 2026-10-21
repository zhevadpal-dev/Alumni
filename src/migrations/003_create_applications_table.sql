-- =============================================================================
-- Migration: 003_create_applications_table.sql
-- Description: Create applications many-to-many join table between users and job_postings,
--              composite unique constraint, B-Tree indexes, trigger, and seed data.
-- Reference: docs/ddd.md (Section 3.4, 4, 6.4, 8)
-- =============================================================================

-- 1. Create Applications Join Table
CREATE TABLE IF NOT EXISTS applications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    job_id INTEGER NOT NULL REFERENCES job_postings(id) ON DELETE CASCADE,
    status VARCHAR(50) NOT NULL DEFAULT 'Submitted'
        CHECK (status IN ('Submitted', 'Under Review', 'Shortlisted', 'Interview Scheduled', 'Accepted', 'Rejected', 'Withdrawn')),
    cover_letter TEXT,
    resume_url VARCHAR(500),
    notes TEXT,
    applied_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_applications_user_job UNIQUE (user_id, job_id)
);

-- 2. Indexes for Performance & Relational Queries
CREATE INDEX IF NOT EXISTS idx_applications_user_id ON applications(user_id);
CREATE INDEX IF NOT EXISTS idx_applications_job_id ON applications(job_id);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_applied_at ON applications(applied_at DESC);

-- 3. Automatic Timestamp Trigger
CREATE OR REPLACE FUNCTION update_timestamp_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_timestamp_applications ON applications;
CREATE TRIGGER set_timestamp_applications
BEFORE UPDATE ON applications
FOR EACH ROW
EXECUTE FUNCTION update_timestamp_column();

-- 4. Seed Initial Sample Applications (Idempotent)
INSERT INTO applications (user_id, job_id, status, cover_letter, resume_url, applied_at)
SELECT 
    u.id, 
    j.id, 
    'Under Review',
    'I am an alumni graduated in 2024 with a strong passion for scalable distributed microservices.',
    'https://storage.example.com/resumes/zeynep_naz_cv.pdf',
    NOW() - INTERVAL '3 days'
FROM users u, job_postings j
WHERE u.email = 'zeynep@example.com' 
  AND j.title = 'Senior Backend Engineer'
  AND NOT EXISTS (
      SELECT 1 FROM applications a 
      WHERE a.user_id = u.id AND a.job_id = j.id
  );

INSERT INTO applications (user_id, job_id, status, cover_letter, resume_url, applied_at)
SELECT 
    u.id, 
    j.id, 
    'Submitted',
    'Industrial engineering graduate with extensive experience in cloud analytics and modern web applications.',
    'https://storage.example.com/resumes/ece_cv.pdf',
    NOW() - INTERVAL '1 day'
FROM users u, job_postings j
WHERE u.email = 'ece@example.com' 
  AND j.title = 'Full Stack Cloud Developer'
  AND NOT EXISTS (
      SELECT 1 FROM applications a 
      WHERE a.user_id = u.id AND a.job_id = j.id
  );

INSERT INTO applications (user_id, job_id, status, cover_letter, resume_url, applied_at)
SELECT 
    u.id, 
    j.id, 
    'Shortlisted',
    'Electrical & electronics student enthusiastic about deep learning research and production LLM evaluation benchmarks.',
    'https://storage.example.com/resumes/rumeysa_cv.pdf',
    NOW() - INTERVAL '5 days'
FROM users u, job_postings j
WHERE u.email = 'rumeysa@example.com' 
  AND j.title = 'AI & Machine Learning Research Intern'
  AND NOT EXISTS (
      SELECT 1 FROM applications a 
      WHERE a.user_id = u.id AND a.job_id = j.id
  );
