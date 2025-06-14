import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HistorialService } from './historial.service';
import { LayoutService, Producto } from '../layout/layout.service';

export interface SolicitudRegistro {
  id: number;
  estado: string;
  producto?: string;
  categoria?: string;
  cantidad?: number;
  fechaSolicitud?: string;
  usuarioSolicitante?: string;
  codigoSolicitud?: string;
  detalleSolicitud?: string;
}

export interface SolicitudActualizacion {
  id: number;
  tipoSolicitud: string;
  estado: string;
  fechaSolicitud: Date;
  producto_id: number;
  producto: string;
  nuevoProducto: string;
  categoria: string;
  nuevaCategoria: string;
  cantidad: string;
  nuevaCantidad: string;
  codigoSolicitud: string;
  usuarioSolicitante: string;
  detalleSolicitud: string;
  solicitudModificada: boolean;
}

export interface SolicitudEliminacion {
  id: number;
  estado: String;
  producto?: string;
  categoria?: string;
  cantidad?: number;
  detalleSolicitud?: string;
  detalle?: string;
  usuarioSolicitante?: string;
  usuario?: string;
  fechaSolicitud?: string;
  codigoSolicitud?: string;
}



@Component({
  standalone: true,
  selector: 'app-buzon',
  templateUrl: './Historial.component.html',
  imports: [CommonModule]
})
export class HistorialComponent {
  esAdmin: boolean = true;
  nombreUsuario = 'Invitado';

  sidebarVisible = false;
  sidebarAnimatingOut = false;
  showContent = false;

  solicitudesRegistro: SolicitudRegistro[] = [];
  solicitudesActualizacion: SolicitudActualizacion[] = [];
  solicitudesEliminacion: SolicitudEliminacion[] = [];

  productos: Producto[] = [];

  constructor(
    private router: Router,
    private historialService: HistorialService,
    private layoutService: LayoutService
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.showContent = true;
    }, 50);
    const usuarioLocal = localStorage.getItem('usuario');
    this.nombreUsuario = usuarioLocal ? usuarioLocal : 'Invitado';

    this.cargarSolicitudes();
    this.cargarProductos();
  }

  cargarProductos() {
    this.layoutService.obtenerProductos().subscribe({
      next: (data) => {
        this.productos = data;
      },
      error: (err) => {
        console.error('Error cargando productos:', err);
      }
    });
  }

  toggleSidebar(): void {
    if (this.sidebarVisible) {
      this.sidebarAnimatingOut = true;
      setTimeout(() => {
        this.sidebarVisible = false;
      }, 300);
    } else {
      this.sidebarVisible = true;
      this.sidebarAnimatingOut = true;
      setTimeout(() => {
        this.sidebarAnimatingOut = false;
      }, 10);
    }
  }

  Solicitudes() {
    this.router.navigate(['/solicitudes']);
  }

  Buzon() {
    this.router.navigate(['/buzon']);
  }

  cerrarSesion(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigateByUrl('/logout', { replaceUrl: true });
    this.toggleSidebar();
  }

  cargarSolicitudes() {
    this.historialService.obtenerSolicitudesRegistroHistorial().subscribe({
  next: data => {
    this.solicitudesRegistro = data;
  },
  error: error => console.error('Error cargando solicitudes de registro historial:', error),
});
    this.historialService.obtenerSolicitudesActualizacionHistorial().subscribe({
      next: (data) => {
        this.solicitudesActualizacion = data.map(solicitud => ({
          id: solicitud.id,
          tipoSolicitud: solicitud.tipoSolicitud,
          estado: solicitud.estado,
          fechaSolicitud: solicitud.fechaSolicitud,
          producto_id: solicitud.producto_id,
          producto: solicitud.producto,
          nuevoProducto: '',
          categoria: solicitud.categoria,
          nuevaCategoria: '',
          cantidad: solicitud.cantidad,
          nuevaCantidad: '',
          codigoSolicitud: solicitud.codigoSolicitud,
          usuarioSolicitante: solicitud.usuarioSolicitante,
          detalleSolicitud: solicitud.detalleSolicitud,
          solicitudModificada: solicitud.solicitud_modificada === 1
        }));
      },
      error: (error) =>
        console.error('Error cargando solicitudes de actualización:', error),
    });

    this.historialService.obtenerSolicitudesEliminacionHistorial().subscribe({
  next: (data) => {
    this.solicitudesEliminacion = data.map((solicitud: any) => ({
  id: solicitud.id,
  estado: solicitud.estado || '',
  producto: solicitud.producto || '',
  categoria: solicitud.categoria || '',
  cantidad: solicitud.cantidad || 0,
  detalleSolicitud: solicitud.detalleSolicitud || solicitud.detalle || '',
  usuarioSolicitante: solicitud.usuarioSolicitante || solicitud.usuario || 'Desconocido',
  fechaSolicitud: solicitud.fechaSolicitud || solicitud.fecha || '',
  codigoSolicitud: solicitud.codigoSolicitud || ''
}));

  },
  error: (error) =>
    console.error('Error cargando solicitudes de eliminación:', error),
});

  } 
}
