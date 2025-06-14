import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BuzonService } from '../../shared/buzon/buzon.service'; 

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar.component.html',
})
export class EditarComponent implements OnChanges {
  @Input() modalVisible: boolean = false;
  @Input() solicitud: any = null;
  @Output() cerrar = new EventEmitter<void>();
  
  get modoSoloLectura(): boolean {
  return (this.solicitud?.tipoSolicitud || '').trim().toUpperCase() === 'ELIMINAR';
}

  productoOriginal: any = {}; 
  productoEditado: any = {};  

  get tipoSolicitud(): string {
  return (this.solicitud?.tipoSolicitud || '').trim().toUpperCase();
}

  constructor(private buzonService: BuzonService) {}

  protegerParteIzquierda(event: Event): void {
    const input = event.target as HTMLInputElement;
    const valor = input.value;
    const slashIndex = valor.indexOf('/');

    if (slashIndex !== -1) {
      const parteProtegida = this.productoOriginal.cantidad.split('/')[0].trim(); 
      const parteEditable = valor.slice(slashIndex + 1).replace(/[^\d\s]/g, '').trimStart();
      input.value = `${parteProtegida} / ${parteEditable}`;
      this.productoEditado.cantidad = input.value;
    } else {
      const parteProtegida = this.productoOriginal.cantidad.split('/')[0].trim();
      input.value = `${parteProtegida} / `;
      this.productoEditado.cantidad = input.value;
    }
  }

  protegerParteIzquierdaCantidad(event: Event): void {
  const input = event.target as HTMLInputElement;
  const valorActual = input.value;
  const slashIndex = valorActual.indexOf('/');

  const parteProtegida = this.productoOriginal.cantidad.toString().split('/')[0].trim();

  let parteEditable = '';
  if (slashIndex !== -1) {
    parteEditable = valorActual.slice(slashIndex + 1).replace(/[^0-9 ]/g, '').trimStart();
  }

  if (!valorActual.startsWith(parteProtegida)) {
    input.value = `${parteProtegida} / ${parteEditable}`;
  }

  this.productoEditado.cantidad = input.value;
}

  protegerParteIzquierdaCategoria(event: Event): void {
  const input = event.target as HTMLInputElement;
  const valorActual = input.value;
  const slashIndex = valorActual.indexOf('/');

  const parteProtegida = this.productoOriginal.categoria.split('/')[0].trim();

  let parteEditable = '';
  if (slashIndex !== -1) {
    parteEditable = valorActual.slice(slashIndex + 1).replace(/[^\w\s]/g, '').trimStart();
  }

  if (!valorActual.startsWith(parteProtegida)) {
    input.value = `${parteProtegida} / ${parteEditable}`;
  }

  this.productoEditado.categoria = input.value;
}

  protegerParteIzquierdaProducto(event: Event): void {
  const input = event.target as HTMLInputElement;
  const valorActual = input.value;
  const slashIndex = valorActual.indexOf('/');

  const parteProtegida = this.productoOriginal.nombreProducto.split('/')[0].trim();

  let parteEditable = '';
  if (slashIndex !== -1) {
    parteEditable = valorActual.slice(slashIndex + 1).replace(/[^\w\s]/g, '').trimStart();
  }

  if (!valorActual.startsWith(parteProtegida)) {
    input.value = `${parteProtegida} / ${parteEditable}`;
  }

  this.productoEditado.nombreProducto = input.value;
}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['solicitud'] && this.solicitud) {
      this.productoOriginal = {
        nombreProducto: this.solicitud.producto || this.solicitud.nuevoProducto || '',
        categoria: this.solicitud.categoria || this.solicitud.nuevaCategoria || '',
        cantidad: this.solicitud.cantidad || this.solicitud.nuevaCantidad || '',
        detalleSolicitud: this.solicitud.detalleSolicitud || '', 
      };

      this.productoEditado = { ...this.productoOriginal };
    }
  }

  cerrarModal() {
    this.cerrar.emit();
  }

  guardar() {
  if (!this.solicitud || !this.solicitud.id) {
    console.error('No hay solicitud válida para editar.');
    return;
  }

  const confirmacion = window.confirm('¿Estás seguro de que deseas editar esta solicitud?');

  if (!confirmacion) {
    return; 
  }

  const datosEditados = {
    producto: this.productoEditado.nombreProducto,
    categoria: this.productoEditado.categoria,
    cantidad: this.productoEditado.cantidad,
    detalleSolicitud: this.productoEditado.detalleSolicitud,
  };

  this.buzonService.actualizarSolicitudRegistro(this.solicitud.id, datosEditados)
    .subscribe({
      next: (respuesta: any) => {
        console.log('Solicitud actualizada con éxito', respuesta);
        this.cerrarModal();
        window.location.reload(); 
      },
      error: (error: any) => {
        console.error('Error al actualizar la solicitud', error);
      }
    });
    this.buzonService.actualizarSolicitudEliminar(this.solicitud.id, datosEditados)
    .subscribe({
      next: (respuesta: any) => {
        console.log('Solicitud actualizada con éxito', respuesta);
        this.cerrarModal();
        window.location.reload(); 
      },
      error: (error: any) => {
        console.error('Error al actualizar la solicitud', error);
      }
    });
    this.buzonService.actualizarSolicitudActualizar(this.solicitud.id, datosEditados)
    .subscribe({
      next: (respuesta: any) => {
        console.log('Solicitud actualizada con éxito', respuesta);
        this.cerrarModal();
        window.location.reload(); 
      },
      error: (error: any) => {
        console.error('Error al actualizar la solicitud', error);
      }
    });
}
}
