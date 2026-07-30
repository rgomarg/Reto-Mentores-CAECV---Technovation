package com.retoCAECV.backend.entity;

import java.sql.Date;

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
@Table (name = "Usuario_Cromo")
public class UsuarioCromo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column (nullable = false)
    private boolean usado;
    
    @Column (nullable = false)
    private Date fechaObtenido;

    @Column
    private int cantidad; //cuántos repetidos tiene

    //relaciones
    @ManyToOne 
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn (name = "cromo_id")
    private Cromo cromo;
}
