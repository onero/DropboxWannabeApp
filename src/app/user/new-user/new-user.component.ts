import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {fadeInAnimation} from '../../core/animations/fade-in.animation';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
  animations: [fadeInAnimation]
})
export class NewUserComponent implements OnInit {

  newUserForm: FormGroup;

  mustEnterValue = 'You must enter a value';

  constructor(private router: Router,
              private fb: FormBuilder) {
    this.newUserForm = fb.group({
      username: ['', [
        Validators.required,
        Validators.minLength(3)]],
      email: ['', [
        Validators.required,
        Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(6)]],
      repeatPassword: ['', [
        Validators.required,
        Validators.minLength(6)]]
    });
  }

  ngOnInit() {
  }

  shouldBeMobileFriendly(): boolean {
    return environment.shouldBeMobileFriendly;
  }

  get username() {
    return this.newUserForm.get('username');
  }
  get email() {
    return this.newUserForm.get('email');
  }

  get password() {
    return this.newUserForm.get('password');
  }

  get repeatPassword() {
    return this.newUserForm.get('repeatPassword');
  }

  getUsernameErrorMessage(): string {
    return this.username.errors.required ?
      this.mustEnterValue :
      this.username.errors.minlength ?
        'Username must be at least ' + this.username.errors.minlength.requiredLength + ' characters' :
        '';
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
  getPasswordShouldMatchErrorMessage(): string {
        return 'Passwords should match';
  }
  createUser() {
    console.log('Created user ' + this.username.value);
    this.router.navigateByUrl('/login');
  }
}
