package com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.service;

import java.util.Optional;
import java.util.List;
import lombok.Builder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.dto.EmployeeDTO;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.mapper.EmployeeMapper;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.dto.CreateEmployeeDTO;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.exception.ExcepcionRecursoNoEncontrado;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.model.Employee;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.service.EmployeeService;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.repository.EmployeeRepository;

@Service
public class EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;

    public EmployeeDTO registerEmployee(EmployeeDTO employeeDTO) {
        Employee employee = EmployeeMapper.INSTANCE.toEmployee(employeeDTO);
        Employee registeredEmployee = employeeRepository.save(employee);
        return EmployeeMapper.INSTANCE.toEmployeeDTO(registeredEmployee);
    }

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }


    public Employee registerEmployee(Employee employee) {
        // No se aplica codificación de contraseñas
        return employeeRepository.save(employee);
    }

    public Optional<EmployeeDTO> loginEmployee(String username, String password) {
        Optional<Employee> employeeOpt = employeeRepository.findByUsername(username);
        return employeeOpt.filter(employee -> employee.getPassword().equals(password))
                .map(EmployeeMapper.INSTANCE::toEmployeeDTO);
    }

    public Optional<EmployeeDTO> getEmployee(Long id) {
        return employeeRepository.findById(id).map(EmployeeMapper.INSTANCE::toEmployeeDTO);
    }
    public Optional<Employee> loginEmployeeDTO(String username, String password) {
        return employeeRepository.findByUsernameAndPassword(username, password);
    }

    public Employee createEmployee(CreateEmployeeDTO createEmployeeDTO) {
        Employee newEmployee = Employee.builder()
                .lastName(createEmployeeDTO.getLastName())
                .firstName(createEmployeeDTO.getFirstName())
                .username(createEmployeeDTO.getUsername())
                .password(createEmployeeDTO.getPassword())
                .active(createEmployeeDTO.isActive())
                .build();
        return employeeRepository.save(newEmployee);
    }

    // public Optional<Employee> getEmployee(Long id) {
    //     return employeeRepository.findById(id);
    // }

    public Long getUsername(String username) {
        return employeeRepository.findIdByUsername(username);
    }

    public List<String> getUsernames() {
        return employeeRepository.findUsernames();
    }

    public Long findIdByUsername(String username) {
        return employeeRepository.findIdByUsername(username);
    }

    public void delete(Long id) {
        employeeRepository.deleteById(id);
    }

    public List<Employee> findActiveEmployeesByFirstNameAndLastName(String firstName, String lastName) {
        return employeeRepository.findActiveEmployeesByFirstNameAndLastName(firstName, lastName);
    }

    public List<Object[]> countEmployeesByActiveStatus() {
        return employeeRepository.countEmployeesByActiveStatus();
    }

    public List<Employee> findAll() {
        return employeeRepository.findAll();
    }

    
    public List<Employee> findActiveEmployees() {
        return employeeRepository.findActiveEmployees();
    }

    public List<Employee> findInactiveEmployees() {
        return employeeRepository.findInactiveEmployees();
    }

    public List<Employee> findAllOrderByLastName() {
        return employeeRepository.findAllOrderByLastName();
    }
}

