package com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class UpdateTaskDTO {
    private String description;
    private LocalDate dueDate;
    private boolean completed;
    private Long userId;
    private Long listId;
}