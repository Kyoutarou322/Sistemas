import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { RegisterService } from './register.service'; // ruta relativa correcta
import { NgIf } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  imports: [FormsModule, RouterModule, NgIf],
})
export class RegisterComponent implements OnInit {
  nombre = '';
  usuario = '';
  contrasena = '';
  confirmarContrasena = '';
  correo = '';
  error = '';
  cargando = false;
  loaded = false;

  constructor(private registerService: RegisterService, private router: Router) {}

  ngOnInit(): void {
    const animacionMostrada = sessionStorage.getItem('animacionRegister');
    if (!animacionMostrada) {
      setTimeout(() => {
        this.loaded = true;
      }, 50);
      sessionStorage.setItem('animacionRegister', 'true');
    } else {
      this.loaded = true;
    }
  }

 registrar() {
  if (this.contrasena !== this.confirmarContrasena) {
    this.error = 'Las contraseñas no coinciden.';
    return;
  }

  this.cargando = true;
 const datosRegistro = {
  nombres: this.nombre,
  usuario: this.usuario,
  contrasena: this.contrasena,
  correo_electronico: this.correo, // ✅ correcto
};

  this.registerService.registrarUsuario(datosRegistro).subscribe({
    next: (response) => {
      this.cargando = false;
      alert('Usuario registrado correctamente');
      // Limpiar campos aquí si quieres
    },
   error: (error) => {
  this.cargando = false;
  console.error('Error completo:', error);
  if (error.error && error.error.mensaje) {  // <---- cambia message por mensaje
    this.error = error.error.mensaje;
  } else if (error.message) {
    this.error = error.message;
  } else {
    this.error = 'Error al registrar usuario';
  }
}

  });
}
}