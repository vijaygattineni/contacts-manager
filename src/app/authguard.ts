
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  checkLogin() {
    let token = localStorage.getItem('token');
    if (token) { return true; }
    // Navigate to the login page with extras
    this.router.navigate(['/login']);
    return false;
  }

  canActivate(): boolean {
    return this.checkLogin();
  }
}