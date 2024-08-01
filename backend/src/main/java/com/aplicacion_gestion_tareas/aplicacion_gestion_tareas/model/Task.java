package com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.model;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Entity
@Table(name = "tasks")
public class Task {
    @Id
    @Column(name = "id_task")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idTask;

    @NotBlank(message = "El título de la tarea no puede estar vacío")
    @Column(name = "task_title")
    private String taskTitle;

    @Column(name = "task_description")
    private String taskDescription;

    @NotNull(message = "La fecha de creación no puede estar vacía")
    @Column(name = "creation_date")
    private Date creationDate;

    @Column(name = "expire_date")
    private Date expireDate;

    @Column(name = "completed")
    private Boolean completed;

    @Column(name = "favorite")
    private Boolean favorite = false;

    @ManyToOne
    @JoinColumn(name = "id_employee")
    private Employee employee;

    @ManyToOne
    @JoinColumn(name = "id_list")
    private TaskList taskList;
}
