import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {flyInAnimation} from '../../core/animations/fly-in.animation';
import {AuthService} from '../auth.service';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [flyInAnimation]
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup ({
    email: new FormControl('', [
      Validators.required,
      Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)])
  });

  shouldBeMobileFriendly = false;
  mediaWatcher: Subscription;

  mustEnterValue = 'You must enter a value';

  constructor(private router: Router,
              private authService: AuthService,
              media: ObservableMedia) {
    this.mediaWatcher = media.subscribe((change: MediaChange) => {
      switch (change.mqAlias) {
        case 'xs':
          this.shouldBeMobileFriendly = true;
          break;
        case 'sm':
          this.shouldBeMobileFriendly = true;
          break;
        default:
          this.shouldBeMobileFriendly = false;
      }
    });
  }

  ngOnInit(): void {
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
    this.authService.login();
    this.router.navigateByUrl('');
  }
}
