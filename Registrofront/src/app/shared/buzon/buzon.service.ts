import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})


export class BuzonService {
  private apiUrl = 'http://localhost:8080/api/buzon';
  private apiEliminarUrl = 'http://localhost:8080/api/buzoneliminar';
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

  // Registrar solicitud de eliminación (nuevo)
  registrarSolicitudEliminar(data: any): Observable<any> {
    return this.http.post(`${this.apiEliminarUrl}/solicitud`, data);
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
    return this.http.get<any[]>(`${this.apiEliminarUrl}/solicitudes/eliminacion`);
  }

  // Aceptar o rechazar solicitud de REGISTRO
  aceptarSolicitud(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/registro/aceptar/${id}`, {});
  }

  rechazarSolicitud(id: number): Observable<any> {
    return this.http.put(`http://localhost:8080/api/buzon/rechazar/${id}`, {});
}

  // Aceptar o rechazar solicitud de ACTUALIZACIÓN
  aceptarActualizacion(solicitudId: number): Observable<any> {
    return this.http.post(`${this.apiActualizarUrl}/aceptar/${solicitudId}`, {});
  }

  rechazarSolicitudActualizar(id: number) {
  return this.http.put(`http://localhost:8080/api/buzonactualizar/rechazar/${id}`, {});
}

  // Aceptar o rechazar solicitud de ELIMINACIÓN
  aceptarEliminacion(id: number): Observable<any> {
    return this.http.post(`${this.apiEliminarUrl}/aceptar/${id}`, {});
  }

  rechazarSolicitudEliminar(id: number) {
  return this.http.put(`http://localhost:8080/api/buzoneliminar/rechazar/${id}`, {});
}

  // Actualizar directamente un producto 
  actualizarProducto(id: number, datos: any): Observable<any> {
    return this.http.put(`${this.apiProductosUrl}/${id}`, datos);
  }

  actualizarSolicitud(solicitud: any) {
  return this.http.put(`http://localhost:3000/buzon/${solicitud.id}`, solicitud);
}

editarSolicitudRegistro(id: number, datos: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/buzon/${id}`, datos);
}

editarSolicitudActualizacion(id: number, datos: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/buzonactualizar/${id}`, datos);
}

editarSolicitudEliminacion(id: number, datos: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/buzoneliminar/${id}`, datos);
}

actualizarSolicitudRegistro(id: number, datos: any): Observable<any> {
  return this.http.put(`http://localhost:8080/api/buzon/${id}`, datos);
}
actualizarSolicitudEliminar(id: number, datos: any): Observable<any> {
  return this.http.put(`http://localhost:8080/api/buzoneliminar/${id}`, datos);
}
actualizarSolicitudActualizar(id: number, datos: any): Observable<any> {
  return this.http.put(`http://localhost:8080/api/buzonactualizar/${id}`, datos);
}

}
