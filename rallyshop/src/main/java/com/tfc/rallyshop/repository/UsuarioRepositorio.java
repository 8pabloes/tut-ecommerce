package com.tfc.rallyshop.repository;

import com.tfc.rallyshop.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

// Repositorio para acceder a los datos de los usuarios
public interface UsuarioRepositorio extends JpaRepository<Usuario, Long> {

    // Comprobar si ya existe un correo registrado
    boolean existsByCorreo(String correo);
}
