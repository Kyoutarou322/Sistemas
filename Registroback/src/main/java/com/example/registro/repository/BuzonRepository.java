package com.example.registro.repository;

import java.util.List;
import com.example.registro.model.Buzon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BuzonRepository extends JpaRepository<Buzon, Long> {
    List<Buzon> findByEstado(String estado);
    List<Buzon> findByTipoSolicitudAndEstado(String tipoSolicitud, String estado); // ← NUEVO MÉTODO
}
