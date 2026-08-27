package com.retoCAECV.backend.service.impl;

import org.springframework.stereotype.Service;
import com.retoCAECV.backend.entity.Potenciador;
import com.retoCAECV.backend.repository.PotenciadorRepository;
import com.retoCAECV.backend.service.PotenciadorService;

import java.util.List;

@Service
public class PotenciadorServiceImpl implements PotenciadorService {
    
    private final PotenciadorRepository potenciadorRepository;

    public PotenciadorServiceImpl(PotenciadorRepository potenciadorRepository) {
        this.potenciadorRepository = potenciadorRepository;
    }

    @Override
    public List<Potenciador> obtenerTodos() {
        return potenciadorRepository.findAll();
    }
}
