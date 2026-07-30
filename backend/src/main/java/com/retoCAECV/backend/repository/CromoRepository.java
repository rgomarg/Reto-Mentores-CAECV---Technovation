package com.retoCAECV.backend.repository;

import com.retoCAECV.backend.entity.Cromo;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CromoRepository extends JpaRepository<Cromo, Long> {
    //Buscar un cromo por su nombre, no por su id porq el DTO no lo pasaremos.
    //Buscar por ejemplo "naranjito" y no id=3.
    Optional<Cromo>findByNombre(String nombre);
}
