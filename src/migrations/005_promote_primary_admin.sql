-- =============================================================================
-- Migration: 005_promote_primary_admin.sql
-- Description: Promote primary platform owner account (yoorakim553@gmail.com)
--              to Admin role so Admin Panel access persists cleanly across restarts.
-- =============================================================================

UPDATE users
SET role = 'admin',
    updated_at = NOW()
WHERE LOWER(email) = 'yoorakim553@gmail.com';
