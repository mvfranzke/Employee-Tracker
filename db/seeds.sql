use employees_db;

INSERT INTO department
    (name)
VALUES
    ('Reports Team'),
    ('Quality Team'),
    ('Operations');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Work Force Manager', 100000, 1),
    ('Real Time Analyst', 75000, 1),
    ('Quality Manager', 90000, 2),
    ('Quality Specialist', 80000, 2),
    ('Operations Manager', 110000, 3),
    ('Team Lead', 90000, 3),
    ('Assistant Lead', 60000, 3),
    ('Customer Service Rep', 35000, 3);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Aries', 'Valle', 1, NULL),
    ('Roberto', 'Bibiano', 2, 1),
    ('Mitch', 'Entico', 3, NULL),
    ('Ana Rochen', 'Factora-Chua', 4, 3),
    ('Roni', 'Cruz', 5, NULL),
    ('Christopher', 'Contreras', 6, 5),
    ('Roni Rose', 'Alarcon', 7, 6),
    ('Jeffrey', 'Secor', 8, 6);