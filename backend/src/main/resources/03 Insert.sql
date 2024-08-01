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