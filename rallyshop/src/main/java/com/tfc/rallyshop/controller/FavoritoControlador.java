package com.tfc.rallyshop.controller;

import com.tfc.rallyshop.entity.Favorito;
import com.tfc.rallyshop.service.FavoritoServicio;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favoritos")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class FavoritoControlador {

    private final FavoritoServicio servicio;

    @GetMapping
    public List<Favorito> listar() {
        return servicio.obtenerTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Favorito> obtener(@PathVariable Long id) {
        return servicio.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Favorito crear(@RequestBody Favorito favorito) {
        return servicio.guardar(favorito);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Favorito> actualizar(@PathVariable Long id, @RequestBody Favorito favorito) {
        return servicio.obtenerPorId(id)
                .map(f -> {
                    f.setUsuario(favorito.getUsuario());
                    f.setCoche(favorito.getCoche());
                    return ResponseEntity.ok(servicio.guardar(f));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (servicio.obtenerPorId(id).isPresent()) {
            servicio.eliminar(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
