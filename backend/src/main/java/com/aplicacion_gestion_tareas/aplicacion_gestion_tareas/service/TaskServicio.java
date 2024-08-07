package com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.dto.TaskDTO;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.model.Task;

@Service
public interface TaskServicio {

    Task saveTaskDTO(TaskDTO taskDTO);

    List<Task> findCompletedTasks();


    List<Task> findTasksByEmployeeId(Long idEmployee);

    List<Task> findTasksByListId(Long idList);
} 