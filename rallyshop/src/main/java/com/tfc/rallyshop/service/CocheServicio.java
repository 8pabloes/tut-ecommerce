package com.tfc.rallyshop.service;

import com.tfc.rallyshop.entity.Coche;
import com.tfc.rallyshop.repository.CocheRepositorio;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CocheServicio {

    private final CocheRepositorio cocheRepositorio;

    public CocheServicio(CocheRepositorio cocheRepositorio) {
        this.cocheRepositorio = cocheRepositorio;
    }

    public List<Coche> obtenerTodos() {
        return cocheRepositorio.findAll();
    }

    public Optional<Coche> obtenerPorId(Long id) {
        return cocheRepositorio.findById(id);
    }

    public Coche guardar(Coche coche) {
        return cocheRepositorio.save(coche);
    }

    public void eliminar(Long id) {
        cocheRepositorio.deleteById(id);
    }
}
