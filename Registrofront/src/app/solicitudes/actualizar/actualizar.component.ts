import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BuzonService } from '../../shared/buzon/buzon.service';

@Component({
  selector: 'app-actualizar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './actualizar.component.html',
})
export class ActualizarComponent implements OnInit, OnChanges {
  @Input() visible: boolean = false;
  @Input() producto: any = { id: null, nombreProducto: '', categoria: '', cantidad: 1 };

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() cerrar = new EventEmitter<void>();
  @Output() productoActualizado = new EventEmitter<any>();

  fechaActual: string = '';
  usuarioLogeado: string = '';
  codigoSolicitud: string = '';

  productoOriginal: any = {};
  productoEditado: any = {};

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
    this.productoEditado = { ...this.producto };
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
    if (
      !this.productoEditado.nombreProducto?.trim() ||
      !this.productoEditado.categoria?.trim() ||
      this.productoEditado.cantidad == null || this.productoEditado.cantidad <= 0 ||
      !this.detalleSolicitud.trim()
    ) {
      this.errorMensaje = 'Por favor, complete todos los campos correctamente.';
      return;
    }

    const solicitudActualizacion = {
      tipoSolicitud: 'ACTUALIZAR',
      estado: 'PENDIENTE',
      fechaSolicitud: new Date(),
      productoId: this.productoOriginal.id,  
      producto: `${this.productoOriginal.nombreProducto} / ${this.productoEditado.nombreProducto}`,
      categoria: `${this.productoOriginal.categoria} / ${this.productoEditado.categoria}`,
      cantidad: `${this.productoOriginal.cantidad} / ${this.productoEditado.cantidad}`,
      codigoSolicitud: this.codigoSolicitud,
      usuarioSolicitante: this.usuarioLogeado,
      detalleSolicitud: this.detalleSolicitud,
      solicitudModificada: false
    };

    this.buzonService.registrarSolicitudActualizar(solicitudActualizacion).subscribe({
      next: () => {
        alert('Solicitud de actualización registrada correctamente.');
        this.cerrarModal();
        this.productoActualizado.emit(null); 
      },
      error: (error) => {
        this.errorMensaje = 'Error al registrar la solicitud.';
        console.error(error);
      }
    });
  }
}
