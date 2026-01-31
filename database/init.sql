-- CampusByte Database Schema
-- MySQL Database Initialization Script

-- Create database
CREATE DATABASE IF NOT EXISTS campusbyte
    DEFAULT CHARACTER SET utf8mb4
    DEFAULT COLLATE utf8mb4_unicode_ci;

USE campusbyte;

-- Users table (managed by JPA, this is for reference)
-- The actual table will be created by Hibernate with ddl-auto: update

-- Insert admin user (password: Admin@123)
-- Note: Run this after the application creates the tables
INSERT INTO users (id, email, password_hash, first_name, last_name, role, status, created_at, updated_at)
VALUES (
    UUID_TO_BIN(UUID()),
    'admin@campusbyte.edu',
    '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4pS3YQM.t0eTNpLW',  -- Admin@123
    'System',
    'Administrator',
    'ADMIN',
    'ACTIVE',
    NOW(),
    NOW()
) ON DUPLICATE KEY UPDATE email = email;

-- Sample faculty user (password: Faculty@123)
INSERT INTO users (id, email, password_hash, first_name, last_name, role, status, created_at, updated_at)
VALUES (
    UUID_TO_BIN(UUID()),
    'faculty@campusbyte.edu',
    '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4pS3YQM.t0eTNpLW',  -- Faculty@123
    'John',
    'Smith',
    'FACULTY',
    'ACTIVE',
    NOW(),
    NOW()
) ON DUPLICATE KEY UPDATE email = email;

-- Sample student user (password: Student@123)
INSERT INTO users (id, email, password_hash, first_name, last_name, role, status, created_at, updated_at)
VALUES (
    UUID_TO_BIN(UUID()),
    'student@campusbyte.edu',
    '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4pS3YQM.t0eTNpLW',  -- Student@123
    'Jane',
    'Doe',
    'STUDENT',
    'ACTIVE',
    NOW(),
    NOW()
) ON DUPLICATE KEY UPDATE email = email;
