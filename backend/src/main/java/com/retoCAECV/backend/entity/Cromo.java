package com.retoCAECV.backend.entity;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.Builder;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table (name = "cromos")
public class Cromo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //hace que postgress lo genere automaticamente
    private Long id;

    @Column (nullable = false)
    private String nombre;

    @Column 
    private String imagen;

    @Column (nullable = false)
    private int puntuacion;

    @Column(length = 500)
    private String descripcion;

    @ElementCollection
    private List<String> atributos = new ArrayList<>();



    //relaciones
    @JsonIgnore
    @OneToMany(mappedBy = "cromo")
    private List<UsuarioCromo> usuarios = new ArrayList<>();

}
