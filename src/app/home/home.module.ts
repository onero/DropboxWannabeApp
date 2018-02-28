import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileSystemComponent } from './file-system/file-system.component';
import {CoreModule} from '../core/core.module';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import { FileService } from './file-system/shared/file.service';
import {MatButtonModule, MatCardModule, MatInputModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AngularFireStorageModule} from 'angularfire2/storage';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    AngularFireStorageModule,
    MatCardModule,
    FlexLayoutModule,
    MatButtonModule
  ],
  declarations: [FileSystemComponent],
  providers: [FileService]
})
export class HomeModule { }
