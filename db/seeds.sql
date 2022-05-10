-- tells sql we want to use the database of company_roster
USE company_roster;

-- adds for departments into the department tabel.
-- the id auto incriments so the id of 1 is devlopment, and 4 is sales
INSERT INTO department
    (name)
VALUES
    ('Devlopment'),
    ('Legal'),
    ('Finance'),
    ('Sales');

-- addes the employee title, sallary and links the last number to the id for each department that was created with the values above
INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Lead devloper', 175000, 1),
    ('Software devloper', 115000, 1),
    ('Software devloper', 115000, 1),
    ('Software devloper', 115000, 1),
    ('Legal Team Lead', 300000, 2),
    ('Lawyer', 210000, 2),
    ('Account Manager', 190000, 3),
    ('Accountant', 110000, 3),
    ('Sales Lead', 300000, 4),
    ('Salesperson', 100000, 4),
    ('Salesperson', 100000, 4),
    ('Salesperson', 100000, 4);

-- addes the employee first and last name. then the the role id that was created with the values above. the manager id is the given to the employess eho are not managers and they are the managers employee ids
INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Noah', 'Gaston', 1, NULL), -- Lead devloper
    ('Jay', 'Z', 2, 1), -- Software developer
    ('Sarah', 'Wills', 3, 1), -- Software developer
    ('William', 'Striker', 4, 1), -- Software developer
    ('Logan', 'Jake', 5, NULL), -- Legal team lead
    ('Kevin', 'Gates', 6, 5), -- Lawyer
    ('Kodak', 'black', 7, NULL), -- Accountant manager
    ('Chris', 'Brown', 8, 7), -- Accountant
    ('Abury', 'Grahm', 9, NULL), -- Sales lead
    ('Cam', 'Newton', 10, 9), -- Salesperson
    ('Kennan', 'Allen', 11, 9), -- Salesperson
    ('Tom', 'Brady', 12, 9); -- Salesperson
