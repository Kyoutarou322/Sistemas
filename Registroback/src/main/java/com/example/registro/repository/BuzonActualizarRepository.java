package com.example.registro.repository;

import org.springframework.stereotype.Repository;

import com.example.registro.model.BuzonActualizar;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

@Repository
public interface BuzonActualizarRepository extends JpaRepository<BuzonActualizar, Long> {
    List<BuzonActualizar> findByEstado(String estado);
    List<BuzonActualizar> findByEstadoIn(List<String> estados);
   List<BuzonActualizar> findByTipoSolicitudAndEstadoIn(String tipoSolicitud, List<String> estados);
}
