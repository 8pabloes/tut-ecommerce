package com.tfc.rallyshop.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "lista_deseos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ListaDeseos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "coche_id")
    private Coche coche;
}
