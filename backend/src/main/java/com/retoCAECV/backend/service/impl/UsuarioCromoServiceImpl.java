package com.retoCAECV.backend.service.impl;

import org.springframework.stereotype.Service;

import com.retoCAECV.backend.dto.request.UsuarioCromoRequestDTO;
import com.retoCAECV.backend.dto.response.UsuarioCromoResponseDTO;
import com.retoCAECV.backend.entity.UsuarioCromo;
import com.retoCAECV.backend.entity.Usuario;
import com.retoCAECV.backend.entity.Cromo;
import com.retoCAECV.backend.entity.Potenciador;
import com.retoCAECV.backend.entity.UsuarioPotenciador;
import com.retoCAECV.backend.repository.UsuarioCromoRepository;
import com.retoCAECV.backend.repository.UsuarioRepository;
import com.retoCAECV.backend.repository.CromoRepository;
import com.retoCAECV.backend.repository.PotenciadorRepository;
import com.retoCAECV.backend.repository.UsuarioPotenciadorRepository;
import com.retoCAECV.backend.service.UsuarioCromoService;

import java.time.LocalDateTime;

@Service
public class UsuarioCromoServiceImpl implements UsuarioCromoService{
    private final UsuarioCromoRepository usuarioCromoRepository;
    private final UsuarioRepository usuarioRepository;
    private final CromoRepository cromoRepository;
    private final PotenciadorRepository potenciadorRepository;
    private final UsuarioPotenciadorRepository usuarioPotenciadorRepository;

    public UsuarioCromoServiceImpl(UsuarioCromoRepository usuarioCromoRepository, 
        UsuarioRepository usuarioRepository, CromoRepository cromoRepository,
        PotenciadorRepository potenciadorRepository, UsuarioPotenciadorRepository usuarioPotenciadorRepository){
        this.usuarioCromoRepository = usuarioCromoRepository;
        this.usuarioRepository = usuarioRepository;
        this.cromoRepository = cromoRepository;
        this.potenciadorRepository = potenciadorRepository;
        this.usuarioPotenciadorRepository = usuarioPotenciadorRepository;
    }

    @Override
    public UsuarioCromoResponseDTO guardarCromoEnAlbum(UsuarioCromoRequestDTO usuarioCromoRequest){
        Usuario usuario = usuarioRepository.findById(usuarioCromoRequest.getIdUsuario())
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
            
        Cromo cromo = cromoRepository.findById(usuarioCromoRequest.getIdCromo())
            .orElseThrow(() -> new RuntimeException("Cromo no encontrado"));

        if (usuarioCromoRepository.findByUsuarioAndCromo(usuario, cromo).isPresent()) {
            throw new RuntimeException("El usuario ya tiene este cromo");
        }

        UsuarioCromo uc = new UsuarioCromo();
        uc.setUsuario(usuario);
        uc.setCromo(cromo);
        uc.setUsado(false);
        uc.setFechaObtenido(LocalDateTime.now());
        uc.setCantidad(1);
        
        usuarioCromoRepository.save(uc);
        
        UsuarioCromoResponseDTO response = new UsuarioCromoResponseDTO();
        response.setIdUsuario(usuario.getId());
        response.setIdCromo(cromo.getId());
        
        return response;
    }    

    @Override
    public void aplicarPotenciadorACromo(Long idUsuarioCromo, Long idPotenciador) {
        UsuarioCromo uc = usuarioCromoRepository.findById(idUsuarioCromo)
            .orElseThrow(() -> new RuntimeException("UsuarioCromo no encontrado"));

        if (uc.getPotenciadorAplicado() != null) {
            throw new RuntimeException("El cromo ya tiene un potenciador aplicado");
        }

        Potenciador p = potenciadorRepository.findById(idPotenciador)
            .orElseThrow(() -> new RuntimeException("Potenciador no encontrado"));

        UsuarioPotenciador up = usuarioPotenciadorRepository.findByUsuarioAndPotenciador(uc.getUsuario(), p)
            .orElseThrow(() -> new RuntimeException("El usuario no tiene este potenciador"));

        if (up.getCantidad() - up.getCantidadUsada() <= 0) {
            throw new RuntimeException("No quedan usos para este potenciador");
        }

        up.setCantidadUsada(up.getCantidadUsada() + 1);
        uc.setPotenciadorAplicado(p);

        usuarioPotenciadorRepository.save(up);
        usuarioCromoRepository.save(uc);
    }
}
