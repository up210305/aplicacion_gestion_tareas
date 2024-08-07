package com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.dto.TaskListRequestDTO;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.model.TaskList;

@Mapper
public interface TaskListRequestMapper {

    TaskListRequestMapper INSTANCE = Mappers.getMapper(TaskListRequestMapper.class);

    TaskList toTaskList(TaskListRequestDTO taskListRequestDTO);
}
