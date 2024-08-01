package com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.controller;

import com.aplicacion_gestion_tareas.aplicacion_gestion_tareas.dto.ErrorDTO;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CustomErrorController implements ErrorController {

    @RequestMapping("/error")
    public ErrorDTO handleError() {
        return new ErrorDTO("ERROR_UNKNOWN", "Ocurrió un error inesperado...", null);
    }
}
