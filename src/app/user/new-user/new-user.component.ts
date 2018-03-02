import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {fadeInAnimation} from '../../core/animations/fade-in.animation';
import {environment} from '../../../environments/environment';
import {AuthService} from '../../auth/auth.service';
import {SnackMessengerService} from '../../core/message-handling/snack-messenger.service';
import {passwordsMustMatch} from './validators/password.validator';
import {User} from '../user.model';
import {UsernameValidator} from './validators/username.validator';
import {AngularFirestore} from 'angularfire2/firestore';

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
              private fb: FormBuilder,
              private authService: AuthService,
              private snackService: SnackMessengerService,
              private afs: AngularFirestore) {
    this.newUserForm = fb.group({
      username: ['', [
        Validators.required,
        Validators.minLength(3)],
        UsernameValidator.usernameAvailable(this.afs)],
      email: ['', [
        Validators.required,
        Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(6)]],
      repeatPassword: ['', [
        Validators.required,
        passwordsMustMatch()]]
    });
  }

  ngOnInit() {
  }


  createUser() {
    const newUser: User = {
      username: this.username.value,
      email: this.email.value,
      password: this.password.value
    };
    this.authService.registerWithEmailAndPassword(newUser)
      .then(() => {
        this.router.navigateByUrl('/login')
          .then(() => {
            this.snackService.displaySnack('User Created', 2);
          });
      })
      .catch(error => {
        this.snackService.displaySnack(error.message, 5);
      });
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
    if (this.username.errors.required) {
      return this.mustEnterValue;
    } else if (this.username.errors.minlength) {
      console.log(this.username.errors)
      const requiredLength = this.username.errors.minlength.requiredLength;
      return `Username must be at least ${requiredLength} characters`;
    } else if (this.username.errors.usernameAvailable) {
      return `Sorry ${this.username.value} is already taken!`;
    } else {
      console.log(this.username.errors)
      return '';
    }
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
    return this.repeatPassword.errors.required ?
      this.mustEnterValue :
      'Passwords must match';
  }
}
