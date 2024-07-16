CREATE DATABASE IF NOT EXISTS GESTION_TAREAS;

-- Drop the user if needed (uncomment if you need to drop the user)
-- DROP USER 'full'@'localhost';

-- Change the password for an existing user (uncomment if you need to change the password)
-- SET PASSWORD FOR 'full'@'localhost' = PASSWORD('full');

CREATE USER IF NOT EXISTS 'admin'@'localhost' IDENTIFIED BY 'admin';
USE GESTION_TAREAS;
GRANT ALL PRIVILEGES ON GESTION_TAREAS.* TO 'admin'@'localhost';

FLUSH PRIVILEGES;
