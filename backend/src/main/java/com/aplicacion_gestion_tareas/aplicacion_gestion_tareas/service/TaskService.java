package com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.dto.TaskDTO;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.mapper.TaskMapper;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.model.Task;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.repository.TaskRepository;

@Service
public class TaskService {
    @Autowired 
    private TaskRepository taskRepository;

    @Autowired
    private TaskMapper taskMapper;

    public List<TaskDTO> findAll() {
        List<Task> products = taskRepository.findAll();
        return products.stream()
                .map(taskMapper::toTaskDTO)
                .collect(Collectors.toList());
    }
}
