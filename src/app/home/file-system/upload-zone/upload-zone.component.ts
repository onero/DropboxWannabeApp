import { Component, OnInit } from '@angular/core';
import {AngularFireUploadTask} from 'angularfire2/storage';
import {Observable} from 'rxjs/Observable';
import {FileService} from '../shared/file.service';
import {SnackMessengerService} from '../../../core/message-handling/snack-messenger.service';
import {ErrorService} from '../../../core/error-handling/error.service';

@Component({
  selector: 'app-upload-zone',
  templateUrl: './upload-zone.component.html',
  styleUrls: ['./upload-zone.component.scss']
})
export class UploadZoneComponent implements OnInit {

  // Progress monitoring
  uploadPercent: Observable<number>;
  snapshot: Observable<any>;
  // Download URL
  downloadURL: Observable<string>;
  // State for dropzone CSS toggling
  isHovering: boolean;
  task: AngularFireUploadTask;
  uploadIsActive = false;



  constructor(private fileService: FileService,
              private errorService: ErrorService) {}

  ngOnInit() {
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  startUpload(event: FileList) {
    const file = event.item(0);
    this.task = this.fileService.uploadFile(file);
    this.uploadIsActive = true;

    this.task.then(() => {
      let urlString: string;
      this.downloadURL.subscribe(value => {
        urlString = value;
        this.fileService.updateCollection(urlString);
        this.uploadIsActive = false;
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
