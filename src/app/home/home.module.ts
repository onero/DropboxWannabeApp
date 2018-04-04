import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FileSystemComponent} from './file-system/file-system.component';
import {CoreModule} from '../core/core.module';
import {StorageService} from './file-system/shared/storage.service';
import {MatCardModule, MatGridListModule} from '@angular/material';
import {AngularFireStorageModule} from 'angularfire2/storage';
import {FileSizePipe} from './file-system/shared/file-size.pipe';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {NgxGalleryModule} from 'ngx-gallery';
import {ImageGalleryComponent} from './file-system/image-gallery/image-gallery.component';
import {SharedModule} from '../shared/shared.module';
import {FileService} from './file-system/shared/file.service';
import {FolderService} from './file-system/shared/folder.service';
import {FolderComponent} from './file-system/folder/folder.component';
import {ContainerColumnComponent} from './file-system/container-column/container-column.component';
import {FileColumnComponent} from './file-system/file/file-column.component';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    MatCardModule,
    MatGridListModule,
    NgxGalleryModule
  ],
  declarations: [
    FileSystemComponent,
    FileSizePipe,
    ImageGalleryComponent,
    FolderComponent,
    ContainerColumnComponent,
    FileColumnComponent],
  providers: [StorageService, FileService, FolderService]
})
export class HomeModule {
}
