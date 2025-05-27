package com.tfc.rallyshop.controller;

import com.tfc.rallyshop.entity.ListaDeseos;
import com.tfc.rallyshop.service.ListaDeseosServicio;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/listadeseos")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class ListaDeseosControlador {

    private final ListaDeseosServicio servicio;

    @GetMapping
    public List<ListaDeseos> listar() {
        return servicio.obtenerTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ListaDeseos> obtener(@PathVariable Long id) {
        return servicio.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ListaDeseos crear(@RequestBody ListaDeseos lista) {
        return servicio.guardar(lista);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ListaDeseos> actualizar(@PathVariable Long id, @RequestBody ListaDeseos lista) {
        return servicio.obtenerPorId(id)
                .map(l -> {
                    l.setUsuario(lista.getUsuario());
                    l.setCoche(lista.getCoche());
                    return ResponseEntity.ok(servicio.guardar(l));
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
