package com.tfc.rallyshop.service;

import com.tfc.rallyshop.entity.Favorito;
import com.tfc.rallyshop.entity.Usuario;
import com.tfc.rallyshop.entity.Coche;
import com.tfc.rallyshop.repository.FavoritoRepositorio;
import com.tfc.rallyshop.repository.UsuarioRepositorio;

import jakarta.transaction.Transactional;

import com.tfc.rallyshop.repository.CocheRepositorio;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavoritoServicio {

    private final FavoritoRepositorio repo;
    private final UsuarioRepositorio usuarioRepo;
    private final CocheRepositorio cocheRepo;

    public FavoritoServicio(FavoritoRepositorio repo, UsuarioRepositorio usuarioRepo, CocheRepositorio cocheRepo) {
        this.repo = repo;
        this.usuarioRepo = usuarioRepo;
        this.cocheRepo = cocheRepo;
    }

    public List<Favorito> obtenerFavoritos(Long usuarioId) {
        return repo.findByUsuarioId(usuarioId);
    }

    public boolean esFavorito(Long usuarioId, Long cocheId) {
        return repo.findByUsuarioIdAndCocheId(usuarioId, cocheId).isPresent();
    }

    public void añadirFavorito(Long usuarioId, Long cocheId) {
        if (!esFavorito(usuarioId, cocheId)) {
            Usuario usuario = usuarioRepo.findById(usuarioId).orElseThrow();
            Coche coche = cocheRepo.findById(cocheId).orElseThrow();
            Favorito f = new Favorito(null, usuario, coche);
            repo.save(f);
        }
    }
@Transactional
    public void eliminarFavorito(Long usuarioId, Long cocheId) {
        repo.deleteByUsuarioIdAndCocheId(usuarioId, cocheId);
    }
}
