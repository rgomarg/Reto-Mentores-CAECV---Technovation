package com.retoCAECV.backend.service.impl;

import org.springframework.stereotype.Service;

import com.retoCAECV.backend.dto.request.UsuarioCromoRequestDTO;
import com.retoCAECV.backend.dto.response.UsuarioCromoResponseDTO;
import com.retoCAECV.backend.entity.UsuarioCromo;
import com.retoCAECV.backend.entity.Usuario;
import com.retoCAECV.backend.entity.Cromo;
import com.retoCAECV.backend.repository.UsuarioCromoRepository;
import com.retoCAECV.backend.repository.UsuarioRepository;
import com.retoCAECV.backend.repository.CromoRepository;
import com.retoCAECV.backend.service.UsuarioCromoService;
import java.sql.Date;

@Service
public class UsuarioCromoServiceImpl implements UsuarioCromoService{
    private final UsuarioCromoRepository usuarioCromoRepository;
    private final UsuarioRepository usuarioRepository;
    private final CromoRepository cromoRepository;

    public UsuarioCromoServiceImpl(UsuarioCromoRepository usuarioCromoRepository, 
        UsuarioRepository usuarioRepository, CromoRepository cromoRepository){
        this.usuarioCromoRepository = usuarioCromoRepository;
        this.usuarioRepository = usuarioRepository;
        this.cromoRepository = cromoRepository;
    }

    @Override
    public UsuarioCromoResponseDTO guardarCromoEnAlbum(UsuarioCromoRequestDTO usuarioCromoRequest){
        Usuario usuario = usuarioRepository.findById(usuarioCromoRequest.getIdUsuario())
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
            
        Cromo cromo = cromoRepository.findById(usuarioCromoRequest.getIdCromo())
            .orElseThrow(() -> new RuntimeException("Cromo no encontrado"));

        UsuarioCromo uc = new UsuarioCromo();
        uc.setUsuario(usuario);
        uc.setCromo(cromo);
        uc.setUsado(false);
        uc.setFechaObtenido(new Date(System.currentTimeMillis()));
        uc.setCantidad(1);
        
        usuarioCromoRepository.save(uc);
        
        UsuarioCromoResponseDTO response = new UsuarioCromoResponseDTO();
        response.setIdUsuario(usuario.getId());
        response.setIdCromo(cromo.getId());
        
        return response;
    }    
}
