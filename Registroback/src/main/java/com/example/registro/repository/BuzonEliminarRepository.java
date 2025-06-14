package com.example.registro.repository;

import com.example.registro.model.BuzonEliminar;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BuzonEliminarRepository extends JpaRepository<BuzonEliminar, Long> {
    List<BuzonEliminar> findByEstado(String estado);
    List<BuzonEliminar> findByTipoSolicitudAndEstadoIn(String tipoSolicitud, List<String> estados);
}
