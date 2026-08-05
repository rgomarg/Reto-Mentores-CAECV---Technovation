package com.retoCAECV.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;
import com.retoCAECV.backend.service.CromoService;
import com.retoCAECV.backend.dto.response.CromoResponseDTO;
import com.retoCAECV.backend.entity.Cromo;

@RestController
@RequestMapping("/cromos")
public class CromoController {
    private final CromoService cromoService;

    public CromoController(CromoService cromoService){
        this.cromoService=cromoService;
    }

    @GetMapping("/{id}")
    public CromoResponseDTO cargarCromo(@PathVariable Long id){
        return cromoService.cargarCromo(id);
    }

    @GetMapping
    public List<Cromo> cargarTodosCromos(){
        return cromoService.cargarTodosCromos();
    }

}
