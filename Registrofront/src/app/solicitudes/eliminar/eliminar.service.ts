import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../../shared/layout/layout.service';

@Injectable({
  providedIn: 'root'
})
export class ActualizarService {
  private apiUrl = 'http://tu-backend-api.com/api/productos'; 

  constructor(private http: HttpClient) {}

  eliminarProducto(producto: Producto): Observable<Producto> {
   return this.http.post<Producto>(this.apiUrl, producto);
  }
}
