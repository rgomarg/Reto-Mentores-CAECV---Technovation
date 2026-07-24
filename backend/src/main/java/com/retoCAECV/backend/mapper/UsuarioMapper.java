package com.retoCAECV.backend.mapper;

import com.retoCAECV.backend.dto.request.UsuarioRequestDTO;
import com.retoCAECV.backend.dto.response.UsuarioResponseDTO;
import com.retoCAECV.backend.entity.Usuario;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UsuarioMapper {

    Usuario toEntity(UsuarioRequestDTO dto);

    UsuarioResponseDTO toResponse(Usuario usuario);

}