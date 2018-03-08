import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {fadeInAnimation} from '../../core/animations/fade-in.animation';
import {environment} from '../../../environments/environment';
import {AuthService} from '../../auth/auth.service';
import {SnackMessengerService} from '../../core/message-handling/snack-messenger.service';
import {PasswordValidator} from './validators/password.validator';
import {User} from '../shared/user.model';
import {UsernameValidator} from './validators/username.validator';
import {AngularFirestore} from 'angularfire2/firestore';
import {ErrorService} from '../../core/error-handling/error.service';
import {UserService} from '../shared/user.service';
import {Subscription} from 'rxjs/Subscription';

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
              private errorService: ErrorService,
              private afs: AngularFirestore,
              private userService: UserService) {
    this.newUserForm = fb.group({
      username: ['',
        [Validators.required,
          Validators.minLength(3)],
        // Third param is for async validators!
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
    // Grab user info from form
    const userModel = this.newUserForm.value as User;
    // Register new AuthUser
    this.authService.registerWithEmailAndPassword(userModel)
      .then(() => {
        userModel.uid = this.authService.getUID();
        userModel.username = this.authService.getUsername();
        // Add User to DB
        this.userService.updateUser(userModel)
          .then(() => {
            this.router.navigateByUrl('profile')
              .then(() => {
                this.snackService.displaySnack('User Created', 2);
              });
          });
      })
      .catch(error => {
        this.errorService.displayError(error.message);
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
      console.log('Unknown validation error: ' + this.username.errors);
      return '';
    }
  }

  getEmailErrorMessage(): string {
    if (this.email.errors.required) {
      return this.mustEnterValue;
    } else if (this.email.errors.email) {
      return 'Not a valid email';
    } else {
      console.log('Unknown validation error: ' + this.email.errors);
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
      console.log('Unknown validation error: ' + this.password.errors);
      return '';
    }
  }

  getPasswordMustMatchErrorMessage(): string {
    if (this.repeatPassword.errors.required) {
      return this.mustEnterValue;
    } else if (this.repeatPassword.errors.passwordsMustMatch) {
      return 'Passwords must match';
    } else {
      console.log('Unknown validation error: ' + this.repeatPassword.errors);
      return '';
    }

  }
}
