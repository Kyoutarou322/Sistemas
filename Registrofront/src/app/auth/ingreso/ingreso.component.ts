import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
})
export class IngresoComponent implements OnInit, OnDestroy {
  constructor(private router: Router) {}

  ngOnInit(): void {
    history.pushState(null, '', location.href);
    window.addEventListener('popstate', this.preventBackForward);

    setTimeout(() => {
      this.router.navigate(['/solicitudes'], { replaceUrl: true });
    }, 2000);
  }

  preventBackForward = (event: PopStateEvent) => {
    history.pushState(null, '', location.href);
  };

  ngOnDestroy(): void {
    window.removeEventListener('popstate', this.preventBackForward);
  }
}
