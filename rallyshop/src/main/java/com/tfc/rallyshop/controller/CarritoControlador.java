
package com.tfc.rallyshop.controller;

import com.tfc.rallyshop.entity.Carrito;
import com.tfc.rallyshop.service.CarritoServicio;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/carrito")
@CrossOrigin(origins = "http://localhost:5173")

@RequiredArgsConstructor
public class CarritoControlador {

    private final CarritoServicio servicio;

    @GetMapping
    public List<Carrito> listar() {
        return servicio.obtenerTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Carrito> obtener(@PathVariable Long id) {
        return servicio.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Carrito crear(@RequestBody Carrito carrito) {
        return servicio.guardar(carrito);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Carrito> actualizar(@PathVariable Long id, @RequestBody Carrito carrito) {
        return servicio.obtenerPorId(id)
                .map(c -> {
                    c.setUsuario(carrito.getUsuario());
                    c.setCoche(carrito.getCoche());
                    c.setCantidad(carrito.getCantidad());
                    return ResponseEntity.ok(servicio.guardar(c));
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
