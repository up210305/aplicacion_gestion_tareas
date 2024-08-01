package com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.dto.TaskDTO;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.model.Task;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.service.TaskService;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping
    public List<Task> getAllTasks() {
        return taskService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
        Optional<Task> task = taskService.findById(id);
        return task.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Task createTask(@RequestBody TaskDTO taskDTO) {
        Task task = new Task();
        task.setTaskTitle(taskDTO.getTaskTitle());
        task.setTaskDescription(taskDTO.getTaskDescription());
        task.setCreationDate(taskDTO.getCreationDate());
        task.setExpireDate(taskDTO.getExpireDate());
        task.setCompleted(taskDTO.getCompleted());
        task.setFavorite(taskDTO.getFavorite());
        task.setEmployee(null); // Set the employee if necessary
        task.setTaskList(null); // Set the task list if necessary
        return taskService.save(task);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody TaskDTO taskDTO) {
        Optional<Task> existingTask = taskService.findById(id);
        if (existingTask.isPresent()) {
            Task task = existingTask.get();
            task.setTaskTitle(taskDTO.getTaskTitle());
            task.setTaskDescription(taskDTO.getTaskDescription());
            task.setCreationDate(taskDTO.getCreationDate());
            task.setExpireDate(taskDTO.getExpireDate());
            task.setCompleted(taskDTO.getCompleted());
            task.setFavorite(taskDTO.getFavorite());
            task.setEmployee(null); // Set the employee if necessary
            task.setTaskList(null); // Set the task list if necessary
            return ResponseEntity.ok(taskService.save(task));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        taskService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/favorite")
    public ResponseEntity<Task> toggleFavorite(@PathVariable Long id) {
        Optional<Task> existingTask = taskService.findById(id);
        if (existingTask.isPresent()) {
            Task task = existingTask.get();
            task.setFavorite(!task.getFavorite());
            return ResponseEntity.ok(taskService.save(task));
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
