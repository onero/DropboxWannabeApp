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
import {NgxGalleryModule} from 'ngx-gallery';
import { ImageGalleryComponent } from './file-system/image-gallery/image-gallery.component';

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
    MatGridListModule,
    NgxGalleryModule
  ],
  declarations: [FileSystemComponent, DropZoneDirective, FileSizePipe, ImageGalleryComponent],
  providers: [FileService]
})
export class HomeModule { }
