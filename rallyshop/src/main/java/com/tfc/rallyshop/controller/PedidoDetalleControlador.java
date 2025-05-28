
package com.tfc.rallyshop.controller;

import com.tfc.rallyshop.entity.PedidoDetalle;
import com.tfc.rallyshop.service.PedidoDetalleServicio;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pedido-detalles")
@CrossOrigin(origins = "http://localhost:5173")

@RequiredArgsConstructor
public class PedidoDetalleControlador {

    private final PedidoDetalleServicio servicio;

    @GetMapping
    public List<PedidoDetalle> listar() {
        return servicio.obtenerTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PedidoDetalle> obtener(@PathVariable Long id) {
        return servicio.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public PedidoDetalle crear(@RequestBody PedidoDetalle detalle) {
        return servicio.guardar(detalle);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PedidoDetalle> actualizar(@PathVariable Long id, @RequestBody PedidoDetalle detalle) {
        return servicio.obtenerPorId(id)
                .map(d -> {
                    d.setPedido(detalle.getPedido());
                    d.setCoche(detalle.getCoche());
                    d.setCantidad(detalle.getCantidad());
                    d.setPrecioUnitario(detalle.getPrecioUnitario());
                    return ResponseEntity.ok(servicio.guardar(d));
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
