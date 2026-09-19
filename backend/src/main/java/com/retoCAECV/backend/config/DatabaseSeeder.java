package com.retoCAECV.backend.config;

import com.retoCAECV.backend.entity.*;
import com.retoCAECV.backend.enums.TipoPotenciadores;
import com.retoCAECV.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;




@Component
@RequiredArgsConstructor
public class DatabaseSeeder implements CommandLineRunner {

    private final UsuarioRepository usuarioRepository;
    private final CromoRepository cromoRepository;
    private final PotenciadorRepository potenciadorRepository;
    private final UsuarioCromoRepository usuarioCromoRepository;
    private final UsuarioPotenciadorRepository usuarioPotenciadorRepository;

    // ======================
    // Variables
    // ======================

    private Usuario raquel;
    private Usuario laura;
    private Usuario sofia;
    private Usuario zoe;
    private Usuario alma;

    private Cromo naranjita;
    private Cromo lacteo;
    private Cromo miel;
    private Cromo mermelada;

    private Potenciador doblePuntos;
    private Potenciador triplePuntos;

    @Override
    public void run(String... args) {

        System.out.println("=========================");
        System.out.println("EJECUTANDO DATABASE SEED");
        System.out.println("=========================");




        // Borrar relaciones primero
        usuarioCromoRepository.deleteAll();
        usuarioPotenciadorRepository.deleteAll();

        // Después tablas principales
        usuarioRepository.deleteAll();
        cromoRepository.deleteAll();
        potenciadorRepository.deleteAll();

        crearUsuarios();
        crearCromos();
        crearPotenciadores();

        asignarCromos();
        asignarPotenciadores();

        System.out.println("Seeder ejecutado correctamente.");
    }

    // =======================================
    // USUARIOS
    // =======================================

    private void crearUsuarios() {
        raquel = usuarioRepository.save(Usuario.builder()
                .nombre("Raquel")
                .build());
                
        laura = usuarioRepository.save(Usuario.builder()
                .nombre("Laura")
                .build());
                
        sofia = usuarioRepository.save(Usuario.builder()
                .nombre("Sofia")
                .build());
                
        zoe = usuarioRepository.save(Usuario.builder()
                .nombre("Zoe")
                .build());
                
        alma = usuarioRepository.save(Usuario.builder()
                .nombre("Alma")
                .build());
    }

    // =======================================
    // CROMOS
    // =======================================

    private void crearCromos() {
        naranjita = cromoRepository.save(Cromo.builder()
                .nombre("Naranjita")
                .imagen("naranja.jpg")
                .puntuacion(15)
                .build());

        lacteo = cromoRepository.save(Cromo.builder()
                .nombre("Lacteo")
                .imagen("lacteo.jpg")
                .puntuacion(5)
                .build());

        miel = cromoRepository.save(Cromo.builder()
                .nombre("Miel")
                .imagen("miel.jpeg")
                .puntuacion(20)
                .build());

        mermelada = cromoRepository.save(Cromo.builder()
                .nombre("Mermelada")
                .imagen("mermelada.jpg") 
                .puntuacion(10)                
                .build());
    }

    // =======================================
    // POTENCIADORES
    // =======================================

    private void crearPotenciadores() {
        doblePuntos = potenciadorRepository.save(Potenciador.builder()
                .nombre("Doble Puntos")
                .imagen("x2Potenciador.png")
                .tipo(TipoPotenciadores.DUPLICAR)
                .build());

        triplePuntos = potenciadorRepository.save(Potenciador.builder()
                .nombre("Triple Puntos")
                .imagen("x3Potenciador.png")
                .tipo(TipoPotenciadores.TRIPLICAR)
                .build());
        doblePuntos = potenciadorRepository.save(Potenciador.builder()
                .nombre("Más Cuatro")
                .imagen("mas4Potenciador.png")
                .tipo(TipoPotenciadores.MAS_CUATRO)
                .build());

        triplePuntos = potenciadorRepository.save(Potenciador.builder()
                .nombre("Más Ocho")
                .imagen("mas8Potenciador.png")
                .tipo(TipoPotenciadores.MAS_OCHO)
                .build());
    }

    // =======================================
    // ÁLBUMES
    // =======================================

    private void asignarCromos() {
        // Obtenemos la fecha actual
        java.time.LocalDateTime fechaActual = java.time.LocalDateTime.now();

        usuarioCromoRepository.save(UsuarioCromo.builder()
                .usuario(raquel)
                .cromo(naranjita)
                .cantidad(1)
                .usado(false)
                .fechaObtenido(fechaActual)
                .build());

        usuarioCromoRepository.save(UsuarioCromo.builder()
                .usuario(raquel)
                .cromo(mermelada)
                .cantidad(3)
                .usado(false)
                .fechaObtenido(fechaActual)
                .build());

        usuarioCromoRepository.save(UsuarioCromo.builder()
                .usuario(laura)
                .cromo(lacteo)
                .cantidad(1)
                .usado(false)
                .fechaObtenido(fechaActual)
                .build());

        usuarioCromoRepository.save(UsuarioCromo.builder()
                .usuario(laura)
                .cromo(miel)
                .cantidad(2)
                .usado(false)
                .fechaObtenido(fechaActual)
                .build());

        usuarioCromoRepository.save(UsuarioCromo.builder()
                .usuario(sofia)
                .cromo(naranjita)
                .cantidad(4)
                .usado(false)
                .fechaObtenido(fechaActual)
                .build());

        usuarioCromoRepository.save(UsuarioCromo.builder()
                .usuario(zoe)
                .cromo(mermelada)
                .cantidad(1)
                .usado(false)
                .fechaObtenido(fechaActual)
                .build());

        usuarioCromoRepository.save(UsuarioCromo.builder()
                .usuario(alma)
                .cromo(miel)
                .cantidad(5)
                .usado(false)
                .fechaObtenido(fechaActual)
                .build());
    }

    // =======================================
    // POTENCIADORES DE CADA USUARIO
    // =======================================

    private void asignarPotenciadores() {
        java.sql.Date fechaActual = new java.sql.Date(System.currentTimeMillis());

        usuarioPotenciadorRepository.save(UsuarioPotenciador.builder()
                .usuario(raquel)
                .potenciador(doblePuntos)
                .cantidad(2)
                .fechaObtenido(fechaActual)
                .build());

        usuarioPotenciadorRepository.save(UsuarioPotenciador.builder()
                .usuario(laura)
                .potenciador(triplePuntos)
                .cantidad(1)
                .fechaObtenido(fechaActual)
                .build());

        usuarioPotenciadorRepository.save(UsuarioPotenciador.builder()
                .usuario(alma)
                .potenciador(doblePuntos)
                .cantidad(5)
                .fechaObtenido(fechaActual)
                .build());
    }
}