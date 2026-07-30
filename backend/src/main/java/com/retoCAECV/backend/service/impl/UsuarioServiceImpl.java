package com.retoCAECV.backend.service.impl;

import com.retoCAECV.backend.entity.Usuario;
import com.retoCAECV.backend.repository.UsuarioRepository;
import com.retoCAECV.backend.service.UsuarioService;
import org.springframework.stereotype.Service;
import com.retoCAECV.backend.dto.request.CrearUsuarioRequestDTO;
import com.retoCAECV.backend.dto.response.UsuarioResponseDTO;
import com.retoCAECV.backend.mapper.UsuarioMapper;


@Service
public class UsuarioServiceImpl implements UsuarioService {

    private final UsuarioRepository usuarioRepository; //inyección de dependencias. Pa no hacer new UsuarioRepository()
    private final UsuarioMapper usuarioMapper;

    public UsuarioServiceImpl(UsuarioRepository usuarioRepository, UsuarioMapper usuarioMapper) {
        this.usuarioRepository = usuarioRepository;
        this.usuarioMapper=usuarioMapper;
    }

    @Override
    public UsuarioResponseDTO crearUsuario(CrearUsuarioRequestDTO requestUsuarioDTO){
        Usuario usuario= usuarioMapper.toEntity(requestUsuarioDTO);
        usuarioRepository.save(usuario);
        return usuarioMapper.toResponse(usuario);
    }    
    
}