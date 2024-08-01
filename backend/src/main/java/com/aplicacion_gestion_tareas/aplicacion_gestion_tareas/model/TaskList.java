package com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.model;

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
@Table(name = "lists")
public class TaskList {

    @Id
    @Column(name = "id_list")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idList;

    @Column(name = "list_name", nullable = false)
    private String listName;

    @Column(name = "description")
    private String description;

    @ManyToOne
    @JoinColumn(name = "id_employee", nullable = false) // Añadido nullable = false para consistencia
    private Employee employee;
}
