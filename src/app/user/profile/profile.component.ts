import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../auth/auth.service';
import {User} from '../user.model';
import {SnackMessengerService} from '../../core/message-handling/snack-messenger.service';
import {FileService} from '../../home/file-system/shared/file.service';
import {AngularFireUploadTask} from 'angularfire2/storage';

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
              private snack: SnackMessengerService,
              private fileService: FileService) {
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

updateProfilePic(event: FileList) {
  const file = event.item(0);
  const uploadTask: AngularFireUploadTask = this.fileService.uploadFile(file);
  let uploadUrl: string;
  uploadTask.downloadURL().map(value => uploadUrl = value);
  uploadTask.then(() => {
    const updatedUser: User = {
      profilePicSrc: uploadUrl
    };
    this.authService.updateFireStoreUsersCollection(updatedUser);
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

  deleteUser() {
    this.authService.deleteUser();
  }
}
