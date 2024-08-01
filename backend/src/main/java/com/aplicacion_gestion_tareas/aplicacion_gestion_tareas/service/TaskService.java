package com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.model.Task;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.repository.TaskRepository;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    public List<Task> getTasks() {
        return taskRepository.findAll();
    }

    public Optional<Task> getTask(Long id) {
        return taskRepository.findById(id);
    }

    public Task saveTask(Task task) {
        return taskRepository.save(task); // Devuelve la tarea guardada
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }
}
