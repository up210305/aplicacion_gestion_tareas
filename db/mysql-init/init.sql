CREATE DATABASE IF NOT EXISTS GESTION_TAREAS;

USE GESTION_TAREAS;

-- Elimina las tablas si existen
DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS lists;
DROP TABLE IF EXISTS employees;

-- Crear tabla employees
CREATE TABLE employees (
  id_employee BIGINT AUTO_INCREMENT PRIMARY KEY,
  last_name VARCHAR(20) NOT NULL,
  first_name VARCHAR(10) NOT NULL,
  username VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  active BOOLEAN
);

-- Crear tabla lists con referencia a employees
CREATE TABLE lists (
  id_list BIGINT AUTO_INCREMENT PRIMARY KEY,
  list_name VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  id_employee BIGINT NOT NULL,
  CONSTRAINT FK_Emp_List FOREIGN KEY (id_employee) 
    REFERENCES employees (id_employee)
);

-- Crear tabla tasks con referencia a lists y employees
CREATE TABLE tasks (
  id_task BIGINT AUTO_INCREMENT PRIMARY KEY,
  task_title VARCHAR(255) NOT NULL,
  task_description VARCHAR(255),
  creation_date DATE NOT NULL,
  expire_date DATE,
  completed BOOLEAN,
  important BOOLEAN,
  id_employee BIGINT NOT NULL,
  id_list BIGINT,
  CONSTRAINT FK_Emp_Task FOREIGN KEY (id_employee) 
    REFERENCES employees (id_employee),
  CONSTRAINT FK_List_Task FOREIGN KEY (id_list) 
    REFERENCES lists (id_list)
);

use GESTION_TAREAS;

-- Insertar datos en la tabla employees
INSERT INTO employees (last_name, first_name, username, password, active) VALUES
('Adminson', 'Admin', 'admin', 'admin', true);

-- Insertar datos en la tabla lists
INSERT INTO lists (list_name, description, id_employee) VALUES 
('Lista de Tareas Diarias', 'Lista para gestionar las tareas diarias del equipo de trabajo', 1),
('Lista de Proyectos', 'Lista para administrar los diferentes proyectos en curso', 1),
('Lista de Compras', 'Lista de artículos que necesitan ser comprados para el almacén', 1);

-- Insertar datos en la tabla tasks
INSERT INTO tasks (task_title, task_description, creation_date, expire_date, completed, important, id_employee, id_list) VALUES
('TEST', 'TESTING', '2024-07-31', '2024-08-30', false, false, 1, 1),
('TEST2', 'TESTING', '2024-07-31', '2024-08-30', false, false, 1, 2),
('TEST3', 'TESTING', '2024-07-31', '2024-08-30', false, false, 1, 3);