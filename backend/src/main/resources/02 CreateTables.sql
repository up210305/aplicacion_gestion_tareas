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
  id_list BIGINT NOT NULL,
  CONSTRAINT FK_Emp_Task FOREIGN KEY (id_employee) 
    REFERENCES employees (id_employee),
  CONSTRAINT FK_List_Task FOREIGN KEY (id_list) 
    REFERENCES lists (id_list)
);
