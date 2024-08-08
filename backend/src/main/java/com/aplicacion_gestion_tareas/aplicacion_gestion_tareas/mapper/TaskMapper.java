package com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.mapper;

import java.util.List;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Named;
import org.mapstruct.NullValuePropertyMappingStrategy;

import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.dto.TaskDTO;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.model.Task;

@Mapper(
  componentModel = "spring", 
  injectionStrategy = InjectionStrategy.CONSTRUCTOR, 
  nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface TaskMapper {

  TaskDTO toTaskDTO(Task task);

  Task toTask(TaskDTO taskDTO);

  @Named("TaskList")
  default List<TaskDTO> toTaskDTOList(List<Task> sourceList) {
    return sourceList
        .stream()
        .map(this::toTaskDTO)
        .toList();
  }
}