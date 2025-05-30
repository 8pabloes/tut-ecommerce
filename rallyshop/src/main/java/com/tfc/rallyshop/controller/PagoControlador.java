package com.tfc.rallyshop.controller;

import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import com.tfc.rallyshop.dto.PaymentRequest;
import com.tfc.rallyshop.entity.Coche;
import com.tfc.rallyshop.repository.CocheRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pago")
@CrossOrigin
public class PagoControlador {

    @Autowired
    private CocheRepositorio cocheRepo;

    @PostMapping("/carrito")
    public String crearSesionCarrito(@RequestBody PaymentRequest req) throws StripeException {
        List<Long> ids = req.getCochesIds();
        if (ids == null || ids.isEmpty()) {
            throw new RuntimeException("El carrito está vacío.");
        }

        SessionCreateParams.Builder builder = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl("http://localhost:5173/success")
                .setCancelUrl("http://localhost:5173/cancel");

        for (Long id : ids) {
            Coche coche = cocheRepo.findById(id).orElseThrow();

            if (coche.getStock() <= 0) {
                throw new RuntimeException("El coche " + coche.getMarca() + " " + coche.getModelo() + " no tiene stock.");
            }

            builder.addLineItem(
                SessionCreateParams.LineItem.builder()
                    .setQuantity(1L)
                    .setPriceData(
                        SessionCreateParams.LineItem.PriceData.builder()
                            .setCurrency("eur")
                            .setUnitAmount((long)(coche.getPrecio() * 100))
                            .setProductData(
                                SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                    .setName(coche.getMarca() + " " + coche.getModelo())
                                    .build()
                            )
                            .build()
                    )
                    .build()
            );

            // 💥 Descontar stock antes de crear la sesión
            coche.setStock(coche.getStock() - 1);
            cocheRepo.save(coche);
        }

        Session session = Session.create(builder.build());
        return session.getUrl();
    }
}
