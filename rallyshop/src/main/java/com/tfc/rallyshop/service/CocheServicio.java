package com.tfc.rallyshop.service;

import com.tfc.rallyshop.entity.Coche;
import com.tfc.rallyshop.repository.CocheRepositorio;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CocheServicio {

    private final CocheRepositorio repositorio;

    public CocheServicio(CocheRepositorio repositorio) {
        this.repositorio = repositorio;
    }

    public List<Coche> obtenerTodos() {
        return repositorio.findAll();
    }

    public Optional<Coche> obtenerPorId(Long id) {
        return repositorio.findById(id);
    }

    public Coche guardar(Coche coche) {
        return repositorio.save(coche);
    }

    public void eliminar(Long id) {
        repositorio.deleteById(id);
    }
}
