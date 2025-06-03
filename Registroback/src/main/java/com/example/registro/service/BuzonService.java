package com.example.registro.service;

import com.example.registro.model.Buzon;
import com.example.registro.repository.BuzonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BuzonService {

    @Autowired
    private BuzonRepository buzonRepository;

    // Guardar nueva solicitud
    public Buzon guardar(Buzon buzon) {
        return buzonRepository.save(buzon);
    }

    // Listar todas las solicitudes con estado PENDIENTE
    public List<Buzon> listarSolicitudesPendientes() {
        return buzonRepository.findByEstado("PENDIENTE");
    }

    // Aceptar solicitud (cambia estado a ACEPTADA)
    public Optional<Buzon> aceptarSolicitud(Long id) {
        Optional<Buzon> solicitudOpt = buzonRepository.findById(id);
        solicitudOpt.ifPresent(solicitud -> {
            solicitud.setEstado("ACEPTADA");
            buzonRepository.save(solicitud);
        });
        return solicitudOpt;
    }

    // Rechazar solicitud (cambia estado a RECHAZADA)
    public Optional<Buzon> rechazarSolicitud(Long id) {
        Optional<Buzon> solicitudOpt = buzonRepository.findById(id);
        solicitudOpt.ifPresent(solicitud -> {
            solicitud.setEstado("RECHAZADA");
            buzonRepository.save(solicitud);
        });
        return solicitudOpt;
    }

    // NUEVO: Obtener solicitudes de tipo REGISTRAR con estado PENDIENTE
    public List<Buzon> listarSolicitudesPorTipoYEstado(String tipoSolicitud, String estado) {
    return buzonRepository.findByTipoSolicitudAndEstado(tipoSolicitud, estado);
}
}
