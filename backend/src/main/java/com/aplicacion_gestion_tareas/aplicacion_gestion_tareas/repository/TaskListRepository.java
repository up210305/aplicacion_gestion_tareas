package com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.model.TaskList;

@Repository
public interface TaskListRepository extends JpaRepository<TaskList, Long> {
}
