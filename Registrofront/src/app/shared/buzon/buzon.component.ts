import { Component, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BuzonService } from './buzon.service';
import { LayoutService, Producto } from '../layout/layout.service';
import { EditarService } from '../../solicitudes/editar/editar.service';
import { FormsModule } from '@angular/forms';
import { EditarComponent } from '../../solicitudes/editar/editar.component';

export interface SolicitudRegistro {
  id: number;
  tipoSolicitud: string;
  estado: string;
  producto?: string;
  categoria?: string;
  cantidad?: number;
  fechaSolicitud?: string;
  usuarioSolicitante?: string;
  codigoSolicitud?: string;
  detalleSolicitud?: string;
  solicitudModificada?: boolean;
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
  tipoSolicitud?: string;
  producto?: string;
  categoria?: string;
  cantidad?: number;
  detalleSolicitud?: string;
  detalle?: string;
  usuarioSolicitante?: string;
  usuario?: string;
  fechaSolicitud?: string;
  codigoSolicitud?: string;
  solicitudModificada?: boolean;
}

@Component({
  standalone: true,
  selector: 'app-buzon',
  templateUrl: './buzon.component.html',
  imports: [CommonModule, FormsModule, EditarComponent]
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

  // Modal
  visible: boolean = false;
  modalTipo: string = '';
  solicitudSeleccionada: any = null;

  productoEditado: any = {
    nombreProducto: '',
    categoria: '',
    cantidad: 1
  };

  fechaActual: string = new Date().toLocaleDateString();
  usuarioLogeado: string = '';
  codigoSolicitud: string = '';
  detalleSolicitud: string = '';
  errorMensaje: string = '';

  constructor(
    private router: Router,
    private buzonService: BuzonService,
    private layoutService: LayoutService,
    private editarService: EditarService,
  )  {}

  ngOnInit() {
    setTimeout(() => {
      this.showContent = true;
    }, 50);
    const usuarioLocal = localStorage.getItem('usuario');
    this.nombreUsuario = (usuarioLocal || '').trim().toLowerCase();
    this.usuarioLogeado = this.nombreUsuario;

    this.cargarSolicitudes();
    this.cargarProductos();
  }

  esUsuarioSolicitante(solicitud: any): boolean {
  const solicitante = (solicitud?.usuarioSolicitante || '').trim().toLowerCase();
  return solicitante === this.nombreUsuario;
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
          solicitudModificada: solicitud.solicitudModificada
        }));
      },
      error: (error) =>
        console.error('Error cargando solicitudes de actualización:', error),
    });

    this.buzonService.obtenerSolicitudesEliminacion().subscribe({
      next: (data) => {
        this.solicitudesEliminacion = data.map((solicitud: any) => ({
          id: solicitud.id,
          tipoSolicitud: solicitud.tipoSolicitud || 'ELIMINAR',
          estado: solicitud.estado || '',
          producto: solicitud.producto || '',
          categoria: solicitud.categoria || '',
          cantidad: solicitud.cantidad || 0,
          detalleSolicitud: solicitud.detalleSolicitud || solicitud.detalle || '',
          usuarioSolicitante: solicitud.usuarioSolicitante || solicitud.usuario || 'Desconocido',
          fechaSolicitud: solicitud.fechaSolicitud || solicitud.fecha || '',
          codigoSolicitud: solicitud.codigoSolicitud || '',
          solicitudModificada: solicitud.solicitudModificada
          
        }));
      },
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

  rechazarSolicitud(id: number): void {
    if (confirm('¿Estás seguro de rechazar esta solicitud de actualización?')) {
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

  rechazarActualizacion(id: number): void {
    if (confirm('¿Estás seguro de rechazar esta solicitud de actualización?')) {
      this.buzonService.rechazarSolicitudActualizar(id).subscribe({
        next: () => {
          alert('Solicitud de actualización rechazada correctamente.');
          this.cargarSolicitudes();
        },
        error: (error) => {
          console.error('Error al rechazar la solicitud de actualización:', error);
          alert('Ocurrió un error al rechazar la solicitud.');
        }
      });
    }
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

  rechazarEliminacion(id: number): void {
    if (confirm('¿Estás seguro de rechazar esta solicitud?')) {
      this.buzonService.rechazarSolicitudEliminar(id).subscribe({
        next: () => {
          alert('Solicitud de eliminación rechazada correctamente.');
          this.cargarSolicitudes();
        },
        error: (error) => {
          console.error('Error al rechazar la solicitud de eliminación:', error);
          alert('Ocurrió un error al rechazar la solicitud.');
        }
      });
    }
  }

  modalVisible: boolean = false;

abrirModalEditar(solicitud: any) {
  this.solicitudSeleccionada = solicitud;
  this.visible = true;

  this.productoEditado = {
    nombreProducto: solicitud.producto || solicitud.nuevoProducto || '',
    categoria: solicitud.categoria || solicitud.nuevaCategoria || '',
    cantidad: solicitud.cantidad || solicitud.nuevaCantidad || '', 
    detalleSolicitud: solicitud.detalleSolicitud || ''
  };
}


  cerrarModal() {
    this.modalVisible = false;
    this.solicitudSeleccionada = null;
  }
}
