import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.scss'],
  imports: [CommonModule]
})
export class SolicitudesComponent {
  modalAbierto = false;

  @Output() modalStateChange = new EventEmitter<boolean>();

  abrirModal() {
    this.modalAbierto = true;
    this.modalStateChange.emit(this.modalAbierto);
  }

  cerrarModal() {
    this.modalAbierto = false;
    this.modalStateChange.emit(this.modalAbierto);
  }
}
