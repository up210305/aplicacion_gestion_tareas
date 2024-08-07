package com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.dto;

import lombok.Data;

@Data
public class TaskListDTO {
    private Long id;
    private String name;
    private String description;
    private Long employeeId;
}
