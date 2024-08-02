package com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.exception.ExcepcionRecursoNoEncontrado;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.model.Employee;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.service.EmployeeService;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.repository.EmployeeRepository;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;


    public Employee registerEmployee(Employee employee) {
        // No se aplica codificación de contraseñas
        return employeeRepository.save(employee);
    }

    public Optional<Employee> loginEmployee(String username, String password) {
        Optional<Employee> employeeOpt = employeeRepository.findByUsername(username);
        if (employeeOpt.isPresent() && employeeOpt.get().getPassword().equals(password)) {
            return employeeOpt;
        }
        return Optional.empty();
    }

    public Optional<Employee> getEmployee(Long id) {
        return employeeRepository.findById(id);
    }

    public Long getUsername(String username) {
        return employeeRepository.findIdByUsername(username);
    }

}
