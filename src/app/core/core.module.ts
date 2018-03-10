import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {NavbarComponent} from './navbar/navbar.component';
import {
  MatButtonModule, MatIconModule, MatListModule, MatSidenavModule, MatSnackBar, MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';
import {RouterModule} from '@angular/router';
import {FooterComponent} from './footer/footer.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SideNavComponent} from './side-nav/side-nav.component';
import {AutofocusDirective} from '../shared/directives/autofocus.directive';
import {SnackMessengerService} from './message-handling/snack-messenger.service';
import {ErrorService} from './error-handling/error.service';
import {FrannyCapsLockDirective} from '../shared/directives/franny-caps-lock.directive';
import {UnifiedMaterialModule} from '../shared/styling/unified-material.module';
import {DropZoneDirective} from '../shared/directives/drop-zone.directive';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    UnifiedMaterialModule,
    MatToolbarModule,
    MatSidenavModule,
    MatSnackBarModule
  ],
  declarations: [
    PageNotFoundComponent,
    NavbarComponent,
    FooterComponent,
    SideNavComponent],
  exports: [
    NavbarComponent,
    FooterComponent,
    SideNavComponent
  ],
  providers: [SnackMessengerService, ErrorService]
})
export class CoreModule {
}
