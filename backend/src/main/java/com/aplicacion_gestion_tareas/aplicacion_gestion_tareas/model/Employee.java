package com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.Builder;
@Builder
@Data
@Entity
@Table(name = "employees")
public class Employee {
  @Id
  @Column(name = "id_employee")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long idEmployee;

  @NotBlank(message = "No puede estar vacio")
  @Column(name = "last_name")
  private String lastName;

  @Column(name = "first_name") 
  private String firstName;

  @NotBlank(message = "No puede estar vacio")
  @Column(name = "username")
  private String username;

  @NotBlank(message = "No puede estar vacio")
  @Column(name = "password")
  private String password;
  
  private boolean active;

}