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

    public Optional<Task> getTask(Long id) {  // Cambiado a Long
        return taskRepository.findById(id);
    }

    public List<Task> getTasksByListId(Long listId) {
        return taskRepository.findByTaskListId(listId);  // Cambiado al nombre correcto del método
    }

    public List<Task> getTasksWithoutListId() {
        // Implementar si es necesario
        return null;
    }

    public Task saveTask(Task task) { 
        return taskRepository.save(task); 
    }

    public void deleteTask(Long id) {  // Cambiado a Long
        taskRepository.deleteById(id);
    }
}
