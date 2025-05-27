package com.tfc.rallyshop.repository;

import com.tfc.rallyshop.entity.Favorito;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FavoritoRepositorio extends JpaRepository<Favorito, Long> {
}
