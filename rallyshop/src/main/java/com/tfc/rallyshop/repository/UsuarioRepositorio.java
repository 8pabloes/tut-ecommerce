package com.tfc.rallyshop.repository;

import com.tfc.rallyshop.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UsuarioRepositorio extends JpaRepository<Usuario, Long> {
    boolean existsByCorreo(String correo);
    Optional<Usuario> findByCorreo(String correo);
}
