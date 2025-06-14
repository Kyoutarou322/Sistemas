import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Usuario {
  nombres: string;
  usuario: string;
  contrasena: string;
  correo_electronico: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/api/auth/register'; 
  private apiUrlLogin = '/api/auth/login';
  constructor(private http: HttpClient) {}

  registrar(usuario: Usuario): Observable<any> {
    return this.http.post(this.apiUrl, usuario);
  }
 login(usuario: string, contrasena: string, correo: string): Observable<any> {
  return this.http.post('/api/auth/login', { usuario, contrasena, correo_electronico: correo });
}

  guardarUsuarioSesion(nombreUsuario: string) {
    localStorage.setItem('nombreUsuario', nombreUsuario);
  }

  obtenerUsuarioSesion(): string {
    return localStorage.getItem('nombreUsuario') || 'Invitado';
  }

  limpiarUsuarioSesion() {
    localStorage.removeItem('nombreUsuario');
  }
}

