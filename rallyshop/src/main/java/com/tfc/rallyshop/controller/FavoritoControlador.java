package com.tfc.rallyshop.controller;

import com.tfc.rallyshop.entity.Favorito;
import com.tfc.rallyshop.service.FavoritoServicio;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favoritos")
@CrossOrigin(origins = "http://localhost:5173")
public class FavoritoControlador {

    private final FavoritoServicio servicio;

    public FavoritoControlador(FavoritoServicio servicio) {
        this.servicio = servicio;
    }

    @GetMapping("/{usuarioId}")
    public List<Favorito> obtenerFavoritos(@PathVariable Long usuarioId) {
        return servicio.obtenerFavoritos(usuarioId);
    }

    @PostMapping("/{usuarioId}/{cocheId}")
    public void añadirFavorito(@PathVariable Long usuarioId, @PathVariable Long cocheId) {
        servicio.añadirFavorito(usuarioId, cocheId);
    }

    @DeleteMapping("/{usuarioId}/{cocheId}")
    public void eliminarFavorito(@PathVariable Long usuarioId, @PathVariable Long cocheId) {
        servicio.eliminarFavorito(usuarioId, cocheId);
    }

    @GetMapping("/existe/{usuarioId}/{cocheId}")
    public boolean esFavorito(@PathVariable Long usuarioId, @PathVariable Long cocheId) {
        return servicio.esFavorito(usuarioId, cocheId);
    }
}
