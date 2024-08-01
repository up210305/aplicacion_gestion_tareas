-- Base de datos: GESTION_TAREAS
USE GESTION_TAREAS;

DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS lists;

-- Crear tabla employees
CREATE TABLE employees (
  id_employee INT(10) AUTO_INCREMENT PRIMARY KEY,
  last_name VARCHAR(20) NOT NULL,
  first_name VARCHAR(10) NOT NULL,
  username VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  active BOOLEAN
);

-- Crear tabla lists
CREATE TABLE lists (
  id_list INT(10) AUTO_INCREMENT PRIMARY KEY,
  list_name VARCHAR(255) NOT NULL,
  description VARCHAR(255)
);

-- Crear tabla tasks
CREATE TABLE tasks (
  id_task INT(10) AUTO_INCREMENT PRIMARY KEY,
  task_title VARCHAR(255) NOT NULL,
  task_description VARCHAR(255),
  creation_date DATE NOT NULL,
  expire_date DATE,
  completed BOOLEAN,
  important BOOLEAN,
  id_employee INT(10),
  id_list INT(10),
  CONSTRAINT FK_Emp_Task FOREIGN KEY (id_employee) 
    REFERENCES employees (id_employee),
  CONSTRAINT FK_List_Task FOREIGN KEY (id_list) 
    REFERENCES lists (id_list)
);
