package com.retoCAECV.backend.config;

import com.retoCAECV.backend.entity.Usuario;
import com.retoCAECV.backend.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    private final UsuarioRepository usuarioRepository;

    public DatabaseSeeder(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public void run(String... args) {

        if (usuarioRepository.count() == 0) {

            usuarioRepository.save(new Usuario("Raquel"));
            usuarioRepository.save(new Usuario("Laura"));
            usuarioRepository.save(new Usuario("Sofia"));
            usuarioRepository.save(new Usuario("Zoe"));
            usuarioRepository.save(new Usuario("Alma"));

            System.out.println("Usuarios de prueba creados.");
        }

    }
}