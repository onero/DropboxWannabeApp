import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {
  MatButtonModule, MatCardModule, MatFormFieldModule, MatGridListModule, MatInputModule,
  MatListModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatGridListModule,
    MatListModule,
    MatButtonModule,
    MatCardModule
  ],
  declarations: [LoginComponent]
})
export class AuthModule { }
