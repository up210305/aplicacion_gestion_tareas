package com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.mapper;

import java.util.List;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Named;
import org.mapstruct.NullValuePropertyMappingStrategy;

import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.dto.TaskListDTO;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.model.TaskList;

@Mapper(
  componentModel = "spring", 
  injectionStrategy = InjectionStrategy.CONSTRUCTOR, 
  nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface TaskListMapper {

  TaskListDTO toTaskListDTO(TaskList tasklist);

  TaskList toTaskList(TaskListDTO taskListDTO);

  @Named("TaskListList")
  default List<TaskListDTO> toTaskListDTOList(List<TaskList> sourceList) {
    return sourceList
        .stream()
        .map(this::toTaskListDTO)
        .toList();
  }
}