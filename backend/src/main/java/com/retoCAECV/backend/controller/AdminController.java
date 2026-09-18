package com.retoCAECV.backend.controller;

import com.retoCAECV.backend.entity.Cromo;
import com.retoCAECV.backend.entity.Usuario;
import com.retoCAECV.backend.entity.UsuarioCromo;
import com.retoCAECV.backend.repository.CromoRepository;
import com.retoCAECV.backend.repository.UsuarioCromoRepository;
import com.retoCAECV.backend.repository.UsuarioRepository;
import com.retoCAECV.backend.service.EstadisticasService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private final UsuarioCromoRepository usuarioCromoRepository;
    private final UsuarioRepository usuarioRepository;
    private final CromoRepository cromoRepository;
    private final EstadisticasService estadisticasService;

    public AdminController(UsuarioCromoRepository usuarioCromoRepository, 
                           UsuarioRepository usuarioRepository, 
                           CromoRepository cromoRepository,
                           EstadisticasService estadisticasService) {
        this.usuarioCromoRepository = usuarioCromoRepository;
        this.usuarioRepository = usuarioRepository;
        this.cromoRepository = cromoRepository;
        this.estadisticasService = estadisticasService;
    }

    @PostMapping("/enviar-demo")
    public ResponseEntity<String> enviarReporteDemo(@RequestParam String correo) {
        try {
            estadisticasService.enviarReporteEmail(correo);
            return ResponseEntity.ok("Correo enviado a " + correo);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/poblar-datos")
    public ResponseEntity<String> poblarDatosDemo() {
        try {
            List<Usuario> usuarios = usuarioRepository.findAll();
            List<Cromo> cromos = cromoRepository.findAll();

            if (usuarios.isEmpty() || cromos.isEmpty()) {
                return ResponseEntity.badRequest().body("Necesitas tener usuarios y cromos creados primero.");
            }

            Random rand = new Random();
            int registrosCreados = 0;

            // Vamos a simular 60 escaneos repartidos en los últimos 14 días
            for (int i = 0; i < 60; i++) {
                Usuario usuarioRandom = usuarios.get(rand.nextInt(usuarios.size()));
                Cromo cromoRandom = cromos.get(rand.nextInt(cromos.size()));

                // Comprobar que no lo tenga ya
                if (usuarioCromoRepository.findByUsuarioAndCromo(usuarioRandom, cromoRandom).isEmpty()) {
                    
                    // Generar una fecha aleatoria en los últimos 14 días
                    int diasAtras = rand.nextInt(14);
                    LocalDateTime fechaAleatoria = LocalDateTime.now().minusDays(diasAtras).minusHours(rand.nextInt(12));

                    UsuarioCromo uc = new UsuarioCromo();
                    uc.setUsuario(usuarioRandom);
                    uc.setCromo(cromoRandom);
                    uc.setUsado(false);
                    uc.setCantidad(1);
                    uc.setFechaObtenido(fechaAleatoria);

                    usuarioCromoRepository.save(uc);
                    registrosCreados++;
                }
            }

            return ResponseEntity.ok("Éxito. Se han generado " + registrosCreados + " escaneos falsos.");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error en el servidor: " + e.getMessage());
        }
    }
}
