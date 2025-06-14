

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EditarService {
  private abrirModalSource = new BehaviorSubject<{ tipo: string; solicitud: any } | null>(null);

  abrirModal$ = this.abrirModalSource.asObservable();

  constructor() {}

  abrirModal(tipo: string, solicitud: any) {
    this.abrirModalSource.next({ tipo, solicitud });
  }

  cerrarModal() {
    this.abrirModalSource.next(null);
  }
  
}
