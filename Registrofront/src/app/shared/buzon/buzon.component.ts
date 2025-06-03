import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router  } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-buzon',
  templateUrl: './buzon.component.html',
  imports: [CommonModule]
})
export class BuzonComponent {
  esAdmin: boolean = true; // Cambia a false para ver la vista del usuario
  modalRegistrarVisible = false;
  modalActualizarVisible = false;
  modalEliminarVisible = false;
  nombreUsuario = 'Admin';
  // Propiedades para el sidebar
  sidebarVisible = false;
  sidebarAnimatingOut = false;

ngAfterViewInit(): void {
    setTimeout(() => {
      this.showContent = true;
    });
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
showContent = false;

ngOnInit() {
  setTimeout(() => {
    this.showContent = true;
  }, 50); // pequeño retraso para disparar la animación
}

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
  // Métodos llamados en el template, puedes implementar la lógica que desees
  Solicitudes() {
  this.router.navigate(['/solicitudes']);
  }

  Historial() {
    this.router.navigate(['/historial']);
  }

  cerrarSesion() {
    this.router.navigate(['/logout']);
    // Por ejemplo, limpiar token y redirigir
    localStorage.removeItem('token');
    // Redirigir o recargar según tu lógica
  }
}
