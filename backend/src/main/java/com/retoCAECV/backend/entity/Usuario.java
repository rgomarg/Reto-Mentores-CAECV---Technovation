package com.retoCAECV.backend.entity;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;

@Entity //esto va a ser una tabla en la BD
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


    //Getters, setter, constructores
    public Usuario(){ }

    public Usuario(String nombre){
        this.nombre= nombre;
    }

    public Long getId(){
        return id;
    }
    public String getNombre(){
        return nombre;
    }
    public void setNombre(String nombre){
        this.nombre=nombre;
    }

}
