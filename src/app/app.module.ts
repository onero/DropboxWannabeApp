import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { UserModule } from './user/user.module';
import { CoreModule } from './core/core.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    AppRoutingModule,
    AuthModule,
    HomeModule,
    UserModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
