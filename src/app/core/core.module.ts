import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavbarComponent } from './navbar/navbar.component';
import {MatButtonModule, MatToolbarModule} from '@angular/material';
import {RouterModule} from '@angular/router';
import { BottomNavComponent } from './bottom-nav/bottom-nav.component';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    RouterModule,
    MatButtonModule,
    FlexLayoutModule
  ],
  declarations: [PageNotFoundComponent, NavbarComponent, BottomNavComponent],
  exports: [
    NavbarComponent,
    BottomNavComponent
  ]
})
export class CoreModule { }
