import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {fadeInAnimation} from '../../core/animations/fade-in.animation';
import {environment} from '../../../environments/environment';
import {AuthService} from '../../auth/auth.service';
import {SnackMessengerService} from '../../core/message-handling/snack-messenger.service';
import {PasswordValidator} from './validators/password.validator';
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
      username: ['',
        [Validators.required,
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
        PasswordValidator.passwordsMustMatch()]]
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
      const requiredLength = this.username.errors.minlength.requiredLength;
      return `Username must be at least ${requiredLength} characters`;
    } else if (this.username.errors.usernameAvailable) {
      return `Sorry ${this.username.value} is already taken!`;
    } else {
      return '';
    }
  }

  getEmailErrorMessage(): string {
    if (this.email.errors.required) {
      return this.mustEnterValue;
    } else if (this.email.errors.email) {
      return 'Not a valid email';
    } else {
      return '';
    }
  }

  getPasswordErrorMessage(): string {
    if (this.password.errors.required) {
      return this.mustEnterValue;
    } else if (this.password.errors.minlength) {
      const requiredLength = this.password.errors.minlength.requiredLength;
      return `Password should be at least ${requiredLength} characters`;
    } else {
      return '';
    }
  }

  getPasswordMustMatchErrorMessage(): string {
    if (this.repeatPassword.errors.required) {
      return this.mustEnterValue;
    } else if (this.repeatPassword.errors.passwordsMustMatch) {
      return 'Passwords must match';
    } else {
      return '';
    }

  }
}
