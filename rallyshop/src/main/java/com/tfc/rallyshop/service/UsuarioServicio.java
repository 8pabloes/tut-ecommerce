package com.tfc.rallyshop.service;

import com.tfc.rallyshop.entity.Usuario;
import com.tfc.rallyshop.repository.UsuarioRepositorio;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

// Servicio para manejar la lógica relacionada con los usuarios
@Service
public class UsuarioServicio {

    private final UsuarioRepositorio repositorio;

    public UsuarioServicio(UsuarioRepositorio repositorio) {
        this.repositorio = repositorio;
    }

    // Devolver todos los usuarios
    public List<Usuario> obtenerTodos() {
        return repositorio.findAll();
    }

    // Buscar un usuario por su ID
    public Optional<Usuario> obtenerPorId(Long id) {
        return repositorio.findById(id);
    }

    // Guardar un nuevo usuario o actualizar uno existente
    public Usuario guardar(Usuario usuario) {
        return repositorio.save(usuario);
    }

    // Eliminar usuario por ID
    public void eliminar(Long id) {
        repositorio.deleteById(id);
    }

    // Verificar si un correo ya está en uso
    public boolean existeCorreo(String correo) {
        return repositorio.existsByCorreo(correo);
    }
}
