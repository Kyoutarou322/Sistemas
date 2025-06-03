import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './registrar.component.html',
})
export class RegistrarComponent {
  @Input() visible: boolean = false;
  @Output() cerrar = new EventEmitter<void>();
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() productoRegistrado = new EventEmitter<any>(); // o elimina esta línea si no se usa aún

  cerrarModal() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  guardar() {
    console.log("Guardado exitoso");
    this.cerrarModal();
    // this.productoRegistrado.emit(data); // Agrega esto cuando tengas el producto listo
  }
}
