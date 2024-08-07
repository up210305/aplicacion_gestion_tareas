package com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.dto.TaskDTO;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.model.Task;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface TaskMapper {

    TaskMapper INSTANCE = Mappers.getMapper(TaskMapper.class);

    Task toEntity(TaskDTO taskDTO);
    TaskDTO toDTO(Task task);
    
    // @Mapping(target = "idTask", ignore = true)
    // @Mapping(target = "creationDate", ignore = true)
    // Task toTask(TaskDTO taskDTO);

    @Mapping(source = "employee.idEmployee", target = "employeeId")
    @Mapping(source = "taskList.id", target = "taskListId")
    TaskDTO toTaskDTO(Task task);

    @Mapping(source = "employeeId", target = "employee.idEmployee")
    @Mapping(source = "taskListId", target = "taskList.id")
    Task toTask(TaskDTO taskDTO);
}
