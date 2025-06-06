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

    public Buzon guardar(Buzon buzon) {
        return buzonRepository.save(buzon);
    }

    public List<Buzon> listarSolicitudesPendientes() {
        return buzonRepository.findByEstado("PENDIENTE");
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
}
