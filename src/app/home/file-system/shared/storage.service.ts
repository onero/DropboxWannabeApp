import {Injectable, OnInit} from '@angular/core';
import {AngularFireStorage, AngularFireUploadTask} from 'angularfire2/storage';
import {AuthService} from '../../../auth/shared/auth.service';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import {SnackMessengerService} from '../../../core/message-handling/snack-messenger.service';

@Injectable()
export class StorageService {

  constructor(private storage: AngularFireStorage,
              private authService: AuthService) {
  }

  uploadFile(file: File): AngularFireUploadTask {
    const username = this.authService.getUsername();
    const path = `${username}/${new Date().getTime()}_${file.name}`;
    return this.storage.upload(path, file);
  }

  uploadUniqueFile(file: File, specificFileName?: string): AngularFireUploadTask {
    const username = this.authService.getUsername();
    const path = `${username}/${specificFileName || file.name}`;
    return this.storage.upload(path, file);
  }

  deleteFileByPath(path: string): Promise<any> {
    return this.storage.storage.refFromURL(path).delete();
  }

}
