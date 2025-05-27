package com.tfc.rallyshop.service;

import com.tfc.rallyshop.entity.ListaDeseos;
import com.tfc.rallyshop.repository.ListaDeseosRepositorio;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ListaDeseosServicio {

    private final ListaDeseosRepositorio repositorio;

    public List<ListaDeseos> obtenerTodos() {
        return repositorio.findAll();
    }

    public Optional<ListaDeseos> obtenerPorId(Long id) {
        return repositorio.findById(id);
    }

    public ListaDeseos guardar(ListaDeseos lista) {
        return repositorio.save(lista);
    }

    public void eliminar(Long id) {
        repositorio.deleteById(id);
    }
}
