package com.example.registro.service;

import com.example.registro.model.Buzon;
import com.example.registro.model.Producto;
import com.example.registro.repository.BuzonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class BuzonService {

    @Autowired
    private BuzonRepository buzonRepository;

    @Autowired
    private ProductoService productoService;

    // Guardar nueva solicitud o actualizar
    public Buzon guardar(Buzon buzon) {
        return buzonRepository.save(buzon);
    }

    // Listar todas las solicitudes con estado PENDIENTE
    public List<Buzon> listarSolicitudesPendientes() {
        return buzonRepository.findByEstado("PENDIENTE");
    }

    // Obtener solicitudes de tipo REGISTRAR con estado PENDIENTE
    public List<Buzon> listarSolicitudesPorTipoYEstado(String tipoSolicitud, String estado) {
        return buzonRepository.findByTipoSolicitudAndEstado(tipoSolicitud, estado);
    }

    // Obtener solicitud por ID
    public Optional<Buzon> obtenerPorId(Long id) {
        return buzonRepository.findById(id);
    }

    // Aceptar solicitud (cambia estado a ACEPTADA y crea producto)
    public Optional<Buzon> aceptarSolicitud(Long id) {
        Optional<Buzon> solicitudOpt = buzonRepository.findById(id);
        solicitudOpt.ifPresent(solicitud -> {
            solicitud.setEstado("ACEPTADA");

            // Crear nuevo producto con datos de la solicitud
            Producto producto = new Producto();
            producto.setNombreProducto(solicitud.getProducto());  // Asegúrate que getProducto() existe en Buzon
            producto.setCategoria(solicitud.getCategoria());
            producto.setCantidad(solicitud.getCantidad());
            producto.setFechaCreacion(LocalDateTime.now());

            // Asignar un código único o generado para el producto
            producto.setCodigo("CODIGO-" + id);

            productoService.guardarProducto(producto);

            buzonRepository.save(solicitud);
        });
        return solicitudOpt;
    }

    // Rechazar solicitud (cambia estado a RECHAZADA)
    public Optional<Buzon> rechazarSolicitud(Long id) {
        Optional<Buzon> solicitudOpt = buzonRepository.findById(id);
        solicitudOpt.ifPresent(solicitud -> {
            solicitud.setEstado("RECHAZADA");
            buzonRepository.save(solicitud);
        });
        return solicitudOpt;
    }
}
