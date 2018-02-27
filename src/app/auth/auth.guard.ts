import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private service: AuthService,
              private router: Router) {}

  canActivate() {
    if (this.service.isLoggedIn()) return true;

    this.router.navigateByUrl('/login');
    return false;
  }
}
