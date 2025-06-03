import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Importa FormsModule

@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [CommonModule, FormsModule],  // Agrega FormsModule aquí
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

    const nuevoProducto = {
      producto: this.producto,
      categoria: this.categoria,
      cantidad: this.cantidad,
      fechaRegistro: this.fechaActual,
      usuario: this.usuarioLogeado,
      codigoSolicitud: this.codigoSolicitud,
      detalleSolicitud: this.detalleSolicitud,
    };

    console.log('Guardado exitoso', nuevoProducto);

    this.productoRegistrado.emit(nuevoProducto);
    this.cerrarModal();
  }
}
