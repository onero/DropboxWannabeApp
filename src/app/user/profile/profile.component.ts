import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {User} from '../shared/user.model';
import {SnackMessengerService} from '../../core/message-handling/snack-messenger.service';
import {StorageService} from '../../home/file-system/shared/storage.service';
import {AngularFireUploadTask} from 'angularfire2/storage';
import {Subscription} from 'rxjs/Subscription';
import {UserService} from '../shared/user.service';
import {ErrorService} from '../../core/error-handling/error.service';
import {hoverAnimation} from '../../shared/animations/hover.animation';
import {ConfirmDeleteComponent} from '../../shared/dialogs/confirm-delete/confirm-delete.component';
import {MatDialog} from '@angular/material';
import {AuthService} from '../../auth/shared/auth.service';

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
  srcLoaded: boolean;

  constructor(private fb: FormBuilder,
              private snack: SnackMessengerService,
              private errorService: ErrorService,
              private storageService: StorageService,
              private userService: UserService,
              private authService: AuthService,
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
        if (user.profilePicSrc) {
          this.profilePic = user.profilePicSrc;
        } else {
          this.profilePic = 'assets/unknownProfile.png';
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

  uploadNewImage(fileList: FileList) {
    if (fileList &&
      fileList.length === 1 &&
      ['image/jpeg', 'image/png'].indexOf(fileList.item(0).type) > -1) {
      this.srcLoaded = false;
      const file = fileList.item(0);
      const uploadTask: AngularFireUploadTask = this.storageService.uploadUniqueFile(file, 'profile_photo');
      uploadTask.then(() => {
        uploadTask.downloadURL().subscribe(value => {
          this.user.profilePicSrc = value;
          this.userService.updateUser(this.user)
            .then(() => {
              this.hovering(false);
            })
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
          this.authService.deleteAuthUser();
          localStorage.clear();

          // TODO ALH: Update according to old implementation, then delete!
          // // Delete user profile pic
          // this.storageService.deleteProfilePic(this.user);
          // // Delete all user files
          // const userFileCollection = this.userService.getUserCollection();
          // userFileCollection.valueChanges()
          //   .subscribe(files => {
          //     files.forEach(file => {
          //       this.storageService.deleteFileByUrl(file.path);
          //     });
          //     // Unsubscribe to avoid errors
          //     this.userSubscription.unsubscribe();
          //     // Delete user uploads from collection
          //     this.userService.getUserCollection()
          //       .snapshotChanges()
          //       .subscribe(uploads => {
          //         uploads.forEach(doc => {
          //           doc.payload.doc.ref.delete();
          //         });
          //         // Delete user reference from DB
          //         this.userService.deleteUser(this.user)
          //           .then(() => {
          //             // Delete actual authUser
          //             this.authService.deleteAuthUser();
          //             localStorage.clear();
          //           });
          //       });
          //   });
        }
      });
  }

  unchanged(): boolean {
    const model = this.profileForm.value as User;
    if (!model.firstName) {
      return true;
    }
    return model.firstName === this.user.firstName &&
      model.middleName === this.user.middleName &&
      model.lastName === this.user.lastName;
  }

}
