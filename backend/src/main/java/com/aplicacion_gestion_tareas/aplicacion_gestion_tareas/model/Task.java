package com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "tasks")
public class Task {

    @Id
    @Column(name = "id_task")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "task_title", nullable = false)
    private String title;

    @Column(name = "task_description")
    private String description;

    @Column(name = "creation_date", nullable = false)
    private LocalDateTime creationDate;  // Cambiado a LocalDateTime

    @Column(name = "expire_date")
    private LocalDateTime expireDate;    // Cambiado a LocalDateTime

    @Column(name = "completed")
    private Boolean completed;

    @Column(name = "important")
    private Boolean important;

    @ManyToOne
    @JoinColumn(name = "id_employee", nullable = false)
    private Employee employee;

    @ManyToOne
    @JoinColumn(name = "id_list", nullable = false)
    private TaskList taskList;
}
