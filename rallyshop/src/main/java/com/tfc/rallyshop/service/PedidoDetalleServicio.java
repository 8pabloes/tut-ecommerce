package com.tfc.rallyshop.service;

import com.tfc.rallyshop.entity.PedidoDetalle;
import com.tfc.rallyshop.repository.PedidoDetalleRepositorio;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PedidoDetalleServicio {

    private final PedidoDetalleRepositorio repositorio;

    public List<PedidoDetalle> obtenerTodos() {
        return repositorio.findAll();
    }

    public Optional<PedidoDetalle> obtenerPorId(Long id) {
        return repositorio.findById(id);
    }

    public PedidoDetalle guardar(PedidoDetalle detalle) {
        return repositorio.save(detalle);
    }

    public void eliminar(Long id) {
        repositorio.deleteById(id);
    }
}
