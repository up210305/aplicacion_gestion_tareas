package com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.model.Employee;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.model.TaskList;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.repository.EmployeeRepository;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.repository.TaskListRepository;

@Service
public class TaskListService {

    @Autowired
    private TaskListRepository taskListRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    public List<TaskList> getTaskLists() {
        return taskListRepository.findAll();
    }

    public Optional<TaskList> getTaskList(Long id) {  // Cambiado a Long
        return taskListRepository.findById(id);
    }

    public TaskList saveTaskList(TaskList taskList, Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId).orElse(null);
        if (employee != null) {
            taskList.setEmployee(employee);
            return taskListRepository.save(taskList);
        } else {
            throw new RuntimeException("Employee not found");
        }
    }    

    public void deleteTaskList(Long id) {  // Cambiado a Long
        taskListRepository.deleteById(id);
    }
}
