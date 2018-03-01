import {Component, OnInit} from '@angular/core';
import {FileService} from './shared/file.service';
import {Observable} from 'rxjs/Observable';
import {AngularFireUploadTask} from 'angularfire2/storage';

@Component({
  selector: 'app-file-system',
  templateUrl: './file-system.component.html',
  styleUrls: ['./file-system.component.scss']
})
export class FileSystemComponent implements OnInit {

  // Progress monitoring
  uploadPercent: Observable<number>;
  snapshot: Observable<any>;
  // Download URL
  downloadURL: Observable<string>;
  // State for dropzone CSS toggling
  isHovering: boolean;
  task: AngularFireUploadTask;

  files: Observable<any[]>;

  constructor(private fileService: FileService) { }

  ngOnInit() {
    this.files = this.fileService.files$;
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  startUpload(event: FileList) {
    const file = event.item(0);
    this.task = this.fileService.uploadFile(file);

    this.task.then(() => {
      let urlString: string;
      this.downloadURL.subscribe(value => {
        urlString = value;
        this.fileService.updateCollection(urlString);
      });
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

  isUploading(snapshot) {
    return snapshot.state === 'running' &&
      snapshot.bytesTransferred < snapshot.totalBytes;
  }
}
