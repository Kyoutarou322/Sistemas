package com.example.registro.repository;

import com.example.registro.model.BuzonActualizar;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BuzonActualizarRepository extends JpaRepository<BuzonActualizar, Long> {
    List<BuzonActualizar> findByEstado(String estado);
}
