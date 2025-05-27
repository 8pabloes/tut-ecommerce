package com.tfc.rallyshop.controller;

import com.tfc.rallyshop.entity.Usuario;
import com.tfc.rallyshop.repository.UsuarioRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthControlador {

    @Autowired
    private UsuarioRepositorio repositorio;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Endpoint para registrar usuario
    @PostMapping("/registro")
    public String registrar(@RequestBody Usuario usuario) {
        if (repositorio.existsByCorreo(usuario.getCorreo())) {
            return "Correo ya registrado";
        }
        usuario.setContrasena(passwordEncoder.encode(usuario.getContrasena()));
        repositorio.save(usuario);
        return "Usuario registrado";
    }

    // Endpoint para login
    @PostMapping("/login")
    public String login(@RequestBody Usuario datos) {
        Usuario usuario = repositorio.findByCorreo(datos.getCorreo());
        if (usuario == null) return "Usuario no encontrado";
        if (passwordEncoder.matches(datos.getContrasena(), usuario.getContrasena())) {
            return "Login correcto";
        } else {
            return "Contraseña incorrecta";
        }
    }
}
