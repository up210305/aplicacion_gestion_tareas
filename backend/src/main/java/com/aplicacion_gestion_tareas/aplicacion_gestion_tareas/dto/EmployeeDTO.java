package com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.dto;

import lombok.Data;

@Data
public class EmployeeDTO {
    private Long idEmployee;
    private String lastName;
    private String firstName;
    private String username;
    private boolean active;
    private String password; // Add this line
}
