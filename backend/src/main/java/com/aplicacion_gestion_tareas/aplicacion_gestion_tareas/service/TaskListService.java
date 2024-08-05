package com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.dto.TaskDTO;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.dto.TaskListDTO;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.mapper.TaskListMapper;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.mapper.TaskMapper;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.model.TaskList;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.repository.TaskListRepository;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.repository.TaskRepository;

@Service
public class TaskListService {

    @Autowired
    private TaskListRepository taskListRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private TaskListMapper taskListMapper;

    @Autowired
    private TaskMapper taskMapper;

    public List<TaskDTO> getTasksByListId(Long listId) {
        return taskRepository.findByTaskListId(listId)
                .stream()
                .map(taskMapper::toTaskDTO)
                .collect(Collectors.toList());
    }

    public List<TaskListDTO> getTaskLists() {
        return taskListRepository.findAll()
                .stream()
                .map(taskListMapper::toTaskListDTO)
                .collect(Collectors.toList());
    }

    public Optional<TaskListDTO> getTaskListById(Long id) {
        return taskListRepository.findById(id)
                .map(taskListMapper::toTaskListDTO);
    }

    public TaskListDTO saveTaskList(TaskListDTO taskListDTO) {
        TaskList taskList = taskListMapper.toTaskList(taskListDTO);
        TaskList savedTaskList = taskListRepository.save(taskList);
        return taskListMapper.toTaskListDTO(savedTaskList);
    }

    public void deleteTaskList(Long id) {
        taskListRepository.deleteById(id);
    }
}
