import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DropZoneDirective} from './directives/drop-zone.directive';
import {AutofocusDirective} from './directives/autofocus.directive';
import {FrannyCapsLockDirective} from './directives/franny-caps-lock.directive';
import {FlexLayoutModule} from '@angular/flex-layout';
import {UnifiedMaterialModule} from './styling/unified-material.module';
import { ConfirmDeleteComponent } from './dialogs/confirm-delete/confirm-delete.component';
import { NewFolderComponent } from './dialogs/new-folder/new-folder.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    UnifiedMaterialModule
  ],
  declarations: [
    AutofocusDirective,
    FrannyCapsLockDirective,
    DropZoneDirective,
    ConfirmDeleteComponent,
    NewFolderComponent
  ],
  entryComponents: [
    ConfirmDeleteComponent,
    NewFolderComponent
  ],
  exports: [
    AutofocusDirective,
    FrannyCapsLockDirective,
    DropZoneDirective,
    FlexLayoutModule,
    UnifiedMaterialModule
  ]
})
export class SharedModule { }
