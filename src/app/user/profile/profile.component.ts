import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../auth/auth.service';
import {User} from '../user.model';
import {SnackMessengerService} from '../../core/message-handling/snack-messenger.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  currentUser: User;

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private snack: SnackMessengerService) {
    this.profileForm = fb.group({
      firstName: '',
      middleName: '',
      lastName: ''
    });
  }

  get username() {
    return this.profileForm.get('username');
  }

  ngOnInit() {
    this.authService.getUser()
      .subscribe(user => {
        this.currentUser = user;
        this.profileForm.patchValue(this.currentUser);
      });
  }

  save() {
    const model = this.profileForm.value;
    this.authService.updateUser(model)
      .then(() => {
        this.snack.displaySnack('User Updated!', 2);
      });
  }

  fcErr(fc: string, ec: string, pre?: string[]): boolean {
    if (pre && pre.length > 0) {
      for (let i = 0; i < pre.length; i++) {
        if (this.profileForm.get(fc).hasError(pre[i])) {
          return false;
        }
      }
    }
    return this.profileForm.get(fc).hasError(ec);
  }

  getProfileSrc() {
    if (this.currentUser) {
      if (this.currentUser.profilePicSrc) {
        return this.currentUser.profilePicSrc;
      } else {
        return '/assets/unknownProfile.png';
      }
    }
  }
}
