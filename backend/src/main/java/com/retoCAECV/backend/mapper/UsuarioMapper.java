package com.retoCAECV.backend.mapper;

import com.retoCAECV.backend.dto.request.CrearUsuarioRequestDTO;
import com.retoCAECV.backend.dto.response.UsuarioResponseDTO;
import com.retoCAECV.backend.entity.Usuario;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UsuarioMapper {

    Usuario toEntity(CrearUsuarioRequestDTO requestDTO);

    UsuarioResponseDTO toResponse(Usuario usuario);

}