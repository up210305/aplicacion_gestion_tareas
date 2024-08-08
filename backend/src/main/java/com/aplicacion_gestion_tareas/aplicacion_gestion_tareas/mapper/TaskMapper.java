package com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.dto.CreateTaskDTO;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.dto.TaskDTO;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.dto.UpdateTaskDTO;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.model.Task;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface TaskMapper {

    TaskMapper INSTANCE = Mappers.getMapper(TaskMapper.class);

    Task toEntity(CreateTaskDTO taskDTO);

    Task toEntity(UpdateTaskDTO taskDTO);
    TaskDTO toDTO(Task task);
    
    // @Mapping(target = "idTask", ignore = true)
    // @Mapping(target = "creationDate", ignore = true)
    // Task toTask(TaskDTO taskDTO);

    @Mapping(source = "employee.idEmployee", target = "employeeId")
    @Mapping(source = "taskList.id", target = "taskListId")
    @Mapping(source = "title", target = "title")  // Mapeo para title
    @Mapping(source = "description", target = "description")  // Mapeo para description
    TaskDTO toTaskDTO(Task task);

    @Mapping(source = "employeeId", target = "employee.idEmployee")
    @Mapping(source = "taskListId", target = "taskList.id")
    @Mapping(source = "title", target = "title")  // Mapeo para title
    @Mapping(source = "description", target = "description")  // Mapeo para description
    Task toTask(TaskDTO taskDTO);

    
}
