package com.retoCAECV.backend.service.impl;

import java.util.List;
import java.util.Optional;

import javax.swing.event.ListSelectionEvent;

import com.retoCAECV.backend.dto.UsuarioPotenciadorDTO;
import com.retoCAECV.backend.entity.Potenciador;
import com.retoCAECV.backend.entity.Usuario;
import com.retoCAECV.backend.entity.UsuarioPotenciador;
import com.retoCAECV.backend.repository.CromoRepository;
import com.retoCAECV.backend.repository.PotenciadorRepository;
import com.retoCAECV.backend.repository.UsuarioPotenciadorRepository;
import com.retoCAECV.backend.repository.UsuarioRepository;
import com.retoCAECV.backend.service.UsuarioPotenciadorService;
import java.sql.Date;

public class UsuarioPotenciadorServiceImpl implements UsuarioPotenciadorService {
    private final UsuarioPotenciadorRepository usuarioPotenciadorRepository;
    private final UsuarioRepository usuarioRepository;
    private final PotenciadorRepository potenciadorRepository;

    public UsuarioPotenciadorServiceImpl(UsuarioPotenciadorRepository usuarioPotenciadorRepository,
        UsuarioRepository usuarioRepository, PotenciadorRepository potenciadorRepository){

        this.usuarioPotenciadorRepository = usuarioPotenciadorRepository;
        this.usuarioRepository= usuarioRepository;
        this.potenciadorRepository=potenciadorRepository;
    }
    
    @Override
    public UsuarioPotenciadorDTO guardarPotenciador(UsuarioPotenciadorDTO up){
        Usuario usuario = usuarioRepository.findById(up.getIdUsuario())
            .orElseThrow(()-> new RuntimeException("Error al encontrar usuario"));

        Potenciador potenciador = potenciadorRepository.findById(up.getIdPotenciador())
            .orElseThrow(()-> new RuntimeException("Potenciador no encontrado"));

        UsuarioPotenciador usuarioPotenciador = new UsuarioPotenciador();

        usuarioPotenciador.setCantidad(1);
        usuarioPotenciador.setFechaObtenido(new Date(System.currentTimeMillis()));
        usuarioPotenciador.setPotenciador(potenciador);
        usuarioPotenciador.setUsuario(usuario);
        //falta el id que se hará solo con el save?
        usuarioPotenciadorRepository.save(usuarioPotenciador);

        UsuarioPotenciadorDTO upDTO = new UsuarioPotenciadorDTO();
        upDTO.setIdPotenciador(potenciador.getId());
        upDTO.setIdUsuario(usuario.getId());

        return upDTO;        

    }

    
}
