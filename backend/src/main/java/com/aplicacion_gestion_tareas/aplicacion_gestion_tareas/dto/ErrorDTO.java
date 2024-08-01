package com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
@Schema(description = "Modelo ErrorDTO para manejar errores")
public class ErrorDTO {

    private String code;
    private String message;
    private Object details;

}
