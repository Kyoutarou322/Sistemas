import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../service/auth.service';  // Ajusta la ruta si es necesario
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [FormsModule, RouterModule, CommonModule]
})
export class LoginComponent implements OnInit {
  usuario = '';
  contrasena = '';
  correo= '';
  error = false;
  cargando = false;
  loaded = false;

   constructor(
    private router: Router,
    private loginService: LoginService // inyecta aquí
  ) {}

  ngOnInit() {
    history.pushState(null, '', location.href);
    setTimeout(() => {
      this.loaded = true;
    }, 400);
  }

 login() {
    this.cargando = true;
    this.loginService.loginUsuario({
      usuario: this.usuario,
      contrasena: this.contrasena,
      correo_electronico: this.correo
    }).subscribe({
      next: (res: any) => { // explícito any o un tipo definido
        this.cargando = false;
        localStorage.setItem('usuario', this.usuario);
        localStorage.setItem('token', 'ok'); // <-- Agregado
        this.router.navigate(['/ingreso']);
      },
      error: (err: any) => {
        this.cargando = false;
        this.error = true;
        console.error('Error login:', err);
        localStorage.setItem('usuario', this.usuario);
      }
    });
  }
}