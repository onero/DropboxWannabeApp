import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../auth/auth.service';
import {User} from '../user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  currentUser: User;

  constructor(private authService: AuthService,
              private fb: FormBuilder) {
    this.profileForm = fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      firstName: '',
      middleName: '',
      lastName: ''
    });
  }

  ngOnInit() {
    this.currentUser = {
      email: this.authService.currentUser.email,
      profilePicSrc: this.authService.currentUser.photoURL
    };
  }

  save() {
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
    return (this.currentUser.profilePicSrc !== null) ?
      this.currentUser.profilePicSrc !== null :
      '/assets/unknownProfile.png';
  }
}
