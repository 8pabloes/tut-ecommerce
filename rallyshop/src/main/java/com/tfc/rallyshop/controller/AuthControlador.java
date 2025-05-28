package com.tfc.rallyshop.controller;

import com.tfc.rallyshop.dto.AuthRequest;
import com.tfc.rallyshop.dto.AuthResponse;
import com.tfc.rallyshop.entity.Usuario;
import com.tfc.rallyshop.repository.UsuarioRepositorio;
import com.tfc.rallyshop.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/registro")
    public ResponseEntity<?> registrar(@RequestBody AuthRequest request) {
        if (repositorio.existsByCorreo(request.getCorreo())) {
            return ResponseEntity.badRequest().body("Correo ya registrado");
        }

        Usuario nuevo = new Usuario();
        nuevo.setNombre(request.getNombre());
        nuevo.setCorreo(request.getCorreo());
        nuevo.setContrasena(passwordEncoder.encode(request.getContrasena()));
        repositorio.save(nuevo);

        return ResponseEntity.ok("Usuario registrado");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        Usuario usuario = repositorio.findByCorreo(request.getCorreo());
        if (usuario == null || !passwordEncoder.matches(request.getContrasena(), usuario.getContrasena())) {
            return ResponseEntity.status(401).body("Credenciales inválidas");
        }

        String token = jwtUtil.generarToken(usuario.getCorreo());
        return ResponseEntity.ok(new AuthResponse(token, usuario.getNombre(), usuario.getId()));
    }
}
