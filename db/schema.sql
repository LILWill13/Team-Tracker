
-- drop the databse if it exists.
DROP DATABASE IF EXISTS company_roster;
-- creates the database.
CREATE DATABASE company_roster;
-- tells mysql to use this specific database.
USE company_roster;


-- creats a talble that holds the company departments.
-- each department is automatically givin an id based of the order it is enterd and each department MUST have and id
-- the departments MUST have a name with no more then 30 characters. eavh name must be unique.
CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
);

-- creates table that holds company roles for employees
-- id is a number that auro incriments and Must be provided and is also the primary key.
-- title is a string that can be at most 30 charactersand must be provided.
-- deparment id is the same is id in the departments tabel.
-- salary is a number that cannot be negitive and must be assigned.
-- department id assigend as a forgin key that refernces the ids in the department table.
CREATE TABLE role (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    department_id INT NOT NULL,
    salary INT UNSIGNED NOT NULL,
    INDEX (department_id),
    FOREIGN KEY (department_id) REFERENCES department (id) ON DELETE CASCADE
);

-- creats a table named employes.
-- id is a primary key that auto incriments and must be provided.
-- first and last name both take in strings of up to 30characters and must be provided
-- department id references the primary key of the departments table
-- rolde id references the primary key of the roles department table
-- manager id is optional refernces the employees table to find the manager based of if they have an id or not

CREATE TABLE employee (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    INDEX (role_id),
    FOREIGN KEY (role_id) REFERENCES role (id) ON DELETE CASCADE,
    manager_id INT,
    INDEX (manager_id),
    FOREIGN KEY (manager_id) REFERENCES employee (id) ON DELETE SET NULL
);