package com.retoCAECV.backend.service;

import com.retoCAECV.backend.dto.request.CrearUsuarioRequestDTO;
import com.retoCAECV.backend.dto.response.DatosUsuarioDashBoardResponse;
import com.retoCAECV.backend.dto.response.UsuarioResponseDTO;




public interface UsuarioService {
    UsuarioResponseDTO crearUsuario(CrearUsuarioRequestDTO requestusuarioDTO);

    DatosUsuarioDashBoardResponse cargarUsuarioDashboard(Long id);
}