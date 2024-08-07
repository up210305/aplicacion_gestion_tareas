
package com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.dto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
@Data
@Builder
@AllArgsConstructor
@Schema(description = "Employee Data Transfer Object")
public class EmployeeDTO {
    private Long idEmployee;
    private String lastName;
    private String firstName;
    private String username;
    private String password; // Add this line
    private boolean active;
}


// public class EmployeeDTO {
//     private Long idEmployee;

//     private String lastName;
  
//     private String firstName;

//     private String username;

//     private String password;

//     private boolean active;
// }
