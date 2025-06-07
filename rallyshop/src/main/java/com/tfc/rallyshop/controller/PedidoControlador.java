package com.tfc.rallyshop.controller;

import com.tfc.rallyshop.entity.Pedido;
import com.tfc.rallyshop.entity.PedidoDetalle;
import com.tfc.rallyshop.entity.Usuario;
import com.tfc.rallyshop.entity.Coche;
import com.tfc.rallyshop.repository.CocheRepositorio;
import com.tfc.rallyshop.repository.PedidoRepositorio;
import com.tfc.rallyshop.repository.PedidoDetalleRepositorio;
import com.tfc.rallyshop.repository.UsuarioRepositorio;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/pedidos")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class PedidoControlador {

    private final PedidoRepositorio pedidoRepositorio;
    private final PedidoDetalleRepositorio pedidoDetalleRepositorio;
    private final UsuarioRepositorio usuarioRepositorio;
    private final CocheRepositorio cocheRepositorio;

    @PostMapping("/crear")
    public ResponseEntity<String> crearPedido(@RequestBody List<Map<String, Object>> carrito, Principal principal) {
        String email = principal.getName();
        Usuario usuario = usuarioRepositorio.findByCorreo(email).orElse(null);
        if (usuario == null) return ResponseEntity.badRequest().body("Usuario no encontrado");

        Pedido pedido = new Pedido();
        pedido.setUsuario(usuario);
        pedido.setFecha(LocalDate.now());

        double total = 0;
        for (Map<String, Object> item : carrito) {
            double precio = Double.parseDouble(item.get("precio").toString());
            int cantidad = Integer.parseInt(item.get("cantidad").toString());
            total += precio * cantidad;
        }
        pedido.setTotal(total);
        pedidoRepositorio.save(pedido);

        for (Map<String, Object> item : carrito) {
            Long cocheId = Long.valueOf(item.get("id").toString());
            int cantidad = Integer.parseInt(item.get("cantidad").toString());

            Coche coche = cocheRepositorio.findById(cocheId).orElse(null);
            if (coche == null) continue;

            PedidoDetalle detalle = new PedidoDetalle();
            detalle.setPedido(pedido);
            detalle.setCoche(coche);
            detalle.setCantidad(cantidad);
            detalle.setPrecioUnitario(coche.getPrecio());

            pedidoDetalleRepositorio.save(detalle);

            coche.setStock(coche.getStock() - cantidad);
            cocheRepositorio.save(coche);
        }

        return ResponseEntity.ok("Pedido registrado correctamente");
    }
}
