package com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.dto.TaskListDTO;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.mapper.TaskListMapper;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.model.TaskList;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.repository.EmployeeRepository;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.repository.TaskListRepository;

@Service
public class TaskListService {
    @Autowired
    private TaskListRepository taskListRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    public List<TaskListDTO> getTaskLists() {
        return taskListRepository.findAll().stream()
                .map(TaskListMapper.INSTANCE::toTaskListDTO)
                .collect(Collectors.toList());
    }

    public Optional<TaskListDTO> getTaskList(Long id) {
        return taskListRepository.findById(id).map(TaskListMapper.INSTANCE::toTaskListDTO);
    }

    public TaskListDTO saveTaskList(TaskListDTO taskListDTO) {
        TaskList taskList = TaskListMapper.INSTANCE.toTaskList(taskListDTO);
        TaskList savedTaskList = taskListRepository.save(taskList);
        return TaskListMapper.INSTANCE.toTaskListDTO(savedTaskList);
    }

    public void deleteTaskList(Long id) {
        taskListRepository.deleteById(id);
    }
}

