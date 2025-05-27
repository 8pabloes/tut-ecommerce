package com.tfc.rallyshop.service;

import com.tfc.rallyshop.entity.Favorito;
import com.tfc.rallyshop.repository.FavoritoRepositorio;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FavoritoServicio {

    private final FavoritoRepositorio repositorio;

    public List<Favorito> obtenerTodos() {
        return repositorio.findAll();
    }

    public Optional<Favorito> obtenerPorId(Long id) {
        return repositorio.findById(id);
    }

    public Favorito guardar(Favorito favorito) {
        return repositorio.save(favorito);
    }

    public void eliminar(Long id) {
        repositorio.deleteById(id);
    }
}
