package com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;


import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.model.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    Optional<Employee> findByUsername(String username);

    @Query(value = "SELECT * FROM employees WHERE username = ?1", nativeQuery = true)
    Employee findByUsername2(String username);

    @Query(value = "SELECT id_employee FROM employees WHERE username = ?1", nativeQuery = true)
    Long findIdByUsername(String username);

    @Query(value = "SELECT username FROM employees", nativeQuery = true)
    List<String> findUsernames();
}
