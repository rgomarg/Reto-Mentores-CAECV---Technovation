package com.retoCAECV.backend.service.impl;

import com.retoCAECV.backend.entity.Usuario;
import com.retoCAECV.backend.repository.UsuarioRepository;
import com.retoCAECV.backend.service.UsuarioService;
import org.springframework.stereotype.Service;
import com.retoCAECV.backend.dto.request.UsuarioRequestDTO;
import com.retoCAECV.backend.dto.response.UsuarioResponseDTO;
import com.retoCAECV.backend.mapper.UsuarioMapper;

import java.util.List;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    private final UsuarioRepository usuarioRepository; //inyección de dependencias. Pa no hacer new UsuarioRepository()
    private final UsuarioMapper usuarioMapper;

    public UsuarioServiceImpl(UsuarioRepository usuarioRepository, UsuarioMapper usuarioMapper) {
        this.usuarioRepository = usuarioRepository;
        this.usuarioMapper=usuarioMapper;
    }

    @Override
    public List<UsuarioResponseDTO> getAll() {
          return usuarioRepository.findAll()
            .stream()
            .map(usuarioMapper::toResponse)
            .toList();
    }

    @Override
    public UsuarioResponseDTO guardar(UsuarioRequestDTO dto) {
        var usuario = usuarioMapper.toEntity(dto);
        usuario = usuarioRepository.save(usuario);
        return usuarioMapper.toResponse(usuario);

}

    @Override
    public UsuarioResponseDTO getById(Long id) {
        return usuarioRepository.findById(id)
            .map(usuarioMapper::toResponse)
            .orElse(null);

}

    @Override
    public void eliminate(Long id) {
        usuarioRepository.deleteById(id);
    }
}