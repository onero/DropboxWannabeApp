import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {
  MatButtonModule, MatCardModule, MatFormFieldModule, MatGridListModule, MatInputModule,
  MatListModule, MatSnackBarModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {CoreModule} from '../core/core.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import {AngularFireAuthModule} from 'angularfire2/auth';

@NgModule({
  imports: [
    CommonModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
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
  declarations: [LoginComponent],
  providers: [AuthGuard, AuthService]
})
export class AuthModule { }
