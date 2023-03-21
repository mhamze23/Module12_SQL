-- Drop the existing database if it exists, then create a new one
DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

-- Set the newly created database as the default for subsequent commands
USE employee_db;

-- Create the 'department' table
CREATE TABLE department (
    id INT PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
);

-- Create the 'role' table
CREATE TABLE role (
    id INT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT,
);

-- Create the 'employee' table
CREATE TABLE employee (
    id INT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
);
