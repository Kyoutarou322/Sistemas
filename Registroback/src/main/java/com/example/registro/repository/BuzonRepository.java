package com.example.registro.repository;

import com.example.registro.model.Buzon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import jakarta.transaction.Transactional;

import java.util.List;

@Repository
public interface BuzonRepository extends JpaRepository<Buzon, Long> {

    List<Buzon> findByEstado(String estado);

    List<Buzon> findByTipoSolicitudAndEstado(String tipoSolicitud, String estado);

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO buzoneliminar (producto, categoria, cantidad, estado, fecha_solicitud, motivo_de_eliminacion, tipo_solicitud, codigo_solicitud, detalle_solicitud, usuario_solicitante, fecha_registro, producto_id) " +
            "VALUES (:#{#buzon.producto}, :#{#buzon.categoria}, :#{#buzon.cantidad}, :#{#buzon.estado}, :#{#buzon.fechaSolicitud}, :#{#buzon.motivoDeEliminacion}, :#{#buzon.tipoSolicitud}, :#{#buzon.codigoSolicitud}, :#{#buzon.detalleSolicitud}, :#{#buzon.usuarioSolicitante}, :#{#buzon.fechaRegistro}, :#{#buzon.productoId})",
            nativeQuery = true)
    void insertarEnEliminar(Buzon buzon);

}
