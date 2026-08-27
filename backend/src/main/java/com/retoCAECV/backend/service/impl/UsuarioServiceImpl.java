package com.retoCAECV.backend.service.impl;

import com.retoCAECV.backend.entity.Usuario;
import com.retoCAECV.backend.entity.UsuarioCromo;
import com.retoCAECV.backend.entity.UsuarioPotenciador;
import com.retoCAECV.backend.repository.UsuarioCromoRepository;
import com.retoCAECV.backend.repository.UsuarioPotenciadorRepository;
import com.retoCAECV.backend.repository.UsuarioRepository;
import com.retoCAECV.backend.service.UsuarioService;

import java.util.List;

import org.springframework.stereotype.Service;
import com.retoCAECV.backend.dto.request.CrearUsuarioRequestDTO;
import com.retoCAECV.backend.dto.response.DatosUsuarioDashBoardResponse;
import com.retoCAECV.backend.dto.response.UsuarioResponseDTO;
import com.retoCAECV.backend.mapper.UsuarioMapper;


@Service
public class UsuarioServiceImpl implements UsuarioService {

    private final UsuarioRepository usuarioRepository; //inyección de dependencias. Pa no hacer new UsuarioRepository()
    private final UsuarioMapper usuarioMapper;
    private final UsuarioCromoRepository usuarioCromoRepository;
    private final UsuarioPotenciadorRepository usuarioPotenciadorRepository;

    public UsuarioServiceImpl(UsuarioRepository usuarioRepository, UsuarioMapper usuarioMapper,
            UsuarioCromoRepository usuarioCromoRepository, UsuarioPotenciadorRepository usuarioPotenciadorRepository) {
        this.usuarioRepository = usuarioRepository;
        this.usuarioMapper=usuarioMapper;
        this.usuarioCromoRepository= usuarioCromoRepository;
        this.usuarioPotenciadorRepository= usuarioPotenciadorRepository;
    }

    @Override
    public UsuarioResponseDTO crearUsuario(CrearUsuarioRequestDTO requestUsuarioDTO){
        Usuario usuario= usuarioMapper.toEntity(requestUsuarioDTO);
        usuarioRepository.save(usuario);
        return usuarioMapper.toResponse(usuario);
    }    

    @Override
    public DatosUsuarioDashBoardResponse cargarUsuarioDashboard(Long id){
        DatosUsuarioDashBoardResponse response = new DatosUsuarioDashBoardResponse();

        Usuario usuario = usuarioRepository.findById(id)
            .orElseThrow(()-> new RuntimeException("Usuario no encontrado"));
        List<UsuarioCromo> usuarioCromos= usuarioCromoRepository.findByUsuario(usuario);
        List<UsuarioPotenciador> usuarioPotenciadores = usuarioPotenciadorRepository.findByUsuario(usuario);

        int puntuacionUsuario = 0;
        for (UsuarioCromo uc : usuarioCromos) {
            int puntosDeEsteCromo = uc.getCromo().getPuntuacion();

            // Aplicar modificador si el cromo tiene un potenciador aplicado
            if (uc.getPotenciadorAplicado() != null) {
                switch (uc.getPotenciadorAplicado().getTipo()) {
                    case DUPLICAR:
                        puntosDeEsteCromo *= 2;
                        break;
                    case TRIPLICAR:
                        puntosDeEsteCromo *= 3;
                        break;
                    case MAS_CUATRO:
                        puntosDeEsteCromo += 4;
                        break;
                    case MAS_OCHO:
                        puntosDeEsteCromo += 8;
                        break;
                }
            }

            puntuacionUsuario += (uc.getCantidad() * puntosDeEsteCromo);
        }

        response.setNCromos(usuarioCromos.size());
        response.setNombre(usuario.getNombre());
        response.setNPotenciadores(usuarioPotenciadores.size());
        response.setPuntuacionUsuario(puntuacionUsuario);
        response.setUsuarioCromos(usuarioCromos);
        response.setUsuarioPotenciadores(usuarioPotenciadores);
        
        return response;
    }
    
}