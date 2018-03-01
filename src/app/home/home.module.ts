import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FileSystemComponent} from './file-system/file-system.component';
import {CoreModule} from '../core/core.module';
import {FileService} from './file-system/shared/file.service';
import {MatButtonModule, MatCardModule, MatGridListModule, MatIconModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AngularFireStorageModule} from 'angularfire2/storage';
import {DropZoneDirective} from './file-system/shared/drop-zone.directive';
import { FileSizePipe } from './file-system/shared/file-size.pipe';
import {AngularFirestoreModule} from 'angularfire2/firestore';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    MatCardModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule
  ],
  declarations: [FileSystemComponent, DropZoneDirective, FileSizePipe],
  providers: [FileService]
})
export class HomeModule { }
