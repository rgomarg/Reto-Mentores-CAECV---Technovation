package com.retoCAECV.backend.repository;

import com.retoCAECV.backend.entity.Potenciador;
import com.retoCAECV.backend.enums.TipoPotenciadores;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


public interface PotenciadorRepository extends JpaRepository<Potenciador,Long>{
    //Por ejemplo si quiero que me salga todos lo que sean tipo "Duplicador"
    //Buscar potenciadores por tipo. 
    List<Potenciador> findByTipo(TipoPotenciadores tipo);
}
