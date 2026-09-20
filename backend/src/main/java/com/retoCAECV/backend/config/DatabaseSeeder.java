package com.retoCAECV.backend.config;

import com.retoCAECV.backend.entity.*;
import com.retoCAECV.backend.enums.TipoPotenciadores;
import com.retoCAECV.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DatabaseSeeder implements CommandLineRunner {

    private final UsuarioRepository usuarioRepository;
    private final CromoRepository cromoRepository;
    private final PotenciadorRepository potenciadorRepository;
    private final UsuarioCromoRepository usuarioCromoRepository;
    private final UsuarioPotenciadorRepository usuarioPotenciadorRepository;

    private Usuario raquel, laura, sofia, zoe, alma;
    private List<Cromo> todosCromos;
    private Potenciador doblePuntos, triplePuntos, masCuatro, masOcho;

    @Override
    public void run(String... args) {
        System.out.println("=========================");
        System.out.println("EJECUTANDO DATABASE SEED");
        System.out.println("=========================");

        usuarioCromoRepository.deleteAll();
        usuarioPotenciadorRepository.deleteAll();
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

    private void crearUsuarios() {
        raquel = usuarioRepository.save(Usuario.builder().nombre("Raquel").build());
        laura = usuarioRepository.save(Usuario.builder().nombre("Laura").build());
        sofia = usuarioRepository.save(Usuario.builder().nombre("Sofia").build());
        zoe = usuarioRepository.save(Usuario.builder().nombre("Zoe").build());
        alma = usuarioRepository.save(Usuario.builder().nombre("Alma").build());
    }

    private void crearCromos() {
        todosCromos = Arrays.asList(
            cromoRepository.save(Cromo.builder().nombre("Miel").imagen("MIEL.png").puntuacion(10).descripcion("Convencional: Las abejas pueden pecorear en campos tratados con fitosanitarios.").build()),
            cromoRepository.save(Cromo.builder().nombre("Miel CAECV").imagen("MIELCAEV.png").puntuacion(25).descripcion("CAECV: Colmenas en zonas con flora libre de pesticidas, con el origen floral certificado.").build()),
            
            cromoRepository.save(Cromo.builder().nombre("Huevos").imagen("HUEVOS.png").puntuacion(10).descripcion("Convencional: Código 2 o 3: gallinas en suelo o jaula, piensos que pueden llevar aditivos.").build()),
            cromoRepository.save(Cromo.builder().nombre("Huevos CAECV").imagen("HUEVOSCAECV.png").puntuacion(25).descripcion("CAECV: Código 0: gallinas al aire libre con pienso ecológico, verificado por inspección anual.").build()),
            
            cromoRepository.save(Cromo.builder().nombre("Naranja").imagen("NARANJA.png").puntuacion(10).descripcion("Convencional: Tratada con fitosanitarios en el campo y ceras tras la cosecha.").build()),
            cromoRepository.save(Cromo.builder().nombre("Naranja CAECV").imagen("NARANJACAECV.png").puntuacion(25).descripcion("CAECV: Madura en el árbol sin pesticidas, con trazabilidad certificada desde el árbol hasta la caja.").build()),
            
            cromoRepository.save(Cromo.builder().nombre("Caqui").imagen("CAQUI.png").puntuacion(10).descripcion("Convencional: Tratado con fitosanitarios de síntesis durante el cultivo.").build()),
            cromoRepository.save(Cromo.builder().nombre("Caqui CAECV").imagen("CAQUICAECV.png").puntuacion(25).descripcion("CAECV: El sello Persimón ecológico certificado garantiza origen valenciano y cultivo limpio.").build()),
            
            cromoRepository.save(Cromo.builder().nombre("Algarroba").imagen("ALGARROBA.png").puntuacion(10).descripcion("Convencional: Cultivo tratado con fitosanitarios convencionales, aunque el algarrobo necesita pocos.").build()),
            cromoRepository.save(Cromo.builder().nombre("Algarroba CAECV").imagen("AGARROBACAECV.png").puntuacion(25).descripcion("CAECV: Certificación ecológica que recupera un cultivo tradicional valenciano casi olvidado.").build()),
            
            cromoRepository.save(Cromo.builder().nombre("Aceite de Oliva").imagen("ACEITE.png").puntuacion(10).descripcion("Convencional: Olivas tratadas con fitosanitarios de síntesis contra la mosca del olivo.").build()),
            cromoRepository.save(Cromo.builder().nombre("Aceite de Oliva CAECV").imagen("ACEITECAECV.png").puntuacion(25).descripcion("CAECV: Del olivar a la botella, cada fase auditada por el organismo oficial.").build()),
            
            cromoRepository.save(Cromo.builder().nombre("Cerezas").imagen("CEREZA.png").puntuacion(10).descripcion("Convencional: Tratadas con fitosanitarios de síntesis contra plagas como la mosca de la fruta.").build()),
            cromoRepository.save(Cromo.builder().nombre("Cerezas CAECV").imagen("CEREZACAECV.png").puntuacion(25).descripcion("CAECV: El árbol, el suelo y la cosecha pasan inspección oficial cada año.").build()),
            
            cromoRepository.save(Cromo.builder().nombre("Lácteos").imagen("LACTEOS.png").puntuacion(10).descripcion("Convencional: Ganado con pienso estándar (a veces transgénico) y tratamientos veterinarios frecuentes.").build()),
            cromoRepository.save(Cromo.builder().nombre("Lácteos CAECV").imagen("LACETOSCAECV.png").puntuacion(25).descripcion("CAECV: Ganado con pasto y pienso ecológico, con trazabilidad certificada del pasto al envase.").build()),
            
            cromoRepository.save(Cromo.builder().nombre("Granada").imagen("GRANADA.png").puntuacion(10).descripcion("Convencional: Tratada con fitosanitarios de síntesis contra plagas de la piel del fruto.").build()),
            cromoRepository.save(Cromo.builder().nombre("Granada CAECV").imagen("GRANADACAEV.png").puntuacion(25).descripcion("CAECV: Madura de forma natural, con Denominación de Origen y sello ecológico verificados juntos.").build()),
            
            cromoRepository.save(Cromo.builder().nombre("Tomate").imagen("TOMATE.png").puntuacion(10).descripcion("Convencional: Tratado con fitosanitarios de síntesis y a veces cultivado fuera de temporada.").build()),
            cromoRepository.save(Cromo.builder().nombre("Tomate CAECV").imagen("TOMATECAECV.png").puntuacion(25).descripcion("CAECV: Variedad tradicional valenciana con certificación ecológica verificada, no solo de toda la vida.").build())
        );
    }

    private void crearPotenciadores() {
        doblePuntos = potenciadorRepository.save(Potenciador.builder().nombre("Doble Puntos").imagen("x2Potenciador.png").tipo(TipoPotenciadores.DUPLICAR).build());
        triplePuntos = potenciadorRepository.save(Potenciador.builder().nombre("Triple Puntos").imagen("x3Potenciador.png").tipo(TipoPotenciadores.TRIPLICAR).build());
        masCuatro = potenciadorRepository.save(Potenciador.builder().nombre("Más Cuatro").imagen("mas4Potenciador.png").tipo(TipoPotenciadores.MAS_CUATRO).build());
        masOcho = potenciadorRepository.save(Potenciador.builder().nombre("Más Ocho").imagen("mas8Potenciador.png").tipo(TipoPotenciadores.MAS_OCHO).build());
    }

    private void asignarCromos() {
        java.time.LocalDateTime fechaActual = java.time.LocalDateTime.now();
        Usuario[] usuarios = {raquel, laura, sofia, zoe, alma};
        
        // Repartir aleatoriamente algunos cromos a los usuarios
        for (int i = 0; i < usuarios.length; i++) {
            Usuario u = usuarios[i];
            // Dale a cada usuario 4 cromos diferentes basados en su indice
            for(int j=0; j<4; j++) {
                int cromoIndex = (i * 3 + j * 5) % todosCromos.size();
                usuarioCromoRepository.save(UsuarioCromo.builder()
                    .usuario(u)
                    .cromo(todosCromos.get(cromoIndex))
                    .cantidad((j % 3) + 1)
                    .usado(false)
                    .fechaObtenido(fechaActual)
                    .build());
            }
        }
    }

    private void asignarPotenciadores() {
        java.sql.Date fechaActual = new java.sql.Date(System.currentTimeMillis());
        usuarioPotenciadorRepository.save(UsuarioPotenciador.builder().usuario(raquel).potenciador(doblePuntos).cantidad(2).fechaObtenido(fechaActual).build());
        usuarioPotenciadorRepository.save(UsuarioPotenciador.builder().usuario(laura).potenciador(triplePuntos).cantidad(1).fechaObtenido(fechaActual).build());
        usuarioPotenciadorRepository.save(UsuarioPotenciador.builder().usuario(alma).potenciador(doblePuntos).cantidad(5).fechaObtenido(fechaActual).build());
        usuarioPotenciadorRepository.save(UsuarioPotenciador.builder().usuario(zoe).potenciador(masCuatro).cantidad(2).fechaObtenido(fechaActual).build());
        usuarioPotenciadorRepository.save(UsuarioPotenciador.builder().usuario(sofia).potenciador(masOcho).cantidad(3).fechaObtenido(fechaActual).build());
    }
}