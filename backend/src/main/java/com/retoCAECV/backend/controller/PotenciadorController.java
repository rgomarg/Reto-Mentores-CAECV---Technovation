package com.retoCAECV.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.retoCAECV.backend.entity.Potenciador;
import com.retoCAECV.backend.service.PotenciadorService;

import java.util.List;

@RestController
@RequestMapping("/potenciadores")
public class PotenciadorController {
    
    private final PotenciadorService potenciadorService;

    public PotenciadorController(PotenciadorService potenciadorService) {
        this.potenciadorService = potenciadorService;
    }

    @GetMapping
    public List<Potenciador> obtenerTodos() {
        return potenciadorService.obtenerTodos();
    }
}
