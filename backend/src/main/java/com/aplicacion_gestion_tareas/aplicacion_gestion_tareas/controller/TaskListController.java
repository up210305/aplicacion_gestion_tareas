package com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.controller;

import java.util.List;

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

import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.dto.TaskDTO;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.dto.TaskListDTO;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.service.TaskListService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/lists")
public class TaskListController {

    @Autowired
    private TaskListService taskListService;

    @GetMapping
    public List<TaskListDTO> getAllTaskLists() {
        return taskListService.getTaskLists();
    }

    @GetMapping("/{listId}/tasks")
    public ResponseEntity<List<TaskDTO>> getTasksByListId(@PathVariable Long listId) {
        List<TaskDTO> tasks = taskListService.getTasksByListId(listId);
        if (tasks.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/{listId}")
    public ResponseEntity<TaskListDTO> getTaskListById(@PathVariable Long listId) {
        return taskListService.getTaskListById(listId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<TaskListDTO> createTaskList(@RequestBody TaskListDTO taskListDTO) {
        TaskListDTO savedTaskListDTO = taskListService.saveTaskList(taskListDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedTaskListDTO);
    }

    @DeleteMapping("/{listid}")
    public ResponseEntity<Void> deleteList(@PathVariable Long id) {
        taskListService.deleteList(id);
        return ResponseEntity.noContent().build();
    }
}
