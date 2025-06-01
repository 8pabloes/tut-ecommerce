package com.tfc.rallyshop.controller;

import com.tfc.rallyshop.entity.Coche;
import com.tfc.rallyshop.service.CocheServicio;
import com.tfc.rallyshop.service.CloudinaryService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/coches")
@CrossOrigin(origins = "http://localhost:5173")
public class CocheControlador {

    private final CocheServicio servicio;
    private final CloudinaryService cloudinaryService;

    public CocheControlador(CocheServicio servicio, CloudinaryService cloudinaryService) {
        this.servicio = servicio;
        this.cloudinaryService = cloudinaryService;
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

    @PostMapping(value = "", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> crearConImagen(
            @RequestParam("marca") String marca,
            @RequestParam("modelo") String modelo,
            @RequestParam("precio") double precio,
            @RequestParam("descripcion") String descripcion,
            @RequestParam("stock") int stock,
            @RequestParam("anio") int anio,
            @RequestParam("km") int km,
            @RequestParam("imagen") MultipartFile imagen
    ) {
        try {
            String url = cloudinaryService.subirImagen(imagen);

            Coche coche = new Coche();
            coche.setMarca(marca);
            coche.setModelo(modelo);
            coche.setPrecio(precio);
            coche.setDescripcion(descripcion);
            coche.setStock(stock);
            coche.setAnio(anio);
            coche.setKm(km);
            coche.setImagen(url);

            return ResponseEntity.ok(servicio.guardar(coche));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("❌ Error al subir imagen");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Coche> actualizar(@PathVariable Long id, @RequestBody Coche datos) {
        return servicio.obtenerPorId(id).map(coche -> {
            coche.setMarca(datos.getMarca());
            coche.setModelo(datos.getModelo());
            coche.setPrecio(datos.getPrecio());
            coche.setDescripcion(datos.getDescripcion());
            coche.setStock(datos.getStock());
            coche.setAnio(datos.getAnio());
            coche.setKm(datos.getKm());
            return ResponseEntity.ok(servicio.guardar(coche));
        }).orElse(ResponseEntity.notFound().build());
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
