package com.example.registro.controller;

import com.example.registro.model.Buzon;
import com.example.registro.model.Producto;
import com.example.registro.repository.BuzonRepository;
import com.example.registro.service.BuzonService;
import com.example.registro.service.ProductoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.Optional;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/buzon")
@CrossOrigin(origins = "http://localhost:4200")
public class BuzonController {

    @Autowired
    private BuzonService buzonService;

    @Autowired
    private BuzonRepository buzonRepository;

    @Autowired
    private ProductoService productoService;

    // POST: Crear nueva solicitud
    @PostMapping("/solicitud")
    public ResponseEntity<?> crearSolicitud(@RequestBody Buzon buzon) {
        if (buzon.getTipoSolicitud() == null) {
            return ResponseEntity.badRequest().body("tipoSolicitud no puede ser null");
        }
        if (buzon.getProducto() == null || buzon.getProducto().isEmpty()) {
            return ResponseEntity.badRequest().body("producto no puede ser vacío");
        }
        if (buzon.getCategoria() == null || buzon.getCategoria().isEmpty()) {
            return ResponseEntity.badRequest().body("categoria no puede ser vacío");
        }
        if (buzon.getCantidad() == null || buzon.getCantidad() <= 0) {
            return ResponseEntity.badRequest().body("cantidad debe ser mayor a 0");
        }
        if (buzon.getUsuarioSolicitante() == null || buzon.getUsuarioSolicitante().isEmpty()) {
            return ResponseEntity.badRequest().body("usuarioSolicitante no puede ser vacío");
        }

        // Campos automáticos
        if (buzon.getEstado() == null) {
            buzon.setEstado("PENDIENTE");
        }
        if (buzon.getFechaSolicitud() == null) {
            buzon.setFechaSolicitud(new Date());
        }
        if (buzon.getMotivoDeEliminacion() == null) {
            buzon.setMotivoDeEliminacion("NINGUNO");
        }
        if (buzon.getSolicitudModificada() == null) {
            buzon.setSolicitudModificada(false);
        }

        Buzon guardado = buzonService.guardar(buzon);
        return ResponseEntity.ok(guardado);
    }

    // GET: Obtener solicitudes de tipo REGISTRAR y estado PENDIENTE
    @GetMapping("/solicitudes/registro")
    public List<Buzon> obtenerSolicitudesDeRegistro() {
        return buzonService.listarSolicitudesPorTipoYEstado("REGISTRAR", "PENDIENTE");
    }

    @PostMapping("/aceptar/{id}")
    public ResponseEntity<?> aceptarSolicitud(@PathVariable Long id) {
        Optional<Buzon> solicitudOpt = buzonService.obtenerPorId(id);
        if (!solicitudOpt.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        Buzon solicitud = solicitudOpt.get();

        Producto nuevo = new Producto();
        nuevo.setNombreProducto(solicitud.getProducto());
        nuevo.setCategoria(solicitud.getCategoria());
        nuevo.setCantidad(solicitud.getCantidad());
        nuevo.setCodigo(String.format("COD-%03d", solicitud.getId()));
        nuevo.setFechaCreacion(LocalDateTime.now());
        productoService.guardarProducto(nuevo);

        solicitud.setEstado("ACEPTADO");
        solicitud.setFechaRegistro(new Date());
        solicitud.setProductoId(nuevo.getId());
        buzonService.guardar(solicitud);

        return ResponseEntity.ok(Map.of("mensaje", "Solicitud aceptada y producto registrado."));
    }

    // Cambiado a DELETE y ruta simplificada para coincidir con frontend
    @DeleteMapping("/rechazar/{id}")
    public ResponseEntity<?> rechazarSolicitud(@PathVariable Long id) {
        if (buzonRepository.existsById(id)) {
            buzonRepository.deleteById(id);
            return ResponseEntity.ok(Map.of("mensaje", "Solicitud eliminada"));
        }
        return ResponseEntity.notFound().build();
    }
}
