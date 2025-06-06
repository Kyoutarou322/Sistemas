import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BuzonService } from './buzon.service';
import { LayoutService, Producto } from '../layout/layout.service';

interface SolicitudRegistro {
  id: number;
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

interface SolicitudEliminacion {
  id: number;
  detalle?: string;
  usuario?: string;
  fechaSolicitud?: string;
  codigoSolicitud?: string;
}

@Component({
  standalone: true,
  selector: 'app-buzon',
  templateUrl: './buzon.component.html',
  imports: [CommonModule]
})
export class BuzonComponent {
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
    private buzonService: BuzonService,
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
        this.sidebarAnimatingOut = false;
      }, 300);
    } else {
      this.sidebarVisible = true;
      this.sidebarAnimatingOut = false;
    }
  }

  Solicitudes() {
    this.router.navigate(['/solicitudes']);
  }

  Historial() {
    this.router.navigate(['/historial']);
  }

  cerrarSesion(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigateByUrl('/logout', { replaceUrl: true });
    this.toggleSidebar();
  }

  cargarSolicitudes() {
    this.buzonService.obtenerSolicitudesRegistro().subscribe({
      next: (data) => (this.solicitudesRegistro = data),
      error: (error) =>
        console.error('Error cargando solicitudes de registro:', error),
    });

   this.buzonService.obtenerSolicitudesActualizacion().subscribe({
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



    this.buzonService.obtenerSolicitudesEliminacion().subscribe({
      next: (data) => (this.solicitudesEliminacion = data),
      error: (error) =>
        console.error('Error cargando solicitudes de eliminación:', error),
    });
  }

  aceptarSolicitud(id: number) {
    this.buzonService.aceptarSolicitud(id).subscribe({
      next: () => {
        alert(`Solicitud de registro con id ${id} aceptada`);
        this.solicitudesRegistro = this.solicitudesRegistro.filter(
          (s) => s.id !== id
        );
        this.solicitudesActualizacion = this.solicitudesActualizacion.filter(
          (s) => s.id !== id
        );
      },
      error: (error) => {
        console.error('Error aceptando solicitud:', error);
        alert('No se pudo aceptar la solicitud.');
      },
    });
  }

  rechazarSolicitud(id: number) {
    this.buzonService.rechazarSolicitud(id).subscribe({
      next: () => {
        alert(`Solicitud de registro con id ${id} rechazada`);
        this.solicitudesRegistro = this.solicitudesRegistro.filter(
          (s) => s.id !== id
        );
        this.solicitudesActualizacion = this.solicitudesActualizacion.filter(
          (s) => s.id !== id
        );
      },
      error: (error) => {
        console.error('Error rechazando solicitud:', error);
        alert('No se pudo rechazar la solicitud.');
      },
    });
  }

  aceptarActualizacion(solicitudId: number) {
  this.buzonService.aceptarActualizacion(solicitudId).subscribe({
    next: () => {
      alert(`Solicitud de actualización con id ${solicitudId} aceptada`);
      this.solicitudesActualizacion = this.solicitudesActualizacion.filter(
        (s) => s.id !== solicitudId
      );
    },
    error: (error) => {
      console.error('Error aceptando solicitud de actualización:', error);
      alert('No se pudo aceptar la solicitud de actualización.');
    },
  });
}

rechazarActualizacion(id: number) {
  this.buzonService.rechazarActualizacion(id).subscribe({
    next: () => {
      alert(`Solicitud de actualización con id ${id} rechazada`);
      this.solicitudesActualizacion = this.solicitudesActualizacion.filter(
        (s) => s.id !== id
      );
    },
    error: (error) => {
      console.error('Error rechazando solicitud de actualización:', error);
      alert('No se pudo rechazar la solicitud de actualización.');
    },
  });
}

  aceptarEliminacion(id: number) {
    this.buzonService.aceptarEliminacion(id).subscribe({
      next: () => {
        alert(`Solicitud de eliminación con id ${id} aceptada`);
        this.solicitudesEliminacion = this.solicitudesEliminacion.filter(
          (s) => s.id !== id
        );
      },
      error: (error) => {
        console.error('Error aceptando solicitud de eliminación:', error);
        alert('No se pudo aceptar la solicitud de eliminación.');
      },
    });
  }

  rechazarEliminacion(id: number) {
    this.buzonService.rechazarEliminacion(id).subscribe({
      next: () => {
        alert(`Solicitud de eliminación con id ${id} rechazada`);
        this.solicitudesEliminacion = this.solicitudesEliminacion.filter(
          (s) => s.id !== id
        );
      },
      error: (error: any) => {
        console.error('Error rechazando solicitud:', error);
        alert('No se pudo rechazar la solicitud.');
      },
    });
  }
}
