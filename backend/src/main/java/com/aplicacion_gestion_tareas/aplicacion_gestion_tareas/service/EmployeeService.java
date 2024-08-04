package com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.dto.EmployeeDTO;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.mapper.EmployeeMapper;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.model.Employee;
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

    public Optional<EmployeeDTO> loginEmployee(String username, String password) {
        Optional<Employee> employeeOpt = employeeRepository.findByUsername(username);
        return employeeOpt.filter(employee -> employee.getPassword().equals(password))
                .map(EmployeeMapper.INSTANCE::toEmployeeDTO);
    }

    public Optional<EmployeeDTO> getEmployee(Long id) {
        return employeeRepository.findById(id).map(EmployeeMapper.INSTANCE::toEmployeeDTO);
    }
}

