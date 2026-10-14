-- =============================================================================
-- Migration: 001_create_initial_tables.sql
-- Description: Create initial users and announcements tables and seed initial data
-- =============================================================================

-- 1. Users Table
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

-- 2. Announcements Table
CREATE TABLE IF NOT EXISTS announcements (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    author VARCHAR(255) DEFAULT 'Alumni Relations Office',
    category VARCHAR(50) DEFAULT 'General',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 3. Seed Initial Users (Said Hasan, Zeynep Naz, Ece, Rumeysa, Ceyda)
INSERT INTO users (name, email, role, department, graduation_year)
VALUES
    ('Said Hasan', 'said@example.com', 'admin', 'Computer Science', 2022),
    ('Zeynep Naz', 'zeynep@example.com', 'alumni', 'Computer Engineering', 2024),
    ('Ece', 'ece@example.com', 'alumni', 'Industrial Engineering', 2023),
    ('Rumeysa', 'rumeysa@example.com', 'student', 'Electrical & Electronics Engineering', 2025),
    ('Ceyda', 'ceyda@example.com', 'faculty', 'Software Engineering', 2020)
ON CONFLICT (email) DO NOTHING;

-- 4. Seed Initial Announcements (Idempotent)
INSERT INTO announcements (title, content, author, category)
SELECT 'Annual Alumni Homecoming 2026', 'We are thrilled to welcome all alumni back to campus for the Annual Homecoming Weekend featuring networking dinners, department tours, and the alumni award ceremony.', 'Alumni Relations Office', 'Event'
WHERE NOT EXISTS (SELECT 1 FROM announcements WHERE title = 'Annual Alumni Homecoming 2026');

INSERT INTO announcements (title, content, author, category)
SELECT 'Spring 2026 Mentorship Program Applications Open', 'Connect with current undergraduate students to provide career mentorship, portfolio reviews, and industry guidance. Applications are open until the end of the month.', 'Career Development Center', 'Career'
WHERE NOT EXISTS (SELECT 1 FROM announcements WHERE title = 'Spring 2026 Mentorship Program Applications Open');

INSERT INTO announcements (title, content, author, category)
SELECT 'Alumni Spotlight: Tech Innovations in Artificial Intelligence', 'Join our upcoming webinar with distinguished alumni pioneers discussing recent breakthroughs in AI systems, ethical machine learning, and practical production engineering.', 'Faculty of Engineering', 'Academic'
WHERE NOT EXISTS (SELECT 1 FROM announcements WHERE title = 'Alumni Spotlight: Tech Innovations in Artificial Intelligence');
