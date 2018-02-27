import {EventEmitter, Injectable, Output} from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {

  userLoggedIn = false;

  @Output()
  authenticationUpdated = new EventEmitter<boolean>();

  constructor(private router: Router) { }

  isLoggedIn() {
    return this.userLoggedIn;
  }

  login() {
    // TODO ALH: Implement authentication
    this.userLoggedIn = true;
    this.authenticationUpdated.emit(true);
  }

  logout() {
    this.userLoggedIn = false;
    this.router.navigateByUrl('/login');
    this.authenticationUpdated.emit(false);
  }

}
