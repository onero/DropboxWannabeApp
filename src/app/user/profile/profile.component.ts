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
    this.authService.currentUser
      .subscribe(user => {
        this.currentUser = user;
        this.profileForm.patchValue(this.currentUser);
      });
  }

  save() {
    const model = this.profileForm.value;
    const updatedUser: User = {
      uid: this.authService.getUID(),
      firstName: model.firstName,
      middleName: model.middleName,
      lastName: model.lastName
    };
    this.authService.updateFireStoreUsersCollection(updatedUser)
      .then(() => {
        this.snack.displaySnack('User Updated!', 2);
      });
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
