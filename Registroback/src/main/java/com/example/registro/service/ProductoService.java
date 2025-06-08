package com.example.registro.service;

import com.example.registro.model.Buzon;
import com.example.registro.model.Producto;
import com.example.registro.repository.BuzonRepository;
import com.example.registro.repository.ProductoRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ProductoService {

    private final ProductoRepository productoRepository;
    private final BuzonRepository buzonRepository;

    public ProductoService(ProductoRepository productoRepository, BuzonRepository buzonRepository) {
        this.productoRepository = productoRepository;
        this.buzonRepository = buzonRepository;
    }

    public List<Producto> listarTodos() {
        return productoRepository.findAll();
    }

    public Producto guardarProducto(Producto producto) {
        if (producto.getFechaCreacion() == null) {
            producto.setFechaCreacion(java.time.LocalDateTime.now());
        }
        return productoRepository.save(producto);
    }

    public void eliminarProducto(Integer id) {
        productoRepository.deleteById(id.longValue());
    }

    public void eliminarProductoPorId(Long id) {
        Optional<Producto> productoOpt = productoRepository.findById(id);
        if (productoOpt.isPresent()) {
            productoRepository.deleteById(id);
        } else {
            throw new RuntimeException("Producto con id " + id + " no encontrado");
        }
    }

    public Optional<Producto> obtenerProductoPorId(Long id) {
        return productoRepository.findById(id);
    }

    public void solicitarActualizacion(Producto productoNuevo, Producto productoExistente, String usuario) {
        Buzon solicitud = new Buzon();
        solicitud.setProducto(productoExistente.getNombreProducto() + " / " + productoNuevo.getNombreProducto());
        solicitud.setCategoria(productoExistente.getCategoria() + " / " + productoNuevo.getCategoria());
        solicitud.setCantidad(productoExistente.getCantidad() + " / " + productoNuevo.getCantidad());
        solicitud.setEstado("PENDIENTE");
        solicitud.setFechaSolicitud(new Date());
        solicitud.setMotivoDeEliminacion("NINGUNO");
        solicitud.setTipoSolicitud("ACTUALIZAR");
        solicitud.setCodigoSolicitud("SOL-" + System.currentTimeMillis());
        solicitud.setDetalleSolicitud("Solicitud de actualización del producto ID: " + productoExistente.getId());
        solicitud.setSolicitudModificada(true);
        solicitud.setUsuarioSolicitante(usuario);
        solicitud.setFechaRegistro(null);
        solicitud.setProductoId(productoExistente.getId());

        buzonRepository.save(solicitud);
    }
}
