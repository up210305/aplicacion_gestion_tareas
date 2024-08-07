package com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.model;

import lombok.Data;

@Data
public class TaskListRequest {
    private String listName;
    private String description;
    private Long employeeId;
}
