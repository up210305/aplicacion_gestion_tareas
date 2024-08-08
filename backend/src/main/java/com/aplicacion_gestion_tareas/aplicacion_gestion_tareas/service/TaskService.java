package com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;


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

    public List<TaskDTO> getTasksForToday(LocalDate today) {
        LocalDateTime startDate = today.atStartOfDay();
        LocalDateTime endDate = today.atTime(23, 59, 59, 999_999_999);
        
        List<Task> tasks = taskRepository.findByExpireDate(startDate, endDate);
        List<TaskDTO> taskDTOs = tasks.stream().map(taskMapper::toTaskDTO).collect(Collectors.toList());
    
        // Añade un log para verificar las fechas
        taskDTOs.forEach(task -> System.out.println("Task expire date: " + task.getExpireDate()));
    
        return taskDTOs;
    }

    
    
    
    
    
    
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
