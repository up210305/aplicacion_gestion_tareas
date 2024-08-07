package com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.dto;

import lombok.Data;

@Data
public class TaskListRequestDTO {
    private String listName;
    private String description;
    private Long employeeId;
}
