import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [FormsModule, RouterModule, CommonModule]
})
export class LoginComponent implements OnInit, OnDestroy {
  usuario = '';
  contrasena = '';
  correo = '';
  error = false;
  cargando = false;
  loaded = false;

  constructor(
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    // Si ya hay token, ir directo a ingreso
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/ingreso']);
      return;
    }

    history.pushState(null, '', location.href);
    window.addEventListener('popstate', this.preventBackForward);
    setTimeout(() => {
      this.loaded = true;
    }, 400);
  }

  preventBackForward = (event: PopStateEvent) => {
    history.pushState(null, '', location.href);
  };

  login() {
    this.cargando = true;
    this.loginService.loginUsuario({
      usuario: this.usuario,
      contrasena: this.contrasena,
      correo_electronico: this.correo
    }).subscribe({
      next: (res: any) => {
        this.cargando = false;
        localStorage.setItem('usuario', this.usuario);
        localStorage.setItem('token', 'ok');
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

  ngOnDestroy() {
    window.removeEventListener('popstate', this.preventBackForward);
  }
}
