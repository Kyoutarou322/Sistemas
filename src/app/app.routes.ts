import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LayoutComponent } from './shared/layout/layout.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Login y Registro (NO usan layout)
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'ingreso',
    loadComponent: () => import('./auth/ingreso/ingreso.component').then(m => m.IngresoComponent)
  },
  { path: 'logout', 
    loadComponent: () => import('./auth/logout/logout.component').then(m => m.LogoutComponent)
   },


  // Solicitudes (usa layout)
  {
    path: 'solicitudes',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./solicitudes/solicitudes/solicitudes.component').then(m => m.SolicitudesComponent)
      },
      {
        path: 'registrar',
        loadComponent: () => import('./solicitudes/registrar/registrar.component').then(m => m.RegistrarComponent)
      },
      {
        path: 'actualizar',
        loadComponent: () => import('./solicitudes/actualizar/actualizar.component').then(m => m.ActualizarComponent)
      },
      {
        path: 'eliminar',
        loadComponent: () => import('./solicitudes/eliminar/eliminar.component').then(m => m.EliminarComponent)
      }
    ]
  },

  // Buzón (ruta principal independiente)
  {
    path: 'buzon',
    loadComponent: () => import('./shared/buzon/buzon.component').then(m => m.BuzonComponent),
    canActivate: [AuthGuard]
  },
  {
  path: 'historial',
  loadComponent: () => import('./shared/historial/historial.component').then(m => m.HistorialComponent),
  canActivate: [AuthGuard]
}

];
