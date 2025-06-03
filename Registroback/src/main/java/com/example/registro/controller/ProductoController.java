package com.example.registro.controller;

import com.example.registro.model.Producto;
import com.example.registro.service.ProductoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth/layout")
@CrossOrigin(origins = "*")
public class ProductoController {

    private final ProductoService productoService;

    // ✅ Inyectamos el servicio, no el repositorio directamente
    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    // ✅ Obtener todos los productos desde el servicio
    @GetMapping
    public List<Producto> listarTodos() {
        return productoService.listarTodos();
    }
}
