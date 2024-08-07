package com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.dto;

import java.time.LocalDate;
import lombok.Data;

@Data
public class CreateTaskDTO {
    private String taskTitle;
    private String taskDescription;
    private LocalDate expireDate;
    private Boolean completed;
    private Boolean important;
    private Long idEmployee;
    private Long idList;
}
