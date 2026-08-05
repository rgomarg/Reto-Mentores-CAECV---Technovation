package com.retoCAECV.backend.service.impl;
import java.util.List;

import com.retoCAECV.backend.dto.response.CromoResponseDTO;
import com.retoCAECV.backend.entity.Cromo;
import com.retoCAECV.backend.repository.CromoRepository;
import com.retoCAECV.backend.service.CromoService;
import org.springframework.stereotype.Service;

@Service
public class CromoServiceImpl implements CromoService {
    private final CromoRepository cromoRepository;

    public CromoServiceImpl(CromoRepository cromoRepository){
        this.cromoRepository=cromoRepository;
    }

    @Override
    public CromoResponseDTO cargarCromo(Long id){
        Cromo cromo= cromoRepository.findById(id)
            .orElseThrow(()-> new RuntimeException("Usuario no encontrado"));
        CromoResponseDTO response = new CromoResponseDTO();
        response.setAtributos(cromo.getAtributos());
        response.setImagen(cromo.getImagen());
        response.setNombre(cromo.getNombre());
        response.setPuntuacion(cromo.getPuntuacion());

        return response;
    }

    @Override
    public List<Cromo> cargarTodosCromos(){
        List<Cromo> cromos= cromoRepository.findAll();
        return cromos;
    }

}
