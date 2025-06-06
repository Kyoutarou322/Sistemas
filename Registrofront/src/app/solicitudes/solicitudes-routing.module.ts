import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadComponent: () => import('./registrar/registrar.component').then(m => m.RegistrarComponent) },
  { path: 'formulario', loadComponent: () => import('./actualizar/actualizar.component').then(m => m.ActualizarComponent) },
  { path: 'eliminadas', loadComponent: () => import('./eliminar/eliminar.component').then(m => m.EliminarComponent) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudesRoutingModule { }
