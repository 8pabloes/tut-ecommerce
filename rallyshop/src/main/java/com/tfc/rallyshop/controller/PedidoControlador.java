package com.tfc.rallyshop.controller;

import com.tfc.rallyshop.entity.Pedido;
import com.tfc.rallyshop.service.PedidoServicio;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pedidos")
@CrossOrigin(origins = "http://localhost:5173")

@RequiredArgsConstructor
public class PedidoControlador {

    private final PedidoServicio servicio;

    @GetMapping
    public List<Pedido> listar() {
        return servicio.obtenerTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pedido> obtener(@PathVariable Long id) {
        return servicio.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Pedido crear(@RequestBody Pedido pedido) {
        return servicio.guardar(pedido);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Pedido> actualizar(@PathVariable Long id, @RequestBody Pedido pedido) {
        return servicio.obtenerPorId(id)
                .map(p -> {
                    p.setFecha(pedido.getFecha());
                    p.setTotal(pedido.getTotal());
                    p.setUsuario(pedido.getUsuario());
                    return ResponseEntity.ok(servicio.guardar(p));
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
