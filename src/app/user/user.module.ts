import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { NewUserComponent } from './new-user/new-user.component';
import {
  MatButtonModule, MatCardModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule,
  MatListModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {CoreModule} from '../core/core.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AngularFireStorageModule} from 'angularfire2/storage';
import { UserService } from './shared/user.service';
import {AngularFirestoreModule} from 'angularfire2/firestore';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatGridListModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    FlexLayoutModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    RouterModule
  ],
  declarations: [ProfileComponent, NewUserComponent],
  providers: [UserService]
})
export class UserModule { }
