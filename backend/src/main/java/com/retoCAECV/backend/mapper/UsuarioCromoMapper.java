package com.retoCAECV.backend.mapper;

import org.mapstruct.Mapper;

import com.retoCAECV.backend.dto.request.UsuarioCromoRequestDTO;
import com.retoCAECV.backend.dto.response.UsuarioCromoResponseDTO;
import com.retoCAECV.backend.entity.UsuarioCromo;

@Mapper(componentModel = "spring")
public interface UsuarioCromoMapper {
    UsuarioCromo toEntity(UsuarioCromoRequestDTO usuarioCromoRequest);
    UsuarioCromoResponseDTO toResponse(UsuarioCromo usuarioCromo);
}