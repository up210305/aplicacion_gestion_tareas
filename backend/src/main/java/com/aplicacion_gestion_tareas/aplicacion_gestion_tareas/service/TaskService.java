package com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.service;

import java.util.List;
import java.util.Optional;
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

    public List<TaskDTO> getTasks() { 
        return taskRepository.findAll().stream()
                .map(TaskMapper.INSTANCE::toTaskDTO)
                .collect(Collectors.toList());
    }

    // public List<Task> getTasks() {
    //     return taskRepository.findAll();
    // }

    public Optional<TaskDTO> getTask(Long id) {
        return taskRepository.findById(id).map(TaskMapper.INSTANCE::toTaskDTO);
    }

    public List<TaskDTO> getTasksByListId(Long listId) {
        return taskRepository.findByTaskListId(listId).stream()
            .map(TaskMapper.INSTANCE::toTaskDTO)
            .collect(Collectors.toList());
    }

    public List<TaskDTO> getTasksWithoutListId() {
        return taskRepository.findByTaskListIdIsNull().stream()
                .map(TaskMapper.INSTANCE::toTaskDTO)
                .collect(Collectors.toList());
    }

    // public TaskDTO saveTask(TaskDTO taskDTO) {
    //     Task task = TaskMapper.INSTANCE.toTask(taskDTO);
    //     Task savedTask = taskRepository.save(task);
    //     return TaskMapper.INSTANCE.toTaskDTO(savedTask);
    // }

    // public Task saveTaskDTO(TaskDTO taskDTO) {
    //     Task task = taskMapper.toEntity(taskDTO);
    //     return taskRepository.save(task);
    // }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    public List<Task> findCompletedTasks() {
        return taskRepository.findCompletedTasks();
    }

    public List<Task> findTasksByEmployeeId(Long idEmployee) {
        return taskRepository.findTasksByEmployeeId(idEmployee);
    }

    public List<Task> findTasksByListId(Long idList) {
        return taskRepository.findTasksByListId(idList);
    }
}
