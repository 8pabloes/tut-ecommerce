package com.tfc.rallyshop.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "coches")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Coche {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "marca", nullable = false, length = 50)
    private String marca;

    @Column(name = "modelo", nullable = false, length = 50)
    private String modelo;

    @Column(name = "precio", nullable = false)
    private double precio;

    @Column(name = "stock", nullable = false)
    private int stock;

    @Column(name = "imagen")
    private String imagen;

    @Column(name = "descripcion", length = 1000)
    private String descripcion;

    @Column(name = "anio", nullable = false)
    private int anio;

    @Column(name = "km", nullable = false)
    private int km;
}
