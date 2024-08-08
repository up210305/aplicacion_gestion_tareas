package com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TaskListDTO {

    @JsonProperty("id_list")
    private Integer idList;

    @JsonProperty("list_name")
    private String name;

    @JsonProperty("description")
    private String description;

    @JsonProperty("id_employee")
    private long employeeId;
}