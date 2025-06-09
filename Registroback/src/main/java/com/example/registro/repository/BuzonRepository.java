package com.example.registro.repository;

import com.example.registro.model.Buzon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



import java.util.List;

@Repository
public interface BuzonRepository extends JpaRepository<Buzon, Long> {

    List<Buzon> findByEstado(String estado);

    List<Buzon> findByTipoSolicitudAndEstado(String tipoSolicitud, String estado);
    List<Buzon> findByTipoSolicitudAndEstadoIn(String tipoSolicitud, List<String> estados);
}
