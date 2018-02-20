import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { NewUserComponent } from './new-user/new-user.component';
import {
  MatButtonModule, MatCardModule, MatFormFieldModule, MatGridListModule, MatInputModule,
  MatListModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {CoreModule} from '../core/core.module';

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
    RouterModule
  ],
  declarations: [ProfileComponent, NewUserComponent]
})
export class UserModule { }
