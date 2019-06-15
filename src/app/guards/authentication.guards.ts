import { Injectable } from '@angular/core';

import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import {LoginService} from '../services/auth/login.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: LoginService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const permitted: boolean = LoginService.isAuthenticated();
    if (!permitted) {
      this.router.navigateByUrl('login');
    }
    return permitted;
  }
}
