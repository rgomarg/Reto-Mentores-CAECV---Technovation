package com.retoCAECV.backend.repository;
import com.retoCAECV.backend.entity.Usuario;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    //Podemos buscar por id, pero la idea con el DTO es NO pasar el id.
    //Buscar por nombre el usuario es lo q tenemos que hacer nuevo.
    Optional<Usuario> findByNombre(String nombre);
    boolean existsByNombre(String nombre);
}