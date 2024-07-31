package com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.model.Employee;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.service.EmployeeService;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.util.JwtUtil;

@RestController
@RequestMapping("/api/auth")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @PostMapping("/register")
    public ResponseEntity<Employee> registerEmployee(@RequestBody Employee employee) {
        Employee registeredEmployee = employeeService.registerEmployee(employee);
        return ResponseEntity.ok(registeredEmployee);
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginEmployee(@RequestBody Employee loginRequest) {
        return employeeService.loginEmployee(loginRequest.getUsername(), loginRequest.getPassword())
                .map(employee -> {
                    // Generar el token JWT usando el ID del empleado autenticado
                    String token = JwtUtil.generateToken(employee.getIdEmployee());
                    // Retornar el token en formato JSON
                    return ResponseEntity.ok("{\"token\":\"" + token + "\", \"userId\":\"" + employee.getIdEmployee() + "\"}");
                })
                .orElseGet(() -> ResponseEntity.status(401).body("{\"message\": \"Invalid credentials\"}"));
    }

    @GetMapping("/getEmployee/{id}")
    public ResponseEntity<Optional<Employee>> getEmployee(@PathVariable Long id) {
        return ResponseEntity.ok(employeeService.getEmployee(id));
    }
}
