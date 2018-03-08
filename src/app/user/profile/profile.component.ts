import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../auth/auth.service';
import {User} from '../shared/user.model';
import {SnackMessengerService} from '../../core/message-handling/snack-messenger.service';
import {FileService} from '../../home/file-system/shared/file.service';
import {AngularFireUploadTask} from 'angularfire2/storage';
import {Subscription} from 'rxjs/Subscription';
import {UserService} from '../shared/user.service';
import {ErrorService} from '../../core/error-handling/error.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  profileForm: FormGroup;
  user: User;
  userSubscription: Subscription;

  constructor(private fb: FormBuilder,
              private snack: SnackMessengerService,
              private errorService: ErrorService,
              private fileService: FileService,
              private userService: UserService) {
    this.profileForm = fb.group({
      firstName: '',
      middleName: '',
      lastName: ''
    });
  }

  ngOnInit() {
    this.userSubscription = this.userService.getUser()
      .subscribe(user => {
        this.user = user;
        this.profileForm.patchValue(user);
      });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
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
      // this.authService.updateFireStoreUsersCollection(updatedUser);
    });
  }

  save() {
    const updatedUserModel = this.profileForm.value as User;
    updatedUserModel.uid = this.user.uid;
    this.userService.updateUser(updatedUserModel)
      .then(() => this.snack.displaySnack('User Created', 2))
      .catch(error => this.errorService.displayError(error.message));
  }

  getProfileSrc() {
    if (this.user) {
      if (this.user.profilePicSrc) {
        return this.user.profilePicSrc;
      } else {
        return '/assets/unknownProfile.png';
      }
    }
  }

  deleteUser() {
    // TODO ALH: Fix!
    // this.authService.deleteUser();
  }
}
