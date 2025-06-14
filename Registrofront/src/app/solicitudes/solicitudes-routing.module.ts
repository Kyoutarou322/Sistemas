import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'registro', loadComponent: () => import('./registrar/registrar.component').then(m => m.RegistrarComponent) },
  { path: 'actualizar', loadComponent: () => import('./actualizar/actualizar.component').then(m => m.ActualizarComponent) },
  { path: 'eliminar', loadComponent: () => import('./eliminar/eliminar.component').then(m => m.EliminarComponent) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudesRoutingModule { }
