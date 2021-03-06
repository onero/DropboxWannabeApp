import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {flyInAnimation} from '../../shared/animations/fly-in.animation';
import {AuthService} from '../shared/auth.service';
import {environment} from '../../../environments/environment';
import {SnackMessengerService} from '../../core/message-handling/snack-messenger.service';
import {ErrorService} from '../../core/error-handling/error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [flyInAnimation]
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)])
  });

  passwordInputType = 'password';
  capsLockOn: boolean;
  mustEnterValue = 'You must enter a value';

  constructor(private router: Router,
              private authService: AuthService,
              private snackService: SnackMessengerService,
              private errorService: ErrorService) {
  }

  ngOnInit(): void {
  }

  shouldBeMobileFriendly(): boolean {
    return environment.shouldBeMobileFriendly;
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  getEmailErrorMessage(): string {
    return this.email.errors.required ?
      this.mustEnterValue :
      this.email.errors.email ?
        'Not a valid email' :
        '';
  }

  getPasswordErrorMessage(): string {
    return this.password.errors.required ?
      this.mustEnterValue :
      this.password.errors.minlength ?
        'Password should be at least ' + this.password.errors.minlength.requiredLength + ' characters' :
        '';
  }

  login() {
    this.authService.login(this.email.value, this.password.value)
      .then(() => {
        this.router.navigateByUrl('')
          .then(() => {
            this.snackService.displaySnack('Welcome back ' + this.authService.getUsername(), 2);
          });
      })
      .catch(error => {
        this.errorService.displayError(error.message);
      });
  }

  showPassword() {
    this.passwordInputType = 'text';
  }

  hidePassword() {
    this.passwordInputType = 'password';
  }

  toggleCapsLock(event: boolean) {
    this.capsLockOn = event;
  }
}
