-- Table 1: Employees
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(80) NOT NULL,
    last_name VARCHAR(80) NOT NULL,
    job_title VARCHAR(80) NOT NULL,
    salary INT NOT NULL,
    isactive boolean NOT NULL
);
