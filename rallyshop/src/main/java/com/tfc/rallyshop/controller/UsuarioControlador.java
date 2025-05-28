package com.tfc.rallyshop.controller;

import com.tfc.rallyshop.entity.Usuario;
import com.tfc.rallyshop.service.UsuarioServicio;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Controlador para gestionar peticiones relacionadas con usuarios
@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:5173")
 // Para conectar con React en local
public class UsuarioControlador {

    private final UsuarioServicio servicio;

    public UsuarioControlador(UsuarioServicio servicio) {
        this.servicio = servicio;
    }

    // Obtener todos los usuarios
    @GetMapping
    public List<Usuario> listar() {
        return servicio.obtenerTodos();
    }

    // Obtener un usuario por su ID
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> obtener(@PathVariable Long id) {
        return servicio.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Crear un nuevo usuario
    @PostMapping
    public Usuario crear(@RequestBody Usuario usuario) {
        return servicio.guardar(usuario);
    }

    // Modificar un usuario existente
    @PutMapping("/{id}")
    public ResponseEntity<Usuario> actualizar(@PathVariable Long id, @RequestBody Usuario usuario) {
        return servicio.obtenerPorId(id)
                .map(u -> {
                    u.setNombre(usuario.getNombre());
                    u.setCorreo(usuario.getCorreo());
                    u.setContrasena(usuario.getContrasena());
                    return ResponseEntity.ok(servicio.guardar(u));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Eliminar un usuario por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (servicio.obtenerPorId(id).isPresent()) {
            servicio.eliminar(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
