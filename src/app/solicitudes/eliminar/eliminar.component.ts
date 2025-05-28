import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-eliminar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './eliminar.component.html',
})
export class EliminarComponent {
  @Input() visible: boolean = false;
  @Input() producto: any; // O tipa como Producto si tienes el modelo

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() cerrar = new EventEmitter<void>();

  cerrarModal() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.cerrar.emit();
  }

  guardar() {
    console.log("Eliminación exitosa", this.producto);
    this.cerrarModal();
  }
}
