package com.tfc.rallyshop.repository;

import com.tfc.rallyshop.entity.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PedidoRepositorio extends JpaRepository<Pedido, Long> {
}
