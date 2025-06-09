import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BuzonService } from '../../shared/buzon/buzon.service';

@Component({
  selector: 'app-eliminar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './eliminar.component.html',
})
export class EliminarComponent implements OnInit, OnChanges {
  @Input() visible: boolean = false;
  @Input() producto: any = { id: null, nombreProducto: '', categoria: '', cantidad: 1 };

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() cerrar = new EventEmitter<void>();
  @Output() productoEliminado = new EventEmitter<void>();

  fechaActual: string = '';
  usuarioLogeado: string = '';
  codigoSolicitud: string = '';

  productoOriginal: any = {};
  detalleSolicitud: string = ''; 
  errorMensaje: string = '';

  constructor(private buzonService: BuzonService) {}

  ngOnInit() {
    this.inicializarDatos();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['producto']) {
      this.inicializarDatos();
    }
  }

  inicializarDatos() {
    this.fechaActual = new Date().toLocaleDateString();
    this.usuarioLogeado = localStorage.getItem('usuario') || 'Invitado';
    this.codigoSolicitud = this.generarCodigoSolicitud();
    this.productoOriginal = { ...this.producto };
    this.detalleSolicitud = '';
    this.errorMensaje = '';
  }

  generarCodigoSolicitud(): string {
    const randomPart = Math.floor(1000 + Math.random() * 9000);
    const fechaPart = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    return `SOL-${fechaPart}-${randomPart}`;
  }

  cerrarModal() {
    this.errorMensaje = '';
    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.cerrar.emit();
  }

  guardar() {
    const detalleValido = this.detalleSolicitud?.trim();
    const nombreValido = this.productoOriginal.nombreProducto?.trim();
    const categoriaValida = this.productoOriginal.categoria?.trim();
    const cantidadValida = this.productoOriginal.cantidad != null && this.productoOriginal.cantidad > 0;

    if (!nombreValido || !categoriaValida || !cantidadValida || !detalleValido) {
      this.errorMensaje = 'Por favor, complete todos los campos correctamente.';
      return;
    }

    this.errorMensaje = '';

    const solicitudEliminacion = {
      tipoSolicitud: 'ELIMINAR',
      estado: 'PENDIENTE',
      fechaSolicitud: new Date(),
      productoId: this.productoOriginal.id,
      producto: this.productoOriginal.nombreProducto,
      categoria: this.productoOriginal.categoria,
      cantidad: this.productoOriginal.cantidad.toString(),
      codigoSolicitud: this.codigoSolicitud,
      usuarioSolicitante: this.usuarioLogeado,
      detalleSolicitud: this.detalleSolicitud,
      solicitudModificada: false
    };

    this.buzonService.registrarSolicitudEliminar(solicitudEliminacion).subscribe({
      next: () => {
        alert('Solicitud de eliminación registrada correctamente.');
        this.cerrarModal();
        this.productoEliminado.emit();
      },
      error: (error) => {
        console.error('Error del backend al eliminar:', error);
        const mensaje = error?.error?.message || 'Error al registrar la solicitud.';
        alert(mensaje);
      }
    });
  }
}
