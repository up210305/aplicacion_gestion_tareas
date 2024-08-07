package com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.repository;

import java.util.Optional;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.model.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    Optional<Employee> findByUsername(String username);

    @Query(value = "SELECT * FROM employees WHERE username = ?1", nativeQuery = true)
    Employee findByUsername2(String username);

    @Query(value = "SELECT id_employee FROM employees WHERE username = ?1", nativeQuery = true)
    Long findIdByUsername(String username);

    @Query(value = "SELECT username FROM employees", nativeQuery = true)
    List<String> findUsernames();

    @Query("SELECT e FROM Employee e WHERE e.active = true AND e.firstName = ?1 AND e.lastName = ?2")
    List<Employee> findActiveEmployeesByFirstNameAndLastName(String firstName, String lastName);

    @Query("SELECT e.active, COUNT(e) FROM Employee e GROUP BY e.active")
    List<Object[]> countEmployeesByActiveStatus();

    @Query(value = "SELECT * FROM employees WHERE active = true", nativeQuery = true)
    List<Employee> findActiveEmployees();

    // Encontrar empleados inactivos
    @Query(value = "SELECT * FROM employees WHERE active = false", nativeQuery = true)
    List<Employee> findInactiveEmployees();

    // Encontrar todos los empleados ordenados por apellido
    @Query(value = "SELECT * FROM employees ORDER BY last_name", nativeQuery = true)
    List<Employee> findAllOrderByLastName();
}