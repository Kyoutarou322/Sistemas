package com.example.registro.service;

import com.example.registro.model.BuzonEliminar;
import com.example.registro.repository.BuzonEliminarRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class BuzonEliminarService {

    private final BuzonEliminarRepository repository;
    private final ProductoService productoService;

    public BuzonEliminarService(BuzonEliminarRepository repository, ProductoService productoService) {
        this.repository = repository;
        this.productoService = productoService;
    }

    public BuzonEliminar guardarSolicitud(BuzonEliminar solicitud) {
        return repository.save(solicitud);
    }

    public List<BuzonEliminar> listarSolicitudesPorEstado(String estado) {
        return repository.findByEstado(estado);
    }

    public Optional<BuzonEliminar> obtenerPorId(Long id) {
        return repository.findById(id);
    }

    public ResponseEntity<?> eliminarPorId(Long id) {
        Optional<BuzonEliminar> solicitud = repository.findById(id);
        if (solicitud.isPresent()) {
            repository.deleteById(id);
            return ResponseEntity.ok(Map.of("mensaje", "Solicitud eliminada"));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public Optional<BuzonEliminar> aceptarSolicitud(Long id) {
        Optional<BuzonEliminar> solicitudOpt = repository.findById(id);

        solicitudOpt.ifPresent(solicitud -> {
            solicitud.setEstado("ACEPTADA");
            solicitud.setFechaRegistro(LocalDateTime.now());

            if (solicitud.getProductoId() != null) {
                productoService.eliminarProductoPorId(solicitud.getProductoId());
            }

            repository.save(solicitud);
        });

        return solicitudOpt.map(solicitud -> repository.findById(solicitud.getId()).orElse(solicitud));
    }
}
