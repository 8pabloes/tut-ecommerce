package com.tfc.rallyshop.service;

import com.tfc.rallyshop.entity.Pedido;
import com.tfc.rallyshop.repository.PedidoRepositorio;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PedidoServicio {

    private final PedidoRepositorio repositorio;

    public List<Pedido> obtenerTodos() {
        return repositorio.findAll();
    }

    public Optional<Pedido> obtenerPorId(Long id) {
        return repositorio.findById(id);
    }

    public Pedido guardar(Pedido pedido) {
        return repositorio.save(pedido);
    }

    public void eliminar(Long id) {
        repositorio.deleteById(id);
    }
}
