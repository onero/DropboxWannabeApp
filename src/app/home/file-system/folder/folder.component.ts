import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FolderModel} from '../shared/folder.model';
import {FileModel} from '../shared/file.model';
import {FolderService} from '../shared/folder.service';
import {AngularFireUploadTask} from 'angularfire2/storage';
import {Observable} from 'rxjs/Observable';
import {StorageService} from '../shared/storage.service';
import {ErrorService} from '../../../core/error-handling/error.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss']
})
export class FolderComponent implements OnInit {
  // Progress monitoring
  uploadPercent: Observable<number>;
  snapshot: Observable<any>;
  // Download URL
  downloadURL: Observable<string>;
  // State for dropzone CSS toggling
  isHovering: boolean;
  task: AngularFireUploadTask;
  uploadIsActive = false;

  @Input()
  currentFolder: FolderModel;

  @Output()
  folderClicked = new EventEmitter<FolderModel>();

  @Output()
  fileClicked = new EventEmitter<FileModel>();

  constructor(private folderService: FolderService,
              private storageService: StorageService,
              private errorService: ErrorService) {
  }

  ngOnInit() {
  }

  onFileClicked(file: FileModel) {
    this.fileClicked.emit(file);
  }

  onSubFolderClicked(folder: FolderModel) {
    this.folderService.getFolder(folder.uid)
      .subscribe(folderDb => {
        this.folderClicked.emit(folderDb);
      });
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  startUpload(fileList: FileList) {
    const file = fileList.item(0);
    this.task = this.storageService.uploadFile(file);
    this.uploadIsActive = true;

    this.task.then(() => {
      this.downloadURL.subscribe(url => {
        const fileForDB: FileModel = {
          fileName: file.name,
          type: file.type,
          url: url,
          created: file.lastModifiedDate,
          size: file.size,
          displayName: file.name
        };
        if (!this.currentFolder.files) {
          this.currentFolder.files = [];
        }
        this.currentFolder.files.push(fileForDB);
        this.folderService.addFileToFolder(this.currentFolder.uid, this.currentFolder.files);
        // TODO ALH: Add file to DB files/
        // this.userService.updateUserCollection(url);
        this.uploadIsActive = false;
        this.isHovering = false;
      });
    })
      .catch(error => {
        this.errorService.displayError(error.message);
      });

// Progress monitoring
    this.uploadPercent = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges();
    this.downloadURL = this.task.downloadURL();
  }

  pause() {
    this.task.pause();
  }

  resume() {
    this.task.resume();
  }

  cancel() {
    this.task.cancel();
    this.uploadPercent = null;
    this.snapshot = null;
    this.downloadURL = null;
  }

  isUploading(snapshot): boolean {
    if (snapshot === null) {
      return false;
    }
    return snapshot.state === 'running' &&
      snapshot.bytesTransferred < snapshot.totalBytes;
  }

  isPaused(snapshot): boolean {
    if (snapshot === null) {
      return false;
    }
    return snapshot.state === 'paused';
  }

}
