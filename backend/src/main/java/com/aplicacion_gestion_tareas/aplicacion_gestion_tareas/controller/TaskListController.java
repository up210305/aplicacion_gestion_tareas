package com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.dto.TaskListDTO;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.service.TaskListService;

@CrossOrigin(origins = "http://localhost:3000")  // Ajusta el origen según sea necesario
@RestController
@RequestMapping("/api/lists")  // Asegúrate de que la ruta base es correcta
public class TaskListController {

    @Autowired
    private TaskListService taskListService;

    @GetMapping
    public List<TaskListDTO> getAllTaskLists() {
        return taskListService.getTaskLists();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskListDTO> getTaskListById(@PathVariable Long id) {
        Optional<TaskListDTO> taskListDTO = taskListService.getTaskList(id);
        return taskListDTO.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<TaskListDTO> createTaskList(@RequestBody TaskListDTO taskListDTO) {
        TaskListDTO savedTaskListDTO = taskListService.saveTaskList(taskListDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedTaskListDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTaskList(@PathVariable Long id) {
        taskListService.deleteTaskList(id);
        return ResponseEntity.noContent().build();
    }
}
