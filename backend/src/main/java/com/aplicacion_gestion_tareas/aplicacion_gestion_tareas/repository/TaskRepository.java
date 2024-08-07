package com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.model.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByTaskListId(Long taskListId);
    List<Task> findByTaskListIdIsNull();

    //Encontrar todas las tareas completadas
    @Query(value = "SELECT * FROM tasks WHERE completed = true", nativeQuery = true)
    List<Task> findCompletedTasks();

    //Encontrar todas las tareas de un empleado específico
    @Query(value = "SELECT * FROM tasks WHERE id_employee = ?1", nativeQuery = true)
    List<Task> findTasksByEmployeeId(Long idEmployee);

    //Encontrar todas las tareas de una lista específica
    @Query(value = "SELECT * FROM tasks WHERE id_list = ?1", nativeQuery = true)
    List<Task> findTasksByListId(Long idList);

}
