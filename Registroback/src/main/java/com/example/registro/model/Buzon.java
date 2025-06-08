package com.example.registro.model;

import jakarta.persistence.*;
import java.util.Date;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "buzon")
public class Buzon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String producto;

    private String categoria;

    private String cantidad;

    private String estado;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "fecha_solicitud")
    private Date fechaSolicitud;

    @Column(name = "motivo_de_eliminacion")
    private String motivoDeEliminacion;

    @Column(name = "tipo_solicitud", nullable = false)
    private String tipoSolicitud;

    @Column(name = "codigo_solicitud")
    private String codigoSolicitud;

    @Column(name = "detalle_solicitud")
    private String detalleSolicitud;

    @Column(name = "solicitud_modificada")
    private Boolean solicitudModificada;

    @Column(name = "usuario_solicitante")
    private String usuarioSolicitante;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "fecha_registro")
    private Date fechaRegistro;

    @Column(name = "producto_id")
    @JsonProperty("producto_id")
    private Long productoId;

    @Column(name = "fue_modificado", nullable = false)
    private int fueModificado;

    // Getters y setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProducto() {
        return producto;
    }

    public void setProducto(String producto) {
        this.producto = producto;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getCantidad() {
        return cantidad;
    }

    public void setCantidad(String cantidad) {
        this.cantidad = cantidad;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Date getFechaSolicitud() {
        return fechaSolicitud;
    }

    public void setFechaSolicitud(Date fechaSolicitud) {
        this.fechaSolicitud = fechaSolicitud;
    }

    public String getMotivoDeEliminacion() {
        return motivoDeEliminacion;
    }

    public void setMotivoDeEliminacion(String motivoDeEliminacion) {
        this.motivoDeEliminacion = motivoDeEliminacion;
    }

    public String getTipoSolicitud() {
        return tipoSolicitud;
    }

    public void setTipoSolicitud(String tipoSolicitud) {
        this.tipoSolicitud = tipoSolicitud;
    }

    public String getCodigoSolicitud() {
        return codigoSolicitud;
    }

    public void setCodigoSolicitud(String codigoSolicitud) {
        this.codigoSolicitud = codigoSolicitud;
    }

    public String getDetalleSolicitud() {
        return detalleSolicitud;
    }

    public void setDetalleSolicitud(String detalleSolicitud) {
        this.detalleSolicitud = detalleSolicitud;
    }

    public Boolean getSolicitudModificada() {
        return solicitudModificada;
    }

    public void setSolicitudModificada(Boolean solicitudModificada) {
        this.solicitudModificada = solicitudModificada;
    }

    public String getUsuarioSolicitante() {
        return usuarioSolicitante;
    }

    public void setUsuarioSolicitante(String usuarioSolicitante) {
        this.usuarioSolicitante = usuarioSolicitante;
    }

    public Date getFechaRegistro() {
        return fechaRegistro;
    }

    public void setFechaRegistro(Date fechaRegistro) {
        this.fechaRegistro = fechaRegistro;
    }

    public Long getProductoId() {
        return productoId;
    }

    public void setProductoId(Long productoId) {
        this.productoId = productoId;
    }

    public int getFueModificado() {
        return fueModificado;
    }

    public void setFueModificado(int fueModificado) {
        this.fueModificado = fueModificado;
    }
}
