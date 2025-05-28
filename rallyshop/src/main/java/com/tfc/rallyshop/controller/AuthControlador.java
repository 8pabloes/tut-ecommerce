package com.tfc.rallyshop.controller;

import com.tfc.rallyshop.entity.Usuario;
import com.tfc.rallyshop.repository.UsuarioRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/auth")
public class AuthControlador {

    @Autowired
    private UsuarioRepositorio repositorio;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Endpoint para registrar usuario
   @PostMapping("/registro")
public ResponseEntity<String> registrar(@RequestBody Usuario usuario) {
    if (repositorio.existsByCorreo(usuario.getCorreo())) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Correo ya registrado");
    }
    usuario.setContrasena(passwordEncoder.encode(usuario.getContrasena()));
    repositorio.save(usuario);
    return ResponseEntity.ok("Usuario registrado");
}


    // Endpoint para login
@PostMapping("/login")
public ResponseEntity<?> login(@RequestBody Usuario datos) {
    Usuario usuario = repositorio.findByCorreo(datos.getCorreo());
    if (usuario == null) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Usuario no encontrado");
    }
    if (passwordEncoder.matches(datos.getContrasena(), usuario.getContrasena())) {
        return ResponseEntity.ok(usuario); // ✅ Devuelve el usuario completo
    } else {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Contraseña incorrecta");
    }
}


}
