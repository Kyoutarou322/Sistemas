package com.example.registro.controller;

import com.example.registro.model.Buzon;
import com.example.registro.service.BuzonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/buzon")
@CrossOrigin(origins = "http://localhost:4200")
public class BuzonController {

    @Autowired
    private BuzonService buzonService;

    // POST: Crear nueva solicitud
    @PostMapping("/solicitud")
    public ResponseEntity<?> crearSolicitud(@RequestBody Buzon buzon) {
        if (buzon.getTipoSolicitud() == null) {
            return ResponseEntity.badRequest().body("tipoSolicitud no puede ser null");
        }
        if (buzon.getProducto() == null || buzon.getProducto().isEmpty()) {
            return ResponseEntity.badRequest().body("producto no puede ser vacío");
        }
        if (buzon.getCategoria() == null || buzon.getCategoria().isEmpty()) {
            return ResponseEntity.badRequest().body("categoria no puede ser vacío");
        }
        if (buzon.getCantidad() == null || buzon.getCantidad() <= 0) {
            return ResponseEntity.badRequest().body("cantidad debe ser mayor a 0");
        }
        if (buzon.getUsuarioSolicitante() == null || buzon.getUsuarioSolicitante().isEmpty()) {
            return ResponseEntity.badRequest().body("usuarioSolicitante no puede ser vacío");
        }

        // Campos automáticos
        if (buzon.getEstado() == null) {
            buzon.setEstado("PENDIENTE");
        }
        if (buzon.getFechaSolicitud() == null) {
            buzon.setFechaSolicitud(new Date());
        }
        if (buzon.getMotivoDeEliminacion() == null) {
            buzon.setMotivoDeEliminacion("NINGUNO");
        }
        if (buzon.getSolicitudModificada() == null) {
            buzon.setSolicitudModificada(false);
        }

        Buzon guardado = buzonService.guardar(buzon);
        return ResponseEntity.ok(guardado);
    }

    // GET: Obtener solicitudes de tipo REGISTRAR y estado PENDIENTE
 @GetMapping("/solicitudes/registro")
public List<Buzon> obtenerSolicitudesDeRegistro() {
    return buzonService.listarSolicitudesPorTipoYEstado("REGISTRAR", "PENDIENTE");
}
    }

