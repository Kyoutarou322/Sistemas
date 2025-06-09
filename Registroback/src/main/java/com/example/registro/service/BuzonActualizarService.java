package com.example.registro.service;

import com.example.registro.model.Buzon;
import com.example.registro.model.BuzonActualizar;
import com.example.registro.model.Producto;
import com.example.registro.repository.BuzonActualizarRepository;
import com.example.registro.repository.BuzonRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class BuzonActualizarService {

    @Autowired
    private BuzonActualizarRepository buzonActualizarRepository;
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

    public ResponseEntity<?> rechazarSolicitud(Long id) {
    Optional<BuzonActualizar> solicitud = repository.findById(id);
    if (solicitud.isPresent()) {
        BuzonActualizar solicitudExistente = solicitud.get();
        solicitudExistente.setEstado("RECHAZADA");
        solicitudExistente.setFechaRegistro(LocalDateTime.now());
        repository.save(solicitudExistente);
        return ResponseEntity.ok(Map.of("mensaje", "Solicitud de actualización rechazada correctamente"));
    } else {
        return ResponseEntity.notFound().build();
    }
}


    public List<BuzonActualizar> listarSolicitudesPorEstado(String estado) {
        return repository.findByEstado(estado);
    }
    public List<BuzonActualizar> listarSolicitudesPorTipoYEstado(String tipo, List<String> estados) {
        // Esto depende de cómo tengas implementado el repositorio, pero lo común es usar un método que filtre por tipo y estados
        return buzonActualizarRepository.findByTipoSolicitudAndEstadoIn(tipo, estados);
    }
    
public List<BuzonActualizar> listarSolicitudesPorEstados(List<String> estados) {
    return repository.findByEstadoIn(estados);
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
