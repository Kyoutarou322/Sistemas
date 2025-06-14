package com.example.registro.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "buzonactualizar")
public class BuzonActualizar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tipoSolicitud;
    private String estado;

    private LocalDateTime fechaSolicitud;

    @Column(name = "fecha_registro")
    private LocalDateTime fechaRegistro;  

    private Long productoId;

    private String producto;  
    private String categoria; 
    private String cantidad;  

    private String codigoSolicitud;
    private String usuarioSolicitante;

    @Column(length = 1000)
    private String detalleSolicitud;

    @Column(name = "solicitud_modificada")
    private Boolean solicitudModificada;

    // Getters y setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTipoSolicitud() { return tipoSolicitud; }
    public void setTipoSolicitud(String tipoSolicitud) { this.tipoSolicitud = tipoSolicitud; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }

    public LocalDateTime getFechaSolicitud() { return fechaSolicitud; }
    public void setFechaSolicitud(LocalDateTime fechaSolicitud) { this.fechaSolicitud = fechaSolicitud; }

    public LocalDateTime getFechaRegistro() { return fechaRegistro; }
    public void setFechaRegistro(LocalDateTime fechaRegistro) { this.fechaRegistro = fechaRegistro; }

    public Long getProductoId() { return productoId; }
    public void setProductoId(Long productoId) { this.productoId = productoId; }

    public String getProducto() { return producto; }
    public void setProducto(String producto) { this.producto = producto; }

    public String getCategoria() { return categoria; }
    public void setCategoria(String categoria) { this.categoria = categoria; }

    public String getCantidad() { return cantidad; }
    public void setCantidad(String cantidad) { this.cantidad = cantidad; }

    public String getCodigoSolicitud() { return codigoSolicitud; }
    public void setCodigoSolicitud(String codigoSolicitud) { this.codigoSolicitud = codigoSolicitud; }

    public String getUsuarioSolicitante() { return usuarioSolicitante; }
    public void setUsuarioSolicitante(String usuarioSolicitante) { this.usuarioSolicitante = usuarioSolicitante; }

    public String getDetalleSolicitud() { return detalleSolicitud; }
    public void setDetalleSolicitud(String detalleSolicitud) { this.detalleSolicitud = detalleSolicitud; }

    public boolean isSolicitudModificada() { return solicitudModificada; }
    public void setSolicitudModificada(boolean solicitudModificada) { this.solicitudModificada = solicitudModificada; }
}
