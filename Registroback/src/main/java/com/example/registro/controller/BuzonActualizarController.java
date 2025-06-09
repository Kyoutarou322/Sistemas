package com.example.registro.controller;


import com.example.registro.model.BuzonActualizar;
import com.example.registro.service.BuzonActualizarService;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/buzonactualizar")
@CrossOrigin(origins = "http://localhost:4200")
public class BuzonActualizarController {

    @Autowired
    private BuzonActualizarService buzonActualizarService;
    private final BuzonActualizarService service;
    
    public BuzonActualizarController(BuzonActualizarService service) {
        this.service = service;
    }

    @PostMapping("/solicitud")
    public ResponseEntity<?> registrarSolicitud(@RequestBody BuzonActualizar solicitud) {
        // Validaciones básicas
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

        solicitud.setEstado(solicitud.getEstado() == null ? "PENDIENTE" : solicitud.getEstado());
        solicitud.setFechaSolicitud(solicitud.getFechaSolicitud() == null ? LocalDateTime.now() : solicitud.getFechaSolicitud());

        BuzonActualizar guardada = service.guardarSolicitud(solicitud);
        return ResponseEntity.ok(guardada);
    }

    @GetMapping("/solicitudes/actualizacion")
    public List<BuzonActualizar> obtenerSolicitudesDeActualizacion() {
        return service.listarSolicitudesPorEstado("PENDIENTE");
    }
    
    @GetMapping("/solicitudes/actualizar/historial")
    public List<BuzonActualizar> obtenerSolicitudesDeRegistroHistorial() {
        return buzonActualizarService.listarSolicitudesPorTipoYEstado("ACTUALIZAR", List.of("ACEPTADA", "RECHAZADA"));
    }

    @PostMapping("/aceptar/{id}")
    public ResponseEntity<?> aceptarSolicitud(@PathVariable Long id) {
    Optional<BuzonActualizar> solicitudOpt = service.aceptarSolicitud(id);
    if (solicitudOpt.isPresent()) {
        BuzonActualizar solicitudActualizada = solicitudOpt.get();
        return ResponseEntity.ok(solicitudActualizada);
    } else {
        return ResponseEntity.notFound().build();
    }
    }

    @PutMapping("/rechazar/{id}")
    public ResponseEntity<?> rechazarSolicitud(@PathVariable Long id) {
    return service.rechazarSolicitud(id);
    }
    }