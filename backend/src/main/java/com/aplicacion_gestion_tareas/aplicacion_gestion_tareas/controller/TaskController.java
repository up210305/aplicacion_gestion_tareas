package com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.dto.TaskDTO;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.model.Task;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.service.TaskService;

@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {
    @Autowired
    private TaskService taskService;

    @GetMapping("/allTasks")
    public List<TaskDTO> getTasks() {
        return taskService.getTasks();
    }

    @GetMapping("/today")
    public ResponseEntity<List<TaskDTO>> getTasksForToday() {
        LocalDate today = LocalDate.now();
        List<TaskDTO> tasks = taskService.getTasksForToday(today);
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @GetMapping("/getTask/{id}")
    public ResponseEntity<TaskDTO> getTask(@PathVariable Long id) {
        Optional<TaskDTO> task = taskService.getTask(id);
        return task.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/list/{listId}")
    public ResponseEntity<List<TaskDTO>> getTasksByListId(@PathVariable Long listId) {
        List<TaskDTO> tasks = taskService.getTasksByListId(listId);
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/no-list")
    public List<TaskDTO> getTasksWithoutListId() {
        return taskService.getTasksWithoutListId();
    }

    // @PostMapping("/createTask")
    // public TaskDTO createTask(@RequestBody TaskDTO taskDTO) {
    //     return taskService.saveTask(taskDTO);
    // }

    @DeleteMapping("/deleteTask/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
    }    
    // @GetMapping("/getTask/{id}")
    // public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
    //     Optional<Task> task = taskService.getTask(id);
    //     return task.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    // }

    // @PostMapping("/createTask")
    // public ResponseEntity<Task> createTask(@RequestBody Task task) {
    //     Task savedTask = taskService.saveTask(task);
    //     return new ResponseEntity<>(savedTask, HttpStatus.CREATED);
    // }

    // @PostMapping("/createTaskDTO")
    // public ResponseEntity<Task> createTask(@RequestBody TaskDTO taskDTO) {
    //     Task createdTask = taskService.saveTaskDTO(taskDTO);
    //     return ResponseEntity.ok(createdTask);
    // }

    // @PutMapping("/updateTask/{id}")
    // public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task task) {
    //     if (taskService.getTask(id).isPresent()) {
    //         task.setIdTask(id);
    //         Task updatedTask = taskService.saveTask(task);
    //         return ResponseEntity.ok(updatedTask);
    //     } else {
    //         return ResponseEntity.notFound().build();
    //     }
    // }

    // @DeleteMapping("/deleteTask/{id}")
    // public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
    //     if (taskService.getTask(id).isPresent()) {
    //         taskService.deleteTask(id);
    //         return ResponseEntity.noContent().build();
    //     } else {
    //         return ResponseEntity.notFound().build();
    //     }
    // }

    @GetMapping("/completed")
    public ResponseEntity<List<Task>> getCompletedTasks() {
        return ResponseEntity.ok(taskService.findCompletedTasks());
    }

    @GetMapping("/employee/{idEmployee}")
    public ResponseEntity<List<Task>> getTasksByEmployeeId(@PathVariable Long idEmployee) {
        return ResponseEntity.ok(taskService.findTasksByEmployeeId(idEmployee));
    }

    // @GetMapping("/list/{idList}")
    // public ResponseEntity<List<Task>> getTasksByListId(@PathVariable Long idList) {
    //     return ResponseEntity.ok(taskService.findTasksByListId(idList));
    // }

    @GetMapping("/important")
    public List<TaskDTO> getImportantTasks() {
        return taskService.getImportantTasks();
    }
}
