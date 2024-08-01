package com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.dto;

import java.util.Date;

import lombok.Data;

@Data
public class TaskDTO {
    private Long idTask;
    private String taskTitle;
    private String taskDescription;
    private Date creationDate;
    private Date expireDate;
    private Boolean completed;
    private Boolean favorite;
    private Long idEmployee;
    private Long idList;
}
