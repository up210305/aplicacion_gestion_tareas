package com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.model.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByTaskListId(Long listId);
}
