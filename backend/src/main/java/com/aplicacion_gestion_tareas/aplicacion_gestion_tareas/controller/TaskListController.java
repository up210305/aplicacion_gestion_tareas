package com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.model.Employee;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.model.Task;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.model.TaskList;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.model.TaskListRequest;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.service.EmployeeService;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.service.TaskListService;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.service.TaskService;

@RestController
@RequestMapping("/api/lists")
public class TaskListController {

    @Autowired
    private TaskListService taskListService;

    @Autowired
    private TaskService taskService;

    @Autowired
    private EmployeeService employeeService;

    @GetMapping
    public List<TaskList> getAllTaskLists() {
        return taskListService.getTaskLists();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskList> getTaskListById(@PathVariable Long id) {
        Optional<TaskList> taskList = taskListService.getTaskList(id);
        return taskList.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/{listId}/tasks")
    public ResponseEntity<List<Task>> getTasksByList(@PathVariable Long listId) {
        List<Task> tasks = taskService.getTasksByListId(listId);
        if (tasks.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(tasks);
    }

    @PostMapping
    public ResponseEntity<TaskList> createTaskList(@RequestBody TaskListRequest taskListRequest) {
        Long employeeId = taskListRequest.getEmployeeId();
        Optional<Employee> employeeOptional = employeeService.getEmployee(employeeId);
        if (!employeeOptional.isPresent()) {
            return ResponseEntity.badRequest().body(null);
        }
        TaskList taskList = new TaskList();
        taskList.setName(taskListRequest.getListName()); // Usa 'setName' para el nombre de la lista
        taskList.setDescription(taskListRequest.getDescription());
        taskList.setEmployee(employeeOptional.get());
        TaskList savedTaskList = taskListService.saveTaskList(taskList, employeeId);
        return new ResponseEntity<>(savedTaskList, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskList> updateTaskList(@PathVariable Long id, @RequestBody TaskList taskList) {
        Optional<TaskList> existingTaskList = taskListService.getTaskList(id);
        if (existingTaskList.isPresent()) {
            TaskList updatedTaskList = existingTaskList.get();
            updatedTaskList.setName(taskList.getName()); // Usa 'setName'
            updatedTaskList.setDescription(taskList.getDescription());
            // No modificamos el ID aquí
            TaskList savedTaskList = taskListService.saveTaskList(updatedTaskList, id);
            return ResponseEntity.ok(savedTaskList);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTaskList(@PathVariable Long id) {
        if (taskListService.getTaskList(id).isPresent()) {
            taskListService.deleteTaskList(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
