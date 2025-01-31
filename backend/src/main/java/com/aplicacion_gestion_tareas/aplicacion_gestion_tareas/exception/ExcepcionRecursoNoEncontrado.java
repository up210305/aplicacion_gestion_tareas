package com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ExcepcionRecursoNoEncontrado extends RuntimeException {
    public ExcepcionRecursoNoEncontrado(String message) {
        super("ERR_DATA_NOT_FOUND", message, null);        
    }
}