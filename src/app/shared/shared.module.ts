import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DropZoneDirective} from './directives/drop-zone.directive';
import {AutofocusDirective} from './directives/autofocus.directive';
import {FrannyCapsLockDirective} from './directives/franny-caps-lock.directive';
import {FlexLayoutModule} from '@angular/flex-layout';
import {UnifiedMaterialModule} from './styling/unified-material.module';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    UnifiedMaterialModule
  ],
  declarations: [
    AutofocusDirective,
    FrannyCapsLockDirective,
    DropZoneDirective
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
