import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavbarComponent } from './navbar/navbar.component';
import {
  MatButtonModule, MatIconModule, MatListModule, MatSidenavModule, MatSnackBar, MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';
import {RouterModule} from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { SideNavComponent } from './side-nav/side-nav.component';
import { AutofocusDirective } from './directives/autofocus.directive';
import { SnackMessengerService } from './message-handling/snack-messenger.service';
import { ErrorService } from './error-handling/error.service';
import { FrannyCapsLockDirective } from './directives/franny-caps-lock.directive';
import { UnifiedMaterialModule } from '../unified-material.module';
import {DropZoneDirective} from './directives/drop-zone.directive';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UnifiedMaterialModule,
    MatToolbarModule,
    MatSidenavModule,
    MatSnackBarModule,
    UnifiedMaterialModule,
    FlexLayoutModule
  ],
  declarations: [
    PageNotFoundComponent,
    NavbarComponent,
    FooterComponent,
    SideNavComponent,
    AutofocusDirective,
    FrannyCapsLockDirective,
    DropZoneDirective],
  exports: [
    NavbarComponent,
    FooterComponent,
    SideNavComponent,
    AutofocusDirective,
    FrannyCapsLockDirective,
    DropZoneDirective
  ],
  providers: [SnackMessengerService, ErrorService]
})
export class CoreModule { }
