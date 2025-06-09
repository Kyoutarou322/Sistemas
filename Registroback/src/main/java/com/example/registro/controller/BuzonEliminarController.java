package com.example.registro.controller;

import com.example.registro.model.BuzonEliminar;
import com.example.registro.service.BuzonEliminarService;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/buzoneliminar")
@CrossOrigin(origins = "http://localhost:4200")
public class BuzonEliminarController {

    @Autowired
    private BuzonEliminarService buzonEliminarService;

    
    private final BuzonEliminarService service;

    public BuzonEliminarController(BuzonEliminarService service) {
        this.service = service;
    }

    @PostMapping("/solicitud")
    public ResponseEntity<?> registrarSolicitud(@RequestBody BuzonEliminar solicitud) {
        if (solicitud.getProducto() == null || solicitud.getProducto().isEmpty()) {
            return ResponseEntity.badRequest().body("producto no puede ser vacío");
        }
        if (solicitud.getCategoria() == null || solicitud.getCategoria().isEmpty()) {
            return ResponseEntity.badRequest().body("categoria no puede ser vacío");
        }
        if (solicitud.getCantidad() == null || solicitud.getCantidad().isEmpty()) {
            return ResponseEntity.badRequest().body("cantidad no puede ser vacía");
        }
        if (!solicitud.getCantidad().matches("\\d+(\\s*/\\s*\\d+)?")) {
            return ResponseEntity.badRequest().body("cantidad debe ser un número o formato válido");
        }
        if (solicitud.getUsuarioSolicitante() == null || solicitud.getUsuarioSolicitante().isEmpty()) {
            return ResponseEntity.badRequest().body("usuarioSolicitante no puede ser vacío");
        }

        solicitud.setEstado("PENDIENTE");
        solicitud.setTipoSolicitud("ELIMINAR");
        solicitud.setFechaSolicitud(LocalDateTime.now());
        solicitud.setSolicitudModificada(false);

        BuzonEliminar guardada = service.guardarSolicitud(solicitud);
        return ResponseEntity.ok(guardada);
    }

    @GetMapping("/solicitudes/eliminacion")
    public List<BuzonEliminar> obtenerSolicitudesDeEliminacion() {
        return service.listarSolicitudesPorEstado("PENDIENTE");
    }

    @GetMapping("/solicitudes/eliminar/historial")
    public List<BuzonEliminar> obtenerSolicitudesDeEliminacionHistorial() {
        return buzonEliminarService.listarSolicitudesPorTipoYEstado("ELIMINAR", List.of("ACEPTADA", "RECHAZADA"));
    }

    @PostMapping("/aceptar/{id}")
    public ResponseEntity<?> aceptarSolicitud(@PathVariable Long id) {
        Optional<BuzonEliminar> solicitudOpt = service.aceptarSolicitud(id);
        return solicitudOpt.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/rechazar/{id}")
public ResponseEntity<?> rechazarSolicitud(@PathVariable Long id) {
    return service.rechazarSolicitud(id);
}
}
