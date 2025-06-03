import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SolicitudesRoutingModule } from './solicitudes-routing.module';

import { ActualizarComponent } from './actualizar/actualizar.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { EliminarComponent } from './eliminar/eliminar.component';

@NgModule({
  declarations: [
    ActualizarComponent,
    RegistrarComponent,
    EliminarComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SolicitudesRoutingModule,
  ],
})
export class SolicitudesModule {}
