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
    RouterModule
  ],
  declarations: [ProfileComponent, NewUserComponent]
})
export class UserModule { }
