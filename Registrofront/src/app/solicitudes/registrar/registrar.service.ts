import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../../shared/layout/layout.service';


@Injectable({
  providedIn: 'root'
})
export class RegistrarService {
  private apiUrl = 'http://tu-backend-api.com/api/productos'; // Cambia por la URL real de tu API

  constructor(private http: HttpClient) {}

  registrarProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, producto);
  }
}
