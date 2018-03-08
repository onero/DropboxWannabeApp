import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';
import {SnackMessengerService} from '../../core/message-handling/snack-messenger.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router,
              private snackService: SnackMessengerService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAuthenticated()
      .map(isLoggedIn => {
        if (isLoggedIn) return true;

        this.router.navigateByUrl('/login')
          .then(() => {
            this.snackService
              .displaySnack('Please login', 2);
          });
        return isLoggedIn;
      });
  }
}
