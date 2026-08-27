package com.retoCAECV.backend.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.retoCAECV.backend.dto.response.UsuarioCromoResponseDTO;
import com.retoCAECV.backend.dto.request.UsuarioCromoRequestDTO;

import com.retoCAECV.backend.service.UsuarioCromoService;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/nfc/cromo")
public class UsuarioCromoController {
    private final UsuarioCromoService usuarioCromoService;

    public UsuarioCromoController(UsuarioCromoService usuarioCromoService){
        this.usuarioCromoService=usuarioCromoService;
    }

    @PostMapping
    public UsuarioCromoResponseDTO guardarCromoEnAlbum(@RequestBody UsuarioCromoRequestDTO ucRequest){
        return usuarioCromoService.guardarCromoEnAlbum(ucRequest);
    }

    @PostMapping("/aplicar-potenciador/{idUsuarioCromo}/{idPotenciador}")
    public void aplicarPotenciadorACromo(@PathVariable Long idUsuarioCromo, @PathVariable Long idPotenciador) {
        usuarioCromoService.aplicarPotenciadorACromo(idUsuarioCromo, idPotenciador);
    }
}
