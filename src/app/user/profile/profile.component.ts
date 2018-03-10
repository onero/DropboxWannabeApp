import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {User} from '../shared/user.model';
import {SnackMessengerService} from '../../core/message-handling/snack-messenger.service';
import {FileService} from '../../home/file-system/shared/file.service';
import {AngularFireUploadTask} from 'angularfire2/storage';
import {Subscription} from 'rxjs/Subscription';
import {UserService} from '../shared/user.service';
import {ErrorService} from '../../core/error-handling/error.service';
import {hoverAnimation} from '../../shared/animations/hover.animation';
import {ConfirmDeleteComponent} from '../../shared/dialogs/confirm-delete/confirm-delete.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [hoverAnimation]
})
export class ProfileComponent implements OnInit, OnDestroy {

  profileForm: FormGroup;
  user: User;
  userSubscription: Subscription;
  isHovering: boolean;
  profilePic: string;

  constructor(private fb: FormBuilder,
              private snack: SnackMessengerService,
              private errorService: ErrorService,
              private fileService: FileService,
              private userService: UserService,
              private dialog: MatDialog) {
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
        if (user.profilePicSrc !== null) {
          this.profilePic = user.profilePicSrc;
        }
        this.profileForm.patchValue(user);
      });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  hovering(isHovering: boolean) {
    this.isHovering = isHovering;
  }

  save() {
    const updatedUserModel = this.profileForm.value as User;
    updatedUserModel.uid = this.user.uid;
    this.userService.updateUser(updatedUserModel)
      .then(() => this.snack.displaySnack('User Updated', 2))
      .catch(error => this.errorService.displayError(error.message));
  }

  changePic(event) {
    if (event.toState === 'hoveringImage') {
      this.profilePic = '/assets/cloud_upload.svg';
    } else {
      this.profilePic = (this.user && this.user.profilePicSrc !== null) ?
        this.user.profilePicSrc :
        '/assets/unknownProfile.png';
    }
  }

  uploadNewImage(fileList: FileList) {
    if (fileList &&
      fileList.length === 1 &&
      ['image/jpeg', 'image/png'].indexOf(fileList.item(0).type) > -1) {
      const file = fileList.item(0);
      const uploadTask: AngularFireUploadTask = this.fileService.uploadUniqueFile(file, 'profile_photo');
      uploadTask.then(() => {
        uploadTask.downloadURL().subscribe(value => {
          this.user.profilePicSrc = value;
          this.userService.updateUser(this.user)
            .catch(reason => this.errorService.displayError(reason));
        });
      })
        .catch(reason => this.errorService.displayError(reason));
    } else {
      this.snack.displaySnack('You need to drop a single png or jpeg image', 2);
    }
  }

  deleteUser() {
    this.dialog.open(ConfirmDeleteComponent)
      .afterClosed()
      .subscribe(userResponse => {
        if (userResponse === 'yes') {
          // TODO ALH: Delete user files!
          // TODO ALH: Delete user from collection!
          // this.userService.deleteUser(this.user);
          //TODO ALH: Delete auth User
        }
      });
  }

  unchanged(): boolean {
    const model = this.profileForm.value as User;
    return model.firstName === this.user.firstName &&
      model.middleName === this.user.middleName &&
      model.lastName === this.user.lastName;
  }

}
