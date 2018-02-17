import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatGridListModule, MatIconModule, MatInputModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatCheckboxModule,
    MatGridListModule,
    MatInputModule,
    MatIconModule,
    BrowserAnimationsModule
  ],
  declarations: [LoginComponent]
})
export class AuthModule { }
