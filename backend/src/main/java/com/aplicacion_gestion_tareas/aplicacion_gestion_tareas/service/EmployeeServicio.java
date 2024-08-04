package com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.service;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.RequestBody;

import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.dto.CreateEmployeeDTO;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.dto.EmployeeDTO;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.exception.ExcepcionRecursoNoEncontrado;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.model.Employee;

import jakarta.validation.Valid;

public interface EmployeeServicio {

    public List<Employee> findAll();

    public List<EmployeeDTO> findAllDto();

    public Employee getEmployee(long employeeid)       throws ExcepcionRecursoNoEncontrado;

    public EmployeeDTO getEmployeeDTO(long employeeid) throws ExcepcionRecursoNoEncontrado;

    public Employee save(Employee data);                 // Altas
    public EmployeeDTO saveDTO(CreateEmployeeDTO data);  // Altas

    public void delete(long employeeid); // Bajas

    public void update(long employeeid, Employee data) throws ExcepcionRecursoNoEncontrado; // Cambios

    public Collection<Employee> selectEmployees(Boolean filtro);

    // public List<Map<String, Object>> saleByEmployee();

    public List<String> getUsernames();

    public Employee findByUsername2 (String username);

    public Long findIdByUsername (String username);

    public List<String> findUsernames();

    List<Employee> findActiveEmployeesByFirstNameAndLastName(String firstName, String lastName);

    List<Object[]> countEmployeesByActiveStatus();


    List<Employee> findActiveEmployees();

    List<Employee> findInactiveEmployees();

    List<Employee> findAllOrderByLastName();
}
