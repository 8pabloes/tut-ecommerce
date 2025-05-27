package com.tfc.rallyshop.service;

import com.tfc.rallyshop.entity.Carrito;
import com.tfc.rallyshop.repository.CarritoRepositorio;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CarritoServicio {

    private final CarritoRepositorio repositorio;

    public List<Carrito> obtenerTodos() {
        return repositorio.findAll();
    }

    public Optional<Carrito> obtenerPorId(Long id) {
        return repositorio.findById(id);
    }

    public Carrito guardar(Carrito carrito) {
        return repositorio.save(carrito);
    }

    public void eliminar(Long id) {
        repositorio.deleteById(id);
    }
}
