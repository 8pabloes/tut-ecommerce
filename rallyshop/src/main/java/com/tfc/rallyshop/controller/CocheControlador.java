package com.tfc.rallyshop.controller;

import com.tfc.rallyshop.entity.Coche;
import com.tfc.rallyshop.service.CocheServicio;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/coches")
@CrossOrigin(origins = "http://localhost:5173")
public class CocheControlador {

    private final CocheServicio servicio;

    public CocheControlador(CocheServicio servicio) {
        this.servicio = servicio;
    }

    @GetMapping
    public List<Coche> listar() {
        return servicio.obtenerTodos();
    }

    @GetMapping("/pagina")
    public Page<Coche> obtenerPaginados(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return servicio.obtenerPaginados(pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Coche> obtener(@PathVariable Long id) {
        return servicio.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Coche> crear(
            @RequestPart("marca") String marca,
            @RequestPart("modelo") String modelo,
            @RequestPart("precio") Double precio,
            @RequestPart("stock") Integer stock,
            @RequestPart("anio") Integer anio,
            @RequestPart("km") Integer km,
            @RequestPart("descripcion") String descripcion,
            @RequestPart(value = "imagen", required = false) MultipartFile imagen
    ) {
        Coche coche = new Coche();
        coche.setMarca(marca);
        coche.setModelo(modelo);
        coche.setPrecio(precio);
        coche.setStock(stock);
        coche.setAnio(anio);
        coche.setKm(km);
        coche.setDescripcion(descripcion);

        if (imagen != null && !imagen.isEmpty()) {
            if (!imagen.getOriginalFilename().toLowerCase().endsWith(".jpg")) {
                return ResponseEntity.badRequest().body(null);
            }

            try {
                String nombreArchivo = System.currentTimeMillis() + ".jpg";
                Path ruta = Paths.get("uploads").resolve(nombreArchivo);
                Files.createDirectories(ruta.getParent());
                imagen.transferTo(ruta.toFile());
                coche.setImagen(nombreArchivo);
            } catch (IOException e) {
                return ResponseEntity.internalServerError().build();
            }
        }

        return ResponseEntity.ok(servicio.guardar(coche));
    }

@PutMapping("/{id}")
public ResponseEntity<Coche> actualizar(
        @PathVariable Long id,
        @RequestPart("marca") String marca,
        @RequestPart("modelo") String modelo,
        @RequestPart("precio") Double precio,
        @RequestPart("stock") Integer stock,
        @RequestPart("anio") Integer anio,
        @RequestPart("km") Integer km,
        @RequestPart("descripcion") String descripcion,
        @RequestPart(value = "imagen", required = false) MultipartFile imagen
) {
    if (!servicio.obtenerPorId(id).isPresent()) {
        return ResponseEntity.notFound().build();
    }

    Coche coche = servicio.obtenerPorId(id).get();
    coche.setMarca(marca);
    coche.setModelo(modelo);
    coche.setPrecio(precio);
    coche.setStock(stock);
    coche.setAnio(anio);
    coche.setKm(km);
    coche.setDescripcion(descripcion);

    if (imagen != null && !imagen.isEmpty()) {
        if (!imagen.getOriginalFilename().toLowerCase().endsWith(".jpg")) {
            return ResponseEntity.badRequest().body(null);
        }

        try {
            String nombreArchivo = System.currentTimeMillis() + ".jpg";
            Path ruta = Paths.get("uploads").resolve(nombreArchivo);
            Files.createDirectories(ruta.getParent());
            imagen.transferTo(ruta.toFile());
            coche.setImagen(nombreArchivo);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    return ResponseEntity.ok(servicio.guardar(coche));
}


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (servicio.obtenerPorId(id).isPresent()) {
            servicio.eliminar(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
