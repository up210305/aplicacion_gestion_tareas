package com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.model.TaskList;

public interface TaskListRepository extends JpaRepository<TaskList, Long> {
}
