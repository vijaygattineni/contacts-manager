
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private router: Router) {}

  checkLogin() {
    let token = localStorage.getItem('token');
    if (token) { 
    this.router.navigate(['/contacts']);
    return false; 
    }
    return true;
  }

  canActivate(): boolean {
    return this.checkLogin();
  }
}