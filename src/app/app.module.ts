import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthModule} from './auth/auth.module';
import {HomeModule} from './home/home.module';
import {UserModule} from './user/user.module';
import {CoreModule} from './core/core.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AppRoutes} from './app.routing';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../environments/environment';
import {Ng4LoadingSpinnerModule} from 'ng4-loading-spinner';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {UnifiedMaterialModule} from './unified-material.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutes,
    BrowserAnimationsModule,
    AuthModule,
    HomeModule,
    UserModule,
    CoreModule,
    UnifiedMaterialModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    Ng4LoadingSpinnerModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
