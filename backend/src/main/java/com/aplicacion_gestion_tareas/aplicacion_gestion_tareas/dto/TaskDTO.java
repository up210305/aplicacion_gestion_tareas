package com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class TaskDTO {
    private Long idTask;
    private String title;
    private String description;
    private LocalDate creationDate;
    private LocalDate expireDate;
    private Boolean completed;
    private Long employeeId;
    private Long taskListId;
}
