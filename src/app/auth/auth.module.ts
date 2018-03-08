import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {CoreModule} from '../core/core.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthGuard} from './shared/auth.guard';
import {AuthService} from './shared/auth.service';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {LoggedInGuard} from './shared/logged-in.guard';
import {FlexLayoutModule} from '@angular/flex-layout';
import {UnifiedMaterialModule} from '../unified-material.module';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    UnifiedMaterialModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FlexLayoutModule
  ],
  declarations: [LoginComponent],
  providers: [AuthGuard, AuthService, LoggedInGuard]
})
export class AuthModule { }
