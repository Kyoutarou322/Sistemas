import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BuzonService {
  private apiUrl = 'http://localhost:8080/api/buzon';

  constructor(private http: HttpClient) {}

  registrarSolicitud(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/solicitud`, data);
  }

  obtenerSolicitudesPendientes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/pendientes`);
  }

  // Nuevo método para obtener solicitudes de registro
  obtenerSolicitudesRegistro(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/solicitudes/registro`);
  }

  aceptarSolicitud(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/aceptar/${id}`, {});
  }

  rechazarSolicitud(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/rechazar/${id}`, {});
  }

  aceptarActualizacion(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/actualizacion/aceptar/${id}`, {});
  }

  rechazarActualizacion(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/actualizacion/rechazar/${id}`, {});
  }

  aceptarEliminacion(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/eliminacion/aceptar/${id}`, {});
  }

  rechazarEliminacion(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/eliminacion/rechazar/${id}`, {});
  }
}
