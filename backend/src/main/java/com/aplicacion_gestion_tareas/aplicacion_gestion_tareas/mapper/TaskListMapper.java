package com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.dto.TaskListDTO;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.model.TaskList;

@Mapper
public interface TaskListMapper {
    TaskListMapper INSTANCE = Mappers.getMapper(TaskListMapper.class);

    @Mapping(source = "employee.idEmployee", target = "employeeId")
    TaskListDTO toTaskListDTO(TaskList taskList);

    @Mapping(source = "employeeId", target = "employee.idEmployee")
    TaskList toTaskList(TaskListDTO taskListDTO);
}
