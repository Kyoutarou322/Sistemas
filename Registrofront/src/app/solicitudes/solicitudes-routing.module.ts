import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadComponent: () => import('./registrar/registrar.component').then(m => m.ListarComponent) },
  { path: 'formulario', loadComponent: () => import('./actualizar/actualizar.component').then(m => m.FormularioComponent) },
  { path: 'eliminadas', loadComponent: () => import('./eliminar/eliminar.component').then(m => m.EliminadasComponent) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudesRoutingModule { }
