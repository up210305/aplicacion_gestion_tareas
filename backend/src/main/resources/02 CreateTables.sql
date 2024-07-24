-- Base de datos: full
use GESTION_TAREAS;

CREATE TABLE employees (
  id_employee int(10) AUTO_INCREMENT PRIMARY KEY,
  last_name varchar(20) NOT NULL,
  first_name varchar(10) NOT NULL,
  username varchar(100) NOT NULL,
  password varchar(100) NOT NULL,
  active  boolean
);

CREATE TABLE tasks (
  id_task int(10) AUTO_INCREMENT PRIMARY KEY,
  id_employee int(10),
  task_date date,
  task_details char,
  CONSTRAINT Emp_Ord FOREIGN KEY (id_employee) 
            REFERENCES employees (id_employee)
);

CREATE TABLE taskDetails (
  id_task int(10),
  quantity smallint(5),
  discount double,
  CONSTRAINT PRIMARY_KEY PRIMARY KEY(id_order, id_product),
  CONSTRAINT ord_det FOREIGN KEY (id_order)   REFERENCES orders (id_order),
  CONSTRAINT det_pro FOREIGN KEY (id_product) REFERENCES products (id_product)
  );
