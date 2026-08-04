package com.retoCAECV.backend.controller;

import com.retoCAECV.backend.dto.request.CrearUsuarioRequestDTO;
import com.retoCAECV.backend.dto.response.DatosUsuarioDashBoardResponse;
import com.retoCAECV.backend.dto.response.UsuarioResponseDTO;
import com.retoCAECV.backend.service.UsuarioService;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping
    public UsuarioResponseDTO crearUsuario(@RequestBody CrearUsuarioRequestDTO requestUsuarioDTO){
        return usuarioService.crearUsuario(requestUsuarioDTO);
    }

    @GetMapping("/{id}")
    public DatosUsuarioDashBoardResponse cargarUsuarioDashboard(@PathVariable Long id){
        return usuarioService.cargarUsuarioDashboard(id); 
    }
   
}