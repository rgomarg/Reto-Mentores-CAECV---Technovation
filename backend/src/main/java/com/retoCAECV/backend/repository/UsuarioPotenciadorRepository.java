package com.retoCAECV.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.retoCAECV.backend.entity.UsuarioPotenciador;
import java.util.List;
import java.util.Optional;
import com.retoCAECV.backend.entity.Usuario;
import com.retoCAECV.backend.entity.Potenciador;

public interface UsuarioPotenciadorRepository extends JpaRepository<UsuarioPotenciador,Long>{
    List<UsuarioPotenciador> findByUsuario(Usuario usuario);

    Optional<UsuarioPotenciador> findByUsuarioAndPotenciador(Usuario usuario, Potenciador potenciador);
    
}
