package com.retoCAECV.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.retoCAECV.backend.entity.UsuarioCromo;
import java.util.List;
import java.util.Optional;
import com.retoCAECV.backend.entity.Usuario;
import com.retoCAECV.backend.entity.Cromo;

public interface UsuarioCromoRepository extends JpaRepository<UsuarioCromo, Long>{
    //Buscar todos las relaciones UsuarioCromo que tenga un usuario. Así luego podremos 
    //usarlo para sacar los cromos de ese usuario.
    List<UsuarioCromo> findByUsuario(Usuario usuario);

    //Ver si un usuario tiene un cromo determinado y viceversa. Osea si existe relación usuario-cromo.
        //Si existe, pondremos cantidad++, porq será un repetido.
    Optional<UsuarioCromo> findByUsuarioAndCromo(Usuario usuario, Cromo cromo);

}
