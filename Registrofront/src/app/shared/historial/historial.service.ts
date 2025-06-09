import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HistorialService {
  private apiUrl = 'http://localhost:8080/api/buzon';
  private apiEliminarUrl = 'http://localhost:8080/api/buzoneliminar';
  private apiActualizarUrl = 'http://localhost:8080/api/buzonactualizar';
  private apiProductosUrl = 'http://localhost:8080/api/productos';

  constructor(private http: HttpClient) {}

  // Obtener todas las solicitudes pendientes
  obtenerSolicitudesPendientes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/pendientes`);
  }

  // Obtener solicitudes por tipo
  obtenerSolicitudesRegistroHistorial(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/solicitudes/registro/historial`);
  }

  obtenerSolicitudesActualizacionHistorial(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiActualizarUrl}/solicitudes/actualizar/historial`);
  }

  obtenerSolicitudesEliminacionHistorial(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiEliminarUrl}/solicitudes/eliminar/historial`);
  }

}
