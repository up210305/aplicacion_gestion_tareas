package com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.dto.TaskListDTO;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.model.TaskList;
import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.service.TaskListService;

@RestController
@RequestMapping("/api/lists")
public class TaskListController {

    @Autowired
    private TaskListService taskListService;

    @GetMapping
    public List<TaskList> getAllLists() {
        return taskListService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskList> getListById(@PathVariable Long id) {
        Optional<TaskList> taskList = taskListService.findById(id);
        return taskList.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public TaskList createList(@RequestBody TaskListDTO taskListDTO) {
        TaskList taskList = new TaskList();
        taskList.setListName(taskListDTO.getListName());
        taskList.setDescription(taskListDTO.getDescription());
        return taskListService.save(taskList);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskList> updateList(@PathVariable Long id, @RequestBody TaskListDTO taskListDTO) {
        Optional<TaskList> existingTaskList = taskListService.findById(id);
        if (existingTaskList.isPresent()) {
            TaskList taskList = existingTaskList.get();
            taskList.setListName(taskListDTO.getListName());
            taskList.setDescription(taskListDTO.getDescription());
            return ResponseEntity.ok(taskListService.save(taskList));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteList(@PathVariable Long id) {
        taskListService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
