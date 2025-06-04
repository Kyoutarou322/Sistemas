import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BuzonService } from './buzon.service'; // Ajusta la ruta si está en otra carpeta

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

interface SolicitudActualizacion {
  id: number;
  detalle?: string;
  usuario?: string;
  fechaSolicitud?: string;
  codigoSolicitud?: string;
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
  esAdmin: boolean = true; // Cambia a false para la vista usuario
  nombreUsuario = 'Admin';

  sidebarVisible = false;
  sidebarAnimatingOut = false;
  showContent = false;

  solicitudesRegistro: SolicitudRegistro[] = [];
  solicitudesActualizacion: SolicitudActualizacion[] = [];
  solicitudesEliminacion: SolicitudEliminacion[] = [];

  constructor(private router: Router, private buzonService: BuzonService) {}

  ngOnInit() {
    setTimeout(() => {
      this.showContent = true;
    }, 50);
    this.cargarSolicitudes();
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
      next: (data) => {
        this.solicitudesRegistro = data;
        this.solicitudesActualizacion = [];
        this.solicitudesEliminacion = [];
      },
      error: (error) => {
        console.error('Error cargando solicitudes:', error);
      }
    });
  }

  // Aceptar solicitudes de registro (POST con cuerpo vacío)
  aceptarSolicitud(id: number) {
    this.buzonService.aceptarSolicitud(id).subscribe({
      next: () => {
        alert(`Solicitud de registro con id ${id} aceptada`);
        this.solicitudesRegistro = this.solicitudesRegistro.filter(s => s.id !== id);
      },
      error: (error) => {
        console.error('Error aceptando solicitud:', error);
        alert('No se pudo aceptar la solicitud.');
      }
    });
  }

  // Rechazar solicitudes de registro (DELETE)
  rechazarSolicitud(id: number) {
    this.buzonService.rechazarSolicitud(id).subscribe({
      next: () => {
        alert(`Solicitud de registro con id ${id} rechazada`);
        this.solicitudesRegistro = this.solicitudesRegistro.filter(s => s.id !== id);
      },
      error: (error) => {
        console.error('Error rechazando solicitud:', error);
        alert('No se pudo rechazar la solicitud.');
      }
    });
  }

  // Aceptar solicitudes de actualización (POST con cuerpo vacío)
  aceptarActualizacion(id: number) {
    this.buzonService.aceptarActualizacion(id).subscribe({
      next: () => {
        alert(`Solicitud de actualización con id ${id} aceptada`);
        this.solicitudesActualizacion = this.solicitudesActualizacion.filter(s => s.id !== id);
      },
      error: (error) => {
        console.error('Error aceptando solicitud de actualización:', error);
        alert('No se pudo aceptar la solicitud de actualización.');
      }
    });
  }

  // Rechazar solicitudes de actualización (DELETE)
  rechazarActualizacion(id: number) {
    this.buzonService.rechazarActualizacion(id).subscribe({
      next: () => {
        alert(`Solicitud de actualización con id ${id} rechazada`);
        this.solicitudesActualizacion = this.solicitudesActualizacion.filter(s => s.id !== id);
      },
      error: (error) => {
        console.error('Error rechazando solicitud de actualización:', error);
        alert('No se pudo rechazar la solicitud de actualización.');
      }
    });
  }

  // Aceptar solicitudes de eliminación (POST con cuerpo vacío)
  aceptarEliminacion(id: number) {
    this.buzonService.aceptarEliminacion(id).subscribe({
      next: () => {
        alert(`Solicitud de eliminación con id ${id} aceptada`);
        this.solicitudesEliminacion = this.solicitudesEliminacion.filter(s => s.id !== id);
      },
      error: (error) => {
        console.error('Error aceptando solicitud de eliminación:', error);
        alert('No se pudo aceptar la solicitud de eliminación.');
      }
    });
  }

  // Rechazar solicitudes de eliminación (DELETE)
  rechazarEliminacion(id: number) {
    this.buzonService.rechazarEliminacion(id).subscribe({
      next: () => {
        alert(`Solicitud de eliminación con id ${id} rechazada`);
        this.solicitudesEliminacion = this.solicitudesEliminacion.filter(s => s.id !== id);
      },
      error: (error: any) => {
        console.error('Error rechazando solicitud:', error);
        alert('No se pudo rechazar la solicitud.');
      }
    });
  }
}
