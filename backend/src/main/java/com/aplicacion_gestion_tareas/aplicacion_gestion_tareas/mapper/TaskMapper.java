package com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.dto.TaskDTO;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.model.Task;

@Mapper
public interface TaskMapper {
    TaskMapper INSTANCE = Mappers.getMapper(TaskMapper.class);

    @Mapping(source = "employee.idEmployee", target = "employeeId")
    @Mapping(source = "taskList.id", target = "taskListId")
    TaskDTO toTaskDTO(Task task);

    @Mapping(source = "employeeId", target = "employee.idEmployee")
    @Mapping(source = "taskListId", target = "taskList.id")
    Task toTask(TaskDTO taskDTO);
}
