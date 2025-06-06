package com.example.registro.service;

import com.example.registro.model.BuzonActualizar;
import com.example.registro.model.Producto;
import com.example.registro.repository.BuzonActualizarRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class BuzonActualizarService {

    private final BuzonActualizarRepository repository;
    private final ProductoService productoService;

    public BuzonActualizarService(BuzonActualizarRepository repository, ProductoService productoService) {
        this.repository = repository;
        this.productoService = productoService;
    }

    public BuzonActualizar guardarSolicitud(BuzonActualizar solicitud) {
        return repository.save(solicitud);
    }

    public List<BuzonActualizar> obtenerTodas() {
        return repository.findAll();
    }

    public Optional<BuzonActualizar> obtenerPorId(Long id) {
        return repository.findById(id);
    }

    // Cambié este método para que retorne ResponseEntity<?>
    public ResponseEntity<?> eliminarPorId(Long id) {
        Optional<BuzonActualizar> solicitud = repository.findById(id);
        if (solicitud.isPresent()) {
            repository.deleteById(id);
            return ResponseEntity.ok(Map.of("mensaje", "Solicitud eliminada"));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public List<BuzonActualizar> listarSolicitudesPorEstado(String estado) {
        return repository.findByEstado(estado);
    }

    public Optional<BuzonActualizar> aceptarSolicitud(Long id) {
    Optional<BuzonActualizar> solicitudOpt = repository.findById(id);

    solicitudOpt.ifPresent(solicitud -> {
        solicitud.setEstado("ACEPTADA");
        solicitud.setFechaRegistro(LocalDateTime.now());

        if (solicitud.getProductoId() != null) {
            Optional<Producto> productoOpt = productoService.obtenerProductoPorId(solicitud.getProductoId());
            if (productoOpt.isPresent()) {
                Producto producto = productoOpt.get();

                String nuevoNombre = extraerNuevoValor(solicitud.getProducto());
                if (nuevoNombre != null && !nuevoNombre.isEmpty()) producto.setNombreProducto(nuevoNombre);

                String nuevaCategoria = extraerNuevoValor(solicitud.getCategoria());
                if (nuevaCategoria != null && !nuevaCategoria.isEmpty()) producto.setCategoria(nuevaCategoria);

                String nuevaCantidadStr = extraerNuevoValor(solicitud.getCantidad());
                Integer nuevaCantidad = parseCantidad(nuevaCantidadStr);
                if (nuevaCantidad != null && nuevaCantidad >= 0) producto.setCantidad(nuevaCantidad);

                productoService.guardarProducto(producto);
            }
        }

        repository.save(solicitud);
    });

    return solicitudOpt.map(solicitud -> repository.findById(solicitud.getId()).orElse(solicitud));
}

    // Métodos auxiliares para extraer nuevo valor y parsear cantidad
    private String extraerNuevoValor(String campoConcatenado) {
        if (campoConcatenado != null && campoConcatenado.contains("/")) {
            String[] partes = campoConcatenado.split("/");
            if (partes.length > 1) return partes[1].trim();
        }
        return campoConcatenado != null ? campoConcatenado.trim() : null;
    }

    private Integer parseCantidad(String cantidadStr) {
        try {
            return Integer.parseInt(cantidadStr.trim());
        } catch (Exception e) {
            return 0;
        }
    }
}
