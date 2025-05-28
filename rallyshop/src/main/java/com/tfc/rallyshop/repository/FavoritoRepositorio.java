package com.tfc.rallyshop.repository;

import com.tfc.rallyshop.entity.Favorito;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FavoritoRepositorio extends JpaRepository<Favorito, Long> {
    List<Favorito> findByUsuarioId(Long usuarioId);
    Optional<Favorito> findByUsuarioIdAndCocheId(Long usuarioId, Long cocheId);
    void deleteByUsuarioIdAndCocheId(Long usuarioId, Long cocheId);
}
