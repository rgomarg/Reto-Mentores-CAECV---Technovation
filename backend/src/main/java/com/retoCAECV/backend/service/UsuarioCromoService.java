package com.retoCAECV.backend.service;

import com.retoCAECV.backend.dto.request.UsuarioCromoRequestDTO;
import com.retoCAECV.backend.dto.response.UsuarioCromoResponseDTO;

public interface UsuarioCromoService {
    UsuarioCromoResponseDTO guardarCromoEnAlbum(UsuarioCromoRequestDTO usuarioCromoRequest);    
} 