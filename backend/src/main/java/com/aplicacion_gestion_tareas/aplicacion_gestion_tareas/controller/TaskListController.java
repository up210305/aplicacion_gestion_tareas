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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.model.Employee;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.model.Task;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.model.TaskList;
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
    public ResponseEntity<TaskList> createTaskList(@RequestBody TaskList taskList, @RequestParam Long employeeId) {
        Optional<Employee> employeeOptional = employeeService.getEmployee(employeeId);
        if (!employeeOptional.isPresent()) {
            return ResponseEntity.badRequest().body(null);
        }
        taskList.setEmployee(employeeOptional.get());
        TaskList savedTaskList = taskListService.saveTaskList(taskList, employeeId);
        return new ResponseEntity<>(savedTaskList, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskList> updateTaskList(@PathVariable Long id, @RequestBody TaskList taskList) {
        if (taskListService.getTaskList(id).isPresent()) {
            taskList.setIdList(id);
            TaskList updatedTaskList = taskListService.saveTaskList(taskList, id);
            return ResponseEntity.ok(updatedTaskList);
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
