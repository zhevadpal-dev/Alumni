-- =============================================================================
-- Migration: 004_add_user_auth_and_profile_columns.sql
-- Description: Safely add password_hash, company, job_title, linkedin_url, and phone
--              columns to users table for public registration and extended profiles.
-- =============================================================================

ALTER TABLE users
  ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255),
  ADD COLUMN IF NOT EXISTS company VARCHAR(255),
  ADD COLUMN IF NOT EXISTS job_title VARCHAR(255),
  ADD COLUMN IF NOT EXISTS linkedin_url VARCHAR(500),
  ADD COLUMN IF NOT EXISTS phone VARCHAR(50);
