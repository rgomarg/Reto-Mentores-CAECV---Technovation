package com.retoCAECV.backend.dto.response;

import java.util.List;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CromoResponseDTO {
    private String nombre;
    private String imagen;
    private int puntuacion;
    private String descripcion;
    private List<String> atributos;
}
