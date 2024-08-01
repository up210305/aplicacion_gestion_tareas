package com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "tasks")
public class Task {
    @Id
    @Column(name = "id_task")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idTask;

    @Column(name = "task_title", nullable = false)
    private String taskTitle;

    @Column(name = "task_description")
    private String taskDescription;

    @Column(name = "creation_date", nullable = false)
    private LocalDate creationDate;

    @Column(name = "expire_date")
    private LocalDate expireDate;

    @Column(name = "completed")
    private Boolean completed;

    @Column(name = "important")
    private Boolean important;

    @Column(name = "id_employee")
    private Long idEmployee;

    @Column(name = "id_list")
    private Long idList;

    @PrePersist
    public void prePersist() {
        creationDate = LocalDate.now();
    }
}
