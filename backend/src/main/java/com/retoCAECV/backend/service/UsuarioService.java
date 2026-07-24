package com.retoCAECV.backend.service;

import com.retoCAECV.backend.dto.request.UsuarioRequestDTO;
import com.retoCAECV.backend.dto.response.UsuarioResponseDTO;

import java.util.List;

public interface UsuarioService {

    List<UsuarioResponseDTO> getAll();

    UsuarioResponseDTO getById(Long id);

    UsuarioResponseDTO guardar(UsuarioRequestDTO dto);

    void eliminate(Long id);

}