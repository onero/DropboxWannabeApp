import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavbarComponent } from './navbar/navbar.component';
import {MatButtonModule, MatIconModule, MatSidenavModule, MatToolbarModule} from '@angular/material';
import {RouterModule} from '@angular/router';
import { BottomNavComponent } from './bottom-nav/bottom-nav.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { SideNavComponent } from './side-nav/side-nav.component';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    MatSidenavModule
  ],
  declarations: [PageNotFoundComponent, NavbarComponent, BottomNavComponent, SideNavComponent],
  exports: [
    NavbarComponent,
    BottomNavComponent,
    SideNavComponent
  ]
})
export class CoreModule { }
