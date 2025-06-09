package com.example.registro.service;

import com.example.registro.model.Buzon;
import com.example.registro.model.Producto;
import com.example.registro.repository.BuzonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class BuzonService {

    @Autowired
    private BuzonRepository buzonRepository;

    @Autowired
    private ProductoService productoService;

    public Buzon guardar(Buzon buzon) {
        return buzonRepository.save(buzon);
    }

    public List<Buzon> listarSolicitudesPendientes() {
        return buzonRepository.findByEstado("PENDIENTE");
    }

     public List<Buzon> listarSolicitudesPorTipoYEstado(String tipo, List<String> estados) {
        // Esto depende de cómo tengas implementado el repositorio, pero lo común es usar un método que filtre por tipo y estados
        return buzonRepository.findByTipoSolicitudAndEstadoIn(tipo, estados);
    }

    
    public List<Buzon> listarSolicitudesPorTipoYEstado(String tipoSolicitud, String estado) {
        return buzonRepository.findByTipoSolicitudAndEstado(tipoSolicitud, estado);
    }

    public Optional<Buzon> obtenerPorId(Long id) {
        return buzonRepository.findById(id);
    }

    public void eliminarPorId(Long id) {
        buzonRepository.deleteById(id);
    }

    public Optional<Buzon> aceptarSolicitud(Long id) {
        Optional<Buzon> solicitudOpt = buzonRepository.findById(id);

        solicitudOpt.ifPresent(solicitud -> {
            solicitud.setEstado("ACEPTADA");
            solicitud.setFechaRegistro(new Date());  // Actualiza fechaRegistro al aceptar

            if ("REGISTRAR".equalsIgnoreCase(solicitud.getTipoSolicitud())) {
                Producto producto = new Producto();
                producto.setNombreProducto(solicitud.getProducto());
                producto.setCategoria(solicitud.getCategoria());

                try {
                    String cantidadStr = solicitud.getCantidad().split("/")[0].trim();
                    int cantidadInt = Integer.parseInt(cantidadStr);
                    producto.setCantidad(cantidadInt);
                } catch (Exception e) {
                    producto.setCantidad(0);
                }

                producto.setFechaCreacion(LocalDateTime.now());
                producto.setCodigo("CODIGO-" + id);

                Producto productoGuardado = productoService.guardarProducto(producto);
                solicitud.setProductoId(productoGuardado.getId());
            }

            buzonRepository.save(solicitud);
        });

        return solicitudOpt;
    }

    public ResponseEntity<?> rechazarSolicitud(Long id) {
        Optional<Buzon> solicitudOpt = buzonRepository.findById(id);
        if (solicitudOpt.isPresent()) {
            Buzon solicitud = solicitudOpt.get();
            solicitud.setEstado("RECHAZADA");
            solicitud.setFechaRegistro(new Date());
            buzonRepository.save(solicitud);
            return ResponseEntity.ok(Map.of("mensaje", "Solicitud de registro rechazada correctamente"));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Nuevo método para listar solicitudes por estado (ACEPTADA o RECHAZADA)
    public List<Buzon> listarSolicitudesPorEstado(String estado) {
        return buzonRepository.findByEstado(estado);
    }
}
