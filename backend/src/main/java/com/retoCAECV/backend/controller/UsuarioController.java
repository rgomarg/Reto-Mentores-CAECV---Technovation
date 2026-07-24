package com.retoCAECV.backend.controller;

import com.retoCAECV.backend.dto.request.UsuarioRequestDTO;
import com.retoCAECV.backend.dto.response.UsuarioResponseDTO;
import com.retoCAECV.backend.service.UsuarioService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping
    public List<UsuarioResponseDTO> obtenerTodos() {
        return usuarioService.getAll();
    }

    @GetMapping("/{id}")
    public UsuarioResponseDTO getById(@PathVariable Long id) {
        return usuarioService.getById(id);
    }

    @PostMapping
    public UsuarioResponseDTO guardar(@RequestBody UsuarioRequestDTO dto) {
        return usuarioService.guardar(dto);
    }

    @DeleteMapping("/{id}")
    public void eliminate(@PathVariable Long id) {
        usuarioService.eliminate(id);
    }
}