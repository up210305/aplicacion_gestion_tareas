package com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.dto.TaskDTO;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.service.TaskService;

@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins = "http://localhost:3000") // Cambia esto a la URL de tu frontend
public class TaskController {
    @Autowired
    private TaskService taskService;

    @GetMapping
    public List<TaskDTO> getTasks() {
        return taskService.getTasks();
    }

    @GetMapping("/{id}")
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

    @PostMapping
    public TaskDTO createTask(@RequestBody TaskDTO taskDTO) {
        return taskService.saveTask(taskDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
    }
}
