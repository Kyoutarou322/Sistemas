import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
})
export class LogoutComponent implements OnInit, OnDestroy {
  constructor(private router: Router) {}

  ngOnInit(): void {
    localStorage.clear();

    history.pushState(null, '', location.href);
    window.addEventListener('popstate', this.preventBackForward);

    setTimeout(() => {
      this.router.navigate(['/login'], { replaceUrl: true });
    }, 2000);
  }

  preventBackForward = (event: PopStateEvent) => {
    history.pushState(null, '', location.href);
  };

  ngOnDestroy(): void {
    window.removeEventListener('popstate', this.preventBackForward);
  }
}
