package com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.model.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    Optional<Employee> findByUsername(String username);
}
