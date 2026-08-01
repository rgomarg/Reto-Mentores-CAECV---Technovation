package com.retoCAECV.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.Builder;

import java.util.ArrayList;
import java.util.List;

import com.retoCAECV.backend.enums.TipoPotenciadores;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table (name = "potenciadores")
public class Potenciador {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //hace que postgress lo genere automaticamente
    private Long id;

    @Column (nullable = false)
    private String nombre;

    @Column 
    private String imagen;

    @Enumerated(EnumType.STRING)
    @Column (nullable = false)
    private TipoPotenciadores tipo;

    @Column
    private String atributos[];

    //Relaciones
    @OneToMany(mappedBy = "potenciador")
    private List<UsuarioPotenciador> usuarios = new ArrayList<>();


    
}
