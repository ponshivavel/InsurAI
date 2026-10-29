-- =======================================================
-- InsurAI Insurance Management System — MySQL Schema
-- =======================================================

CREATE DATABASE IF NOT EXISTS insurai_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE insurai_db;

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 2. User Roles Table
CREATE TABLE IF NOT EXISTS user_roles (
    user_id BIGINT NOT NULL,
    roles VARCHAR(50) NOT NULL,
    PRIMARY KEY (user_id, roles),
    CONSTRAINT fk_user_roles_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 3. Policies Table
CREATE TABLE IF NOT EXISTS policies (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    policy_number VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    coverage DECIMAL(12, 2) NOT NULL,
    premium DECIMAL(12, 2) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Active',
    start_date DATE NOT NULL,
    renewal_date DATE NOT NULL,
    INDEX idx_policy_email (user_email),
    INDEX idx_policy_status (status)
) ENGINE=InnoDB;

-- 4. Appointments Table
CREATE TABLE IF NOT EXISTS appointments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    date_time DATETIME NOT NULL,
    notes VARCHAR(500),
    status VARCHAR(50) NOT NULL DEFAULT 'Confirmed',
    INDEX idx_appointment_email (email)
) ENGINE=InnoDB;

-- 5. Transactions Table
CREATE TABLE IF NOT EXISTS transactions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    transaction_no VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL,
    policy_name VARCHAR(255) NOT NULL,
    amount DECIMAL(12, 2) NOT NULL,
    late_fee DECIMAL(12, 2) DEFAULT 0.00,
    gst DECIMAL(12, 2) DEFAULT 0.00,
    premium_mode VARCHAR(50) NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Completed',
    transaction_date DATETIME NOT NULL,
    branch_agency VARCHAR(100),
    INDEX idx_transaction_email (email)
) ENGINE=InnoDB;

-- 6. Notifications Table
CREATE TABLE IF NOT EXISTS notifications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message VARCHAR(1000) NOT NULL,
    type VARCHAR(50) NOT NULL,
    created_at DATETIME NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    INDEX idx_notification_email (email)
) ENGINE=InnoDB;

-- 7. Policy Plans Catalog Table
CREATE TABLE IF NOT EXISTS policy_plans (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    plan_code VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description VARCHAR(1500) NOT NULL,
    min_coverage DECIMAL(12, 2) NOT NULL,
    max_coverage DECIMAL(12, 2) NOT NULL,
    base_monthly_premium DECIMAL(12, 2) NOT NULL,
    eligibility VARCHAR(1000) NOT NULL,
    key_features VARCHAR(2000) NOT NULL
) ENGINE=InnoDB;

-- 8. Guidelines Table
CREATE TABLE IF NOT EXISTS guidelines (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    summary VARCHAR(3000) NOT NULL,
    compliance_notes VARCHAR(1000) NOT NULL
) ENGINE=InnoDB;
