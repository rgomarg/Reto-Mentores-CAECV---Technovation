package com.retoCAECV.backend.entity;
import jakarta.persistence.*;

@Entity //esto va a ser una tabla en la BD
@Table(name = "usuarios") //le da el nombre de usuarios
public class Usuario {
    @Id //es la Clave primaria
    @GeneratedValue(strategy = GenerationType.IDENTITY) //hace que postgress lo genere automaticamente
    private Long id;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false, unique = true)
    private String email;

    public Usuario(){

    }

    public Usuario(String nombre, String email){
        this.nombre= nombre;
        this.email=email;
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

    public String getEmail(){
        return email;
    }

    public void setEmail(String email){
        this.email=email;
    }
}
