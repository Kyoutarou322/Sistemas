import { Component, AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RegistrarComponent } from '../../solicitudes/registrar/registrar.component';
import { ActualizarComponent } from '../../solicitudes/actualizar/actualizar.component';
import { EliminarComponent } from '../../solicitudes/eliminar/eliminar.component';
import { LayoutService, Producto } from './layout.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  templateUrl: './layout.component.html',
  imports: [
    CommonModule,
    RegistrarComponent,
    ActualizarComponent,
    EliminarComponent,
  ],
})
export class LayoutComponent implements OnInit, AfterViewInit {
  showContent = false;

  modalRegistrarVisible = false;
  modalActualizarVisible = false;
  modalEliminarVisible = false;

  sidebarVisible = false;
  sidebarAnimatingOut = false;
  nombreUsuario = 'Invitado';  

  productos: Producto[] = [];

  productoSeleccionado: any = null;

  fechaActual: string = '';
  usuarioLogeado: string = '';
  codigoSolicitud: string = '';

  constructor(private router: Router, private layoutService: LayoutService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
    } else {
      this.cargarProductos();

      const usuarioLocal = localStorage.getItem('usuario');
      if (usuarioLocal) {
        this.nombreUsuario = usuarioLocal;
        this.usuarioLogeado = usuarioLocal;
      } else {
        this.usuarioLogeado = 'Invitado';
      }
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.showContent = true;
    });
  }

  cargarProductos(): void {
    this.layoutService.obtenerProductos().subscribe({
      next: (data: any[]) => {
        console.log('Datos recibidos:', data);
        this.productos = data;
      },
      error: (error) => {
        console.error('Error al cargar productos:', error);
      }
    });
  }

  abrirModal(tipo: 'registrar' | 'actualizar' | 'eliminar', producto?: Producto): void {
    this.cerrarTodosLosModales();
    this.productoSeleccionado = producto ?? null;

    if (tipo === 'registrar') {
      this.modalRegistrarVisible = true;
      this.fechaActual = new Date().toLocaleDateString();
      this.generarCodigoSolicitud();
    } else if (tipo === 'actualizar') {
      this.modalActualizarVisible = true;
    } else if (tipo === 'eliminar') {
      this.modalEliminarVisible = true;
    }
  }

  onProductoRegistrado(producto: Producto): void {
  this.cargarProductos(); 
  this.modalRegistrarVisible = false;
  this.generarCodigoSolicitud();
}


  onEliminar(): void {
   
  }

  cerrarModal(): void {
    this.modalRegistrarVisible = false;
    this.modalActualizarVisible = false;
    this.modalEliminarVisible = false;
  }

  private cerrarTodosLosModales(): void {
    this.modalRegistrarVisible = false;
    this.modalActualizarVisible = false;
    this.modalEliminarVisible = false;
  }

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

  Buzon(): void {
    this.router.navigate(['/buzon']);
    this.toggleSidebar();
  }

  Historial(): void {
    this.router.navigate(['/historial']);
    this.toggleSidebar();
  }

  cerrarSesion(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');  
    this.router.navigateByUrl('/logout', { replaceUrl: true });
    this.toggleSidebar();
  }

  
  generarCodigoSolicitud(): void {
    const timestamp = Date.now().toString().slice(-5);
    const random = Math.floor(Math.random() * 900 + 100).toString();
    this.codigoSolicitud = `SOL-${timestamp}-${random}`;
  }
}
