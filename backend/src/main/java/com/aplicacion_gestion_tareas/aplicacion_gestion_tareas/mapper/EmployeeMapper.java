package com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.mapper;

import java.util.List;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Named;
import org.mapstruct.NullValuePropertyMappingStrategy;

import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.dto.EmployeeDTO;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.model.Employee;

@Mapper(
  componentModel = "spring", 
  injectionStrategy = InjectionStrategy.CONSTRUCTOR, 
  nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface EmployeeMapper {

  EmployeeDTO toEmployeeDTO(Employee Employee);

  Employee toEmployee(EmployeeDTO EmployeeDTO);

  @Named("EmployeeList")
  default List<EmployeeDTO> toEmployeeDTOList(List<Employee> sourceList) {
    return sourceList
        .stream()
        .map(this::toEmployeeDTO)
        .toList();
  }
}