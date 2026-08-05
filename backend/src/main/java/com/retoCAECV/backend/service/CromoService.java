package com.retoCAECV.backend.service;

import java.util.List;

import com.retoCAECV.backend.dto.response.CromoResponseDTO;
import com.retoCAECV.backend.entity.Cromo;

public interface CromoService {
    CromoResponseDTO cargarCromo(Long id);
    List<Cromo> cargarTodosCromos();
}
