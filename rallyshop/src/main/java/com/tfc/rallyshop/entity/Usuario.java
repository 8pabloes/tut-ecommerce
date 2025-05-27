package com.tfc.rallyshop.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

// Clase que representa la tabla 'usuarios'
@Entity
@Table(name = "usuarios")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {

    // Identificador del usuario (clave primaria autoincremental)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    // Nombre del usuario
    @Column(name = "nombre", nullable = false, length = 100)
    private String nombre;

    // Correo electrónico único
    @Column(name = "correo", nullable = false, unique = true, length = 100)
    private String correo;

    // Contraseña del usuario
    @Column(name = "contrasena", nullable = false)
    private String contrasena;
}
