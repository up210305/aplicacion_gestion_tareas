package com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class TaskDTO {
    private Long id;
    private String title;
    private String description;
    private LocalDateTime creationDate;
    private LocalDateTime expireDate;
    private Boolean completed;
    private Boolean important;
    private Long employeeId;
    private Long taskListId;
}
