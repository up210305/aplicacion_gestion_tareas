package com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import io.swagger.v3.oas.annotations.media.Schema;

@Data
@Builder
@AllArgsConstructor
@Schema(description = "Create Employee Data Transfer Object")
public class CreateEmployeeDTO {

    @Schema(description = "Last name of the employee")
    private String lastName;

    @Schema(description = "First name of the employee")
    private String firstName;

    @Schema(description = "Username for the employee login")
    private String username;

    @Schema(description = "Password for the employee login")
    private String password;

    @Schema(description = "Indicates if the employee is active")
    private boolean active;
}
