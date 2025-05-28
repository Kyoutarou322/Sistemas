import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router  } from '@angular/router';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial.component.html',
})
export class HistorialComponent {
  esAdmin: boolean = true; // Cambia a false para ver la vista del usuario

  // Propiedades para el sidebar
  sidebarVisible = false;
  sidebarAnimatingOut = false;
  nombreUsuario = 'Admin'; // puedes reemplazarlo por una variable dinámica si lo deseas

showContent = false;
ngAfterViewInit(): void {
    setTimeout(() => {
      this.showContent = true;
    });
  }
ngOnInit() {
  setTimeout(() => {
    this.showContent = true;
  }, 50); // pequeño retraso para disparar la animación
}
  solicitudesRegistro = [
    { id: 1, detalle: 'Registrar nuevo producto Inka Cola' },
    { id: 2, detalle: 'Registrar producto Cerveza' }
  ];

  solicitudesActualizacion = [
    { id: 3, detalle: 'Actualizar precio de Pepsi' }
  ];

  solicitudesEliminacion = [
    { id: 4, detalle: 'Eliminar producto Sprite' }
  ];

  solicitudesAprobadas = [
    { id: 5, detalle: 'Solicitud aprobada 1' },
    { id: 6, detalle: 'Solicitud aprobada 2' }
  ];

  solicitudesRechazadas = [
    { id: 7, detalle: 'Solicitud rechazada 1' }
  ];

  // Métodos para el sidebar
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


  constructor(private router: Router) {}

  Solicitudes() {
    this.router.navigate(['/solicitudes']);
  }

  Historial() {
    this.router.navigate(['/buzon']);
  }

  cerrarSesion() {
    this.router.navigate(['/logout']); { replaceUrl: true };
    localStorage.removeItem('token'); 
  }
}
