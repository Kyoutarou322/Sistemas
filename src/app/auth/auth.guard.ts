import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router) {}

  private isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  canActivate(): boolean {
    if (this.isAuthenticated()) return true;
    this.router.navigate(['/login']);
    return false;
  }

  canActivateChild(): boolean {
    return this.canActivate();
  }
}
