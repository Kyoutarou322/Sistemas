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

  // Obtener solicitudes de registro
  obtenerSolicitudesRegistro(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/solicitudes/registro`);
  }

  // Aceptar solicitud (POST con cuerpo vacío)
  aceptarSolicitud(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/aceptar/${id}`, {});
  }

  // Rechazar solicitud (DELETE)
  rechazarSolicitud(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/rechazar/${id}`);
  }

  // Aceptar actualización (POST con cuerpo vacío)
  aceptarActualizacion(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/actualizacion/aceptar/${id}`, {});
  }

  // Rechazar actualización (DELETE)
  rechazarActualizacion(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/actualizacion/rechazar/${id}`);
  }

  // Aceptar eliminación (POST con cuerpo vacío)
  aceptarEliminacion(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/eliminacion/aceptar/${id}`, {});
  }

  // Rechazar eliminación (DELETE)
  rechazarEliminacion(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/eliminacion/rechazar/${id}`);
  }
}

