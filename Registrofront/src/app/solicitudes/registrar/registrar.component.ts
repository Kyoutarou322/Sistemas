import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  
import { BuzonService } from '../../shared/buzon/buzon.service';

@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registrar.component.html',
})
export class RegistrarComponent implements OnInit {
  @Input() visible: boolean = false;
  @Output() cerrar = new EventEmitter<void>();
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() productoRegistrado = new EventEmitter<any>();

  fechaActual: string = '';
  usuarioLogeado: string = '';
  codigoSolicitud: string = '';

  producto: string = '';
  categoria: string = '';
  cantidad: number | null = null;
  detalleSolicitud: string = '';
  errorMensaje: string = '';

  constructor(private buzonService: BuzonService) {}

  ngOnInit(): void {
    this.fechaActual = new Date().toLocaleDateString();
    this.usuarioLogeado = localStorage.getItem('usuario') || 'Invitado';
    this.codigoSolicitud = this.generarCodigoSolicitud();
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
      !this.producto.trim() ||
      !this.categoria.trim() ||
      this.cantidad === null || this.cantidad <= 0 ||
      !this.detalleSolicitud.trim()
    ) {
      this.errorMensaje = 'Por favor, complete todos los campos correctamente.';
      return;
    }

    this.errorMensaje = '';

    const datos = {
      tipoSolicitud: 'REGISTRAR',
      estado: 'PENDIENTE',
      fechaSolicitud: new Date(),
      motivoDeEliminacion: 'NINGUNO',
      producto: this.producto,
      categoria: this.categoria,
      cantidad: this.cantidad,
      detalleSolicitud: this.detalleSolicitud,
      codigoSolicitud: this.codigoSolicitud,
      solicitudModificada: false,
      usuarioSolicitante: this.usuarioLogeado
    };

    this.buzonService.registrarSolicitud(datos).subscribe({
      next: () => {
        this.productoRegistrado.emit(datos);
        this.cerrarModal();
        alert('Solicitud enviada al buzón.');
      },
      error: (err: any) => {
        console.error(err);
        alert('Error al enviar solicitud.');
      }
    });
  }
}
