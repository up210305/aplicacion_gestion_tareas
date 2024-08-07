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

// import lombok.AllArgsConstructor;
// import lombok.Builder;
// import lombok.Data;
// import io.swagger.v3.oas.annotations.media.Schema;

// @Data
// @Builder
// @AllArgsConstructor
// @Schema(description = "Employee Data Transfer Object")
// public class EmployeeDTO {
//     private Long idEmployee;

//     private String lastName;
  
//     private String firstName;

//     private String username;

//     private String password;

//     private boolean active;
// }
