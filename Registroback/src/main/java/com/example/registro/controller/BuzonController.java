package com.example.registro.controller;

import com.example.registro.model.Buzon;
import com.example.registro.model.Producto;
import com.example.registro.service.BuzonService;
import com.example.registro.service.ProductoService;
import com.example.registro.repository.BuzonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/buzon")
@CrossOrigin(origins = "http://localhost:4200")
public class BuzonController {

    @Autowired
    private BuzonService buzonService;

    @Autowired
    private ProductoService productoService;

    @Autowired
    private BuzonRepository buzonRepository;


    @PostMapping("/solicitud")
    public ResponseEntity<?> crearSolicitud(@RequestBody Buzon buzon) {
        System.out.println("Solicitud recibida: " + buzon);
        System.out.println("productoId recibido: " + buzon.getProductoId());

        if (buzon.getTipoSolicitud() == null) return ResponseEntity.badRequest().body("tipoSolicitud no puede ser null");
        if (buzon.getProducto() == null || buzon.getProducto().isEmpty()) return ResponseEntity.badRequest().body("producto no puede ser vacío");
        if (buzon.getCategoria() == null || buzon.getCategoria().isEmpty()) return ResponseEntity.badRequest().body("categoria no puede ser vacío");
        if (buzon.getCantidad() == null || buzon.getCantidad().isEmpty()) return ResponseEntity.badRequest().body("cantidad no puede ser vacía");
        if (!buzon.getCantidad().matches("\\d+(\\s*/\\s*\\d+)?")) return ResponseEntity.badRequest().body("cantidad debe ser un número o formato válido");
        if (buzon.getUsuarioSolicitante() == null || buzon.getUsuarioSolicitante().isEmpty()) return ResponseEntity.badRequest().body("usuarioSolicitante no puede ser vacío");

        buzon.setEstado(buzon.getEstado() == null ? "PENDIENTE" : buzon.getEstado());
        buzon.setFechaSolicitud(buzon.getFechaSolicitud() == null ? new Date() : buzon.getFechaSolicitud());
        buzon.setMotivoDeEliminacion(buzon.getMotivoDeEliminacion() == null ? "NINGUNO" : buzon.getMotivoDeEliminacion());
        buzon.setSolicitudModificada(buzon.getSolicitudModificada() == null ? false : buzon.getSolicitudModificada());

        Buzon guardado = buzonService.guardar(buzon);
        return ResponseEntity.ok(guardado);
    }

    @GetMapping("/solicitudes/registro")
    public List<Buzon> obtenerSolicitudesDeRegistro() {
        return buzonService.listarSolicitudesPorTipoYEstado("REGISTRAR", "PENDIENTE");
    }

    @GetMapping("/solicitudes/registro/historial")
    public List<Buzon> obtenerSolicitudesDeRegistroHistorial() {
        return buzonService.listarSolicitudesPorTipoYEstado("REGISTRAR", List.of("ACEPTADA", "RECHAZADA"));
    }
        
    @PostMapping("/registro/aceptar/{id}")
    public ResponseEntity<?> aceptarSolicitudRegistro(@PathVariable Long id) {
        Optional<Buzon> solicitudOpt = buzonService.obtenerPorId(id);
        if (!solicitudOpt.isPresent()) return ResponseEntity.notFound().build();

        Buzon solicitud = solicitudOpt.get();
        if (!"REGISTRAR".equalsIgnoreCase(solicitud.getTipoSolicitud()))
            return ResponseEntity.badRequest().body("La solicitud no es de tipo REGISTRAR");

        Producto nuevo = new Producto();
        nuevo.setNombreProducto(solicitud.getProducto());
        nuevo.setCategoria(solicitud.getCategoria());

        try {
            String cantidadStr = solicitud.getCantidad().split("/")[0].trim();
            int cantidadInt = Integer.parseInt(cantidadStr);
            nuevo.setCantidad(cantidadInt);
        } catch (Exception e) {
            nuevo.setCantidad(0);
        }

        nuevo.setCodigo(String.format("COD-%03d", solicitud.getId()));
        nuevo.setFechaCreacion(java.time.LocalDateTime.now());

        Producto productoGuardado = productoService.guardarProducto(nuevo);
        solicitud.setProductoId(productoGuardado.getId());
        solicitud.setEstado("ACEPTADA");
        solicitud.setFechaRegistro(new Date());
        buzonService.guardar(solicitud);

        return ResponseEntity.ok(Map.of("mensaje", "Solicitud de registro aceptada."));
    }

    @PutMapping("/rechazar/{id}")
    public ResponseEntity<?> rechazarSolicitud(@PathVariable Long id) {
        Optional<Buzon> solicitudOpt = buzonService.obtenerPorId(id);
        if (solicitudOpt.isPresent()) {
            Buzon solicitud = solicitudOpt.get();
            solicitud.setEstado("RECHAZADA");
            solicitud.setFechaRegistro(new Date());
            buzonService.guardar(solicitud);
            return ResponseEntity.ok(Map.of("mensaje", "Solicitud de registro rechazada correctamente"));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Nuevo endpoint para obtener solicitudes aceptadas y rechazadas
    @GetMapping("/solicitudes/historial")
    public Map<String, List<Buzon>> obtenerSolicitudesAceptadasYRechazadas() {
        List<Buzon> aceptadas = buzonService.listarSolicitudesPorEstado("ACEPTADA");
        List<Buzon> rechazadas = buzonService.listarSolicitudesPorEstado("RECHAZADA");
        return Map.of("aceptadas", aceptadas, "rechazadas", rechazadas);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Buzon> actualizarSolicitud(@PathVariable Long id, @RequestBody Buzon solicitudActualizada) {
    Optional<Buzon> optionalSolicitud = buzonRepository.findById(id);
    if (optionalSolicitud.isPresent()) {
        Buzon solicitud = optionalSolicitud.get();
        solicitud.setProducto(solicitudActualizada.getProducto());
        solicitud.setCategoria(solicitudActualizada.getCategoria());
        solicitud.setCantidad(solicitudActualizada.getCantidad());
        solicitud.setDetalleSolicitud(solicitudActualizada.getDetalleSolicitud());
        solicitud.setSolicitudModificada(true);
        return ResponseEntity.ok(buzonRepository.save(solicitud));
    } else {
        return ResponseEntity.notFound().build();
    }
    }



    }
