package com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.dto;

import java.util.Set;

import lombok.Data;

@Data
public class TaskListDTO {
    private Long idList;
    private String listName;
    private String description;
    private Set<TaskDTO> tasks;
}
