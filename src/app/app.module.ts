import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material';
import {AuthModule} from './auth/auth.module';
import {HomeModule} from './home/home.module';
import {UserModule} from './user/user.module';
import {CoreModule} from './core/core.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AppRoutes} from './app.routing';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../environments/environment';
import {Ng4LoadingSpinnerModule} from 'ng4-loading-spinner';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutes,
    BrowserAnimationsModule,
    MatButtonModule,
    AuthModule,
    HomeModule,
    UserModule,
    CoreModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    Ng4LoadingSpinnerModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
