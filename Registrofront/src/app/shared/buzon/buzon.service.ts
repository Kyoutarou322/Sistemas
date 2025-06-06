import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BuzonService {
  private apiUrl = 'http://localhost:8080/api/buzon';
  private apiActualizarUrl = 'http://localhost:8080/api/buzonactualizar';
  private apiProductosUrl = 'http://localhost:8080/api/productos';

  constructor(private http: HttpClient) {}

  // Registrar solicitud de nuevo producto
  registrarSolicitud(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/solicitud`, data);
  }

  // Registrar solicitud de actualización (buzonactualizar)
  registrarSolicitudActualizar(data: any): Observable<any> {
    return this.http.post(`${this.apiActualizarUrl}/solicitud`, data);
  }

  // Obtener todas las solicitudes pendientes
  obtenerSolicitudesPendientes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/pendientes`);
  }

  // Obtener solicitudes por tipo
  obtenerSolicitudesRegistro(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/solicitudes/registro`);
  }

  obtenerSolicitudesActualizacion(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiActualizarUrl}/solicitudes/actualizacion`);
  }

  obtenerSolicitudesEliminacion(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/solicitudes/eliminacion`);
  }

  // Aceptar o rechazar solicitud de REGISTRO
  aceptarSolicitud(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/registro/aceptar/${id}`, {});
  }

  rechazarSolicitud(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/rechazar/${id}`);
  }

  // Aceptar o rechazar solicitud de ACTUALIZACIÓN
  aceptarActualizacion(solicitudId: number): Observable<any> {
    return this.http.post(`${this.apiActualizarUrl}/aceptar/${solicitudId}`, {});
  }

  rechazarActualizacion(id: number): Observable<any> {
    return this.http.delete(`${this.apiActualizarUrl}/rechazar/${id}`);
  }

  // Aceptar o rechazar solicitud de ELIMINACIÓN
  aceptarEliminacion(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/eliminacion/aceptar/${id}`, {});
  }

  rechazarEliminacion(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/eliminacion/rechazar/${id}`);
  }

  // Actualizar directamente un producto 
  actualizarProducto(id: number, datos: any): Observable<any> {
    return this.http.put(`${this.apiProductosUrl}/${id}`, datos);
  }
}
