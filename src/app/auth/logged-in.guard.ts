import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthService} from './auth.service';
import {SnackMessengerService} from '../core/message-handling/snack-messenger.service';

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router,
              private snack: SnackMessengerService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAuthenticated()
      .map(isLoggedIn => {
        if (isLoggedIn) {
          this.router.navigateByUrl('')
            .then(() => {
              this.snack.displaySnack('Let me help you back on track!', 2);
            });
        }
        return !isLoggedIn;
      });
  }
}
