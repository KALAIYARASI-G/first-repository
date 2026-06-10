-- Create Database if it does not exist
CREATE DATABASE IF NOT EXISTS student_db;

USE student_db;

-- Create Students Table
CREATE TABLE IF NOT EXISTS students (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20),
    course VARCHAR(150)
);
