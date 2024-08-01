package com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.mapper;

import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.dto.EmployeeDTO;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.model.Employee;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface EmployeeMapper {
    @Mapping(target = "idEmployee", ignore = true)
    Employee toEmployee(EmployeeDTO employeeDTO);

    EmployeeDTO toEmployeeDTO(Employee employee);
}
