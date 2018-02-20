import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  newUserForm = new FormGroup ({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3)]),
    email: new FormControl('', [
      Validators.required,
      Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)]),
    repeatPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6)]),
  });

  mustEnterValue = 'You must enter a value';

  constructor(private router: Router) { }

  ngOnInit() {
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
