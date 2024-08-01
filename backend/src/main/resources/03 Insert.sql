use GESTION_TAREAS;

INSERT INTO employees (last_name, first_name, username, password, active) VALUES
('Adminson', 'Admin', 'admin', 'admin', true);

INSERT INTO lists (list_name, description) VALUES 
('Lista de Tareas Diarias', 'Lista para gestionar las tareas diarias del equipo de trabajo'),
('Lista de Proyectos', 'Lista para administrar los diferentes proyectos en curso'),
('Lista de Compras', 'Lista de artículos que necesitan ser comprados para el almacén');

INSERT INTO tasks (task_title, task_description, creation_date, expire_date, completed, favorite, id_employee, id_list) VALUES
('TEST', 'TESTING', '2024-7-31', '2024-8-30', false, '1', '1');