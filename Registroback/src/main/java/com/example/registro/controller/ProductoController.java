package com.example.registro.controller;

import com.example.registro.model.Producto;
import com.example.registro.service.ProductoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth/layout")
@CrossOrigin(origins = "*")
public class ProductoController {

    private final ProductoService productoService;

    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    @GetMapping
    public List<Producto> listarTodos() {
        return productoService.listarTodos();
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> solicitarActualizacionProducto(
            @PathVariable Long id,
            @RequestBody Producto productoActualizado,
            @RequestParam String usuario) {

        return productoService.obtenerProductoPorId(id)
                .map(productoExistente -> {
                    productoService.solicitarActualizacion(productoActualizado, productoExistente, usuario);
                    return ResponseEntity.ok("Solicitud de actualización enviada al buzón.");
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
