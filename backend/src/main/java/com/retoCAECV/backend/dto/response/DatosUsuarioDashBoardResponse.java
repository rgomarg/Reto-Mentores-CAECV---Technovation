package com.retoCAECV.backend.dto.response;

import java.util.List;
import lombok.*;
import com.retoCAECV.backend.entity.UsuarioCromo;
import com.retoCAECV.backend.entity.UsuarioPotenciador;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DatosUsuarioDashBoardResponse {
    private String nombre;
    private int puntuacionUsuario;
    private int nCromos;
    private int nPotenciadores;
    private List<UsuarioCromo> usuarioCromos;
    private List<UsuarioPotenciador> usuarioPotenciadores;
    
}
