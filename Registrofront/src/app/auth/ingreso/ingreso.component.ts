import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
})
export class IngresoComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    // No limpiar sesión aquí, ya que acabas de guardar el token en login

    setTimeout(() => {
      // Navega a layout después de la espera
      this.router.navigate(['/solicitudes'], { replaceUrl: true });
    }, 2000);
  }
}
