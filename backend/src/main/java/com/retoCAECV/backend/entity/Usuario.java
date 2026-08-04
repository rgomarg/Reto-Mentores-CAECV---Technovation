package com.retoCAECV.backend.entity;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.Builder;

@Entity //esto va a ser una tabla en la BD
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "usuarios") //le da el nombre de usuarios
public class Usuario {
    @Id //es la Clave primaria
    @GeneratedValue(strategy = GenerationType.IDENTITY) //hace que postgress lo genere automaticamente
    private Long id;

    @Column(nullable = false)
    private String nombre;

    //relaciones
    @OneToMany (mappedBy = "usuario")
    private List<UsuarioCromo> cromos = new ArrayList<>(); 

    @OneToMany (mappedBy = "usuario")
    private List<UsuarioPotenciador> potenciadores = new ArrayList<>(); 


    

}
