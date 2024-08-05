package com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.dto.EmployeeDTO;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.service.EmployeeService;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.util.JwtUtil;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000") // Cambia esto a la URL de tu frontend

public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;

    @PostMapping("/register")
    public ResponseEntity<EmployeeDTO> registerEmployee(@RequestBody EmployeeDTO employeeDTO) {
        EmployeeDTO registeredEmployee = employeeService.registerEmployee(employeeDTO);
        return ResponseEntity.ok(registeredEmployee);
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginEmployee(@RequestBody EmployeeDTO loginRequest) {
        return employeeService.loginEmployee(loginRequest.getUsername(), loginRequest.getPassword())
                .map(employee -> {
                    String token = JwtUtil.generateToken(employee.getIdEmployee());
                    return ResponseEntity.ok("{\"token\":\"" + token + "\", \"userId\":\"" + employee.getIdEmployee() + "\"}");
                })
                .orElseGet(() -> ResponseEntity.status(401).body("{\"message\": \"Invalid credentials\"}"));
    }

    @GetMapping("/getEmployee/{id}")
    public ResponseEntity<Optional<EmployeeDTO>> getEmployee(@PathVariable Long id) {
        return ResponseEntity.ok(employeeService.getEmployee(id));
    }
}
