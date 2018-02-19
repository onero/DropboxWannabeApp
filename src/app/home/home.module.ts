import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileSystemComponent } from './file-system/file-system.component';
import {CoreModule} from '../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    CoreModule
  ],
  declarations: [FileSystemComponent]
})
export class HomeModule { }
