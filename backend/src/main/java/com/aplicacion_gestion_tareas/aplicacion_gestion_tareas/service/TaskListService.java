package com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.model.TaskList;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.repository.TaskListRepository;

@Service
public class TaskListService {

    @Autowired
    private TaskListRepository taskListRepository;

    public List<TaskList> findAll() {
        return taskListRepository.findAll();
    }

    public Optional<TaskList> findById(Long id) {
        return taskListRepository.findById(id);
    }

    public TaskList save(TaskList taskList) {
        return taskListRepository.save(taskList);
    }

    public void deleteById(Long id) {
        taskListRepository.deleteById(id);
    }
}
