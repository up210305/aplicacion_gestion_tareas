package com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.dto.TaskListDTO;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.mapper.TaskListMapper;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.model.TaskList;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.repository.TaskListRepository;

@Service
public class TaskListService {

    @Autowired
    private TaskListRepository taskListRepository;

    @Autowired
    private TaskListMapper taskListMapper;

    public List<TaskListDTO> getTaskLists() {
        List<TaskList> taskLists = taskListRepository.findAll();
        return taskListMapper.toTaskListDTOList(taskLists);
    }

    public Optional<TaskListDTO> getTaskListById(Long listId) {
        return taskListRepository.findById(listId)
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
