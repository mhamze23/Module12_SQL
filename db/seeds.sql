-- Inserts names of departments into department table
INSERT INTO department (name)
VALUES
('Engineering'),
('Finance'),
('Legal'),
('Sales');

-- Inserts roles of employee into role table
INSERT INTO role (title, salary, department_id)
VALUES
    ('Account Manager', 160000, 2),
    ('Accountant', 125000, 2),
    ('Lead Engineer', 150000, 1),
    ('Legal Team Lead', 250000, 3),
    ('Lawyer', 190000, 3),
    ('Sales Lead', 100000, 4),
    ('Salesperson', 80000, 4),
    ('Software Engineer', 120000, 1);

-- Inserts employee information into employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Hamze', 'Mohamed', 1, 4),
('Deka', 'Ali', 2, 3),
('Ismail', 'Soubaneh', 3, 1),
('Nasteho', 'Nuradin', 4, 5)
('Erig', 'Erig', 5, null),
('Rahma', 'Hassan', 6, null),
('Salma', 'Mohamed', 7, null),
('Aydin', 'Osman', 8, null);