package com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
@Schema(description = "DTO para cuando el usuario manda solicitud de ingreso")
public class EmployeeLoginDTO {
    
    @NotBlank
    private String username;

    @NotBlank
    private String password;
}