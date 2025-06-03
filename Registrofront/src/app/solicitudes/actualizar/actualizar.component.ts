import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actualizar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './actualizar.component.html',
})
export class ActualizarComponent {
  @Input() visible: boolean = false;
  @Input() producto: any; // Considera tiparlo como Producto si ya tienes el modelo

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() cerrar = new EventEmitter<void>();

  cerrarModal() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.cerrar.emit(); // Opcional si quieres notificar al padre
  }

  guardar() {
    console.log("Actualización exitosa", this.producto);
    this.cerrarModal();
  }
}
