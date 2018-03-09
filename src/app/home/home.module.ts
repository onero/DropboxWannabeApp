import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FileSystemComponent} from './file-system/file-system.component';
import {CoreModule} from '../core/core.module';
import {FileService} from './file-system/shared/file.service';
import {MatButtonModule, MatCardModule, MatGridListModule, MatIconModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AngularFireStorageModule} from 'angularfire2/storage';
import {DropZoneDirective} from '../core/directives/drop-zone.directive';
import { FileSizePipe } from './file-system/shared/file-size.pipe';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {NgxGalleryModule} from 'ngx-gallery';
import { ImageGalleryComponent } from './file-system/image-gallery/image-gallery.component';
import { UploadZoneComponent } from './file-system/upload-zone/upload-zone.component';
import {Ng4LoadingSpinnerModule} from 'ng4-loading-spinner';
import {UnifiedMaterialModule} from '../unified-material.module';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    MatCardModule,
    MatGridListModule,
    UnifiedMaterialModule,
    NgxGalleryModule,
    FlexLayoutModule
  ],
  declarations: [FileSystemComponent, FileSizePipe, ImageGalleryComponent, UploadZoneComponent],
  providers: [FileService]
})
export class HomeModule { }
