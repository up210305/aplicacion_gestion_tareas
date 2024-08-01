package com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.model;

import java.sql.Date;

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
    private Long idTask;

    @Column(name = "task_title", nullable = false)
    private String taskTitle;

    @Column(name = "task_description")
    private String taskDescription;

    @Column(name = "creation_date", nullable = false)
    private Date creationDate;

    @Column(name = "expire_date")
    private Date expireDate;

    @Column(name = "completed")
    private Boolean completed;

    @Column(name = "important")
    private Boolean important;

    @ManyToOne
    @JoinColumn(name = "id_employee", nullable = false) // Añadido nullable = false para consistencia
    private Employee employee;

    @ManyToOne
    @JoinColumn(name = "id_list", nullable = false) // Añadido nullable = false para consistencia
    private TaskList taskList;
}
