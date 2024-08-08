package com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.dto;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TaskDTO {

    @JsonProperty("id_task")
    private Long idTask;

    @JsonProperty("task_title")
    private String taskTitle;

    @JsonProperty("task_description")
    private String taskDescription;

    @JsonProperty("creation_date")
    private LocalDate creationDate;

    @JsonProperty("expire_date")
    private LocalDate expireDate;

    @JsonProperty("completed")
    private boolean completed;

    @JsonProperty("important")
    private boolean important;

    @JsonProperty("id_employee")
    private Long employeeId;

    @JsonProperty("id_list")
    private Long listId;

}