package com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.Data;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Data
@Schema(description = "DTO para las tareas")
public class TaskDTO {
    // private Long id;
    // private String title;
    // private String description;
    // private LocalDateTime creationDate;
    // private LocalDateTime expireDate;

    @Schema(description = "Título de la tarea", example = "Comprar víveres")
    @NotBlank(message = "El título de la tarea no puede estar vacío")
    @Size(max = 100, message = "El título de la tarea no puede tener más de 100 caracteres")
    private String taskTitle;

    @Schema(description = "Descripción de la tarea", example = "Comprar leche, pan y huevos")
    @NotBlank(message = "La descripción de la tarea no puede estar vacía")
    private String taskDescription;

    @Schema(description = "Fecha de vencimiento de la tarea", example = "2024-12-31")
    @NotNull(message = "La fecha de vencimiento no puede ser nula")
    private LocalDate expireDate;

    @Schema(description = "Indica si la tarea está completada", example = "true")
    private Boolean completed;

    @Schema(description = "Indica si la tarea es importante", example = "false")
    private Boolean important;
    // private Long employeeId;
    // private Long taskListId;

    @Schema(description = "ID del empleado asignado a la tarea")
    @NotNull(message = "El ID del empleado no puede ser nulo")
    private Long idEmployee;

    @Schema(description = "ID de la lista a la que pertenece la tarea")
    @NotNull(message = "El ID de la lista no puede ser nulo")
    private Long idList;
}
