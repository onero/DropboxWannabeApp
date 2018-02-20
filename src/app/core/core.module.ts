import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavbarComponent } from './navbar/navbar.component';
import {MatButtonModule, MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule} from '@angular/material';
import {RouterModule} from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { SideNavComponent } from './side-nav/side-nav.component';
import { AutofocusDirective } from './autofocus.directive';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule
  ],
  declarations: [PageNotFoundComponent, NavbarComponent, FooterComponent, SideNavComponent, AutofocusDirective],
  exports: [
    NavbarComponent,
    FooterComponent,
    SideNavComponent,
    AutofocusDirective
  ]
})
export class CoreModule { }
