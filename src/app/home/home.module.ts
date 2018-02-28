import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileSystemComponent } from './file-system/file-system.component';
import {CoreModule} from '../core/core.module';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import { FileService } from './file-system/file.service';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    AngularFirestoreModule
  ],
  declarations: [FileSystemComponent],
  providers: [FileService]
})
export class HomeModule { }
