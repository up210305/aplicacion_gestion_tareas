package com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.controller;

import java.util.Optional;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.dto.EmployeeDTO;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.dto.CreateEmployeeDTO;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.dto.EmployeeLoginDTO;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.exception.ExcepcionRecursoNoEncontrado;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.model.Employee;
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

    @PostMapping("/loginDTO")
    public ResponseEntity<String> loginEmployeeWithDTO(@RequestBody EmployeeLoginDTO loginRequest) {
        return employeeService.loginEmployee(loginRequest.getUsername(), loginRequest.getPassword())
                .map(employee -> {
                    // Generar el token JWT usando el ID del empleado autenticado
                    String token = JwtUtil.generateToken(employee.getIdEmployee());
                    // Retornar el token en formato JSON
                    return ResponseEntity.ok("{\"token\":\"" + token + "\", \"userId\":\"" + employee.getIdEmployee() + "\"}");
                })
                .orElseGet(() -> ResponseEntity.status(401).body("{\"message\": \"Invalid credentials\"}"));
    }

    // Método para crear un empleado usando CreateEmployeeDTO
    @PostMapping("/createEmployeeDTO")
    public ResponseEntity<Employee> createEmployee(@RequestBody CreateEmployeeDTO createEmployeeDTO) {
        Employee createdEmployee = employeeService.createEmployee(createEmployeeDTO);
        return ResponseEntity.ok(createdEmployee);
    }

    @GetMapping("/getEmployee/{id}")
    public ResponseEntity<Optional<EmployeeDTO>> getEmployee(@PathVariable Long id) {
        return ResponseEntity.ok(employeeService.getEmployee(id));
    }


    // @GetMapping("/getUsername/{id}")
    // public ResponseEntity<String> getUsername(@PathVariable Long id) throws ExcepcionRecursoNoEncontrado {
    //     Optional<Employee> employeeOptional = employeeService.getEmployee(id);
    //     if (employeeOptional.isPresent()) {
    //         Employee employee = employeeOptional.get();
    //         return ResponseEntity.ok(employee.getUsername());
    //     } else {
    //         throw new ExcepcionRecursoNoEncontrado("User not found");
    //     }
    // }

    @GetMapping("/getUserId/{username}")
    public ResponseEntity<Long> getUserId(@PathVariable String username) {
        Long id = employeeService.getUsername(username);
        return ResponseEntity.ok(id);
    }

    @GetMapping ({ "/getUsernames"})
    public ResponseEntity<List<String>> getUsernames(){
        return ResponseEntity.ok(employeeService.getUsernames());
    }

    @GetMapping({"/getEmployeeIdByUsername/{username}"})
    public ResponseEntity<Long> getUserIdByUsername(@PathVariable String username) throws ExcepcionRecursoNoEncontrado{
        Long idEmployee = employeeService.findIdByUsername(username);
        if (idEmployee!=null) {
        return ResponseEntity.ok(employeeService.findIdByUsername(username));
        } else {
        throw new ExcepcionRecursoNoEncontrado("Username doesn't exist");
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delUser(@PathVariable Long id) throws ExcepcionRecursoNoEncontrado {
        Optional<EmployeeDTO> employeeToDelete = employeeService.getEmployee(id);
        if (employeeToDelete.isPresent()) {
        employeeService.delete(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Employee " + id + " succesfully deleted");
        } else {
        throw new ExcepcionRecursoNoEncontrado("Employee " + id  + " not found within the database. Unable to delete");
        }
    }

    @GetMapping("/employeesByFirstAndLastName/{firstName}/{lastName}")
    public ResponseEntity<List<Employee>> getEmployeesByFirstAndLastName(@PathVariable String firstName, @PathVariable String lastName) {
        return ResponseEntity.ok(employeeService.findActiveEmployeesByFirstNameAndLastName(firstName, lastName));
    }

    @GetMapping("/countEmployeesByStatus")
    public ResponseEntity<List<Object[]>> countEmployeesByStatus() {
        return ResponseEntity.ok(employeeService.countEmployeesByActiveStatus());
    }

    @GetMapping("/active")
    public ResponseEntity<List<Employee>> getActiveEmployees() {
        return ResponseEntity.ok(employeeService.findActiveEmployees());
    }

    @GetMapping("/inactive")
    public ResponseEntity<List<Employee>> getInactiveEmployees() {
        return ResponseEntity.ok(employeeService.findInactiveEmployees());
    }

    @GetMapping("/allOrderedByLastName")
    public ResponseEntity<List<Employee>> getAllEmployeesOrderedByLastName() {
        return ResponseEntity.ok(employeeService.findAllOrderByLastName());
    }
}
