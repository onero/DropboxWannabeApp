import {Injectable, OnInit} from '@angular/core';
import {AngularFireStorage, AngularFireUploadTask} from 'angularfire2/storage';
import {AuthService} from '../../../auth/auth.service';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class FileService {

  private filesCollectionPath = 'files';

  private userUploadsPath = 'uploads';
  private username;

  constructor(private storage: AngularFireStorage,
              private authService: AuthService,
              private afs: AngularFirestore) {
  }

  getCollection(): AngularFirestoreCollection<any> {
    this.username = this.authService.getUsername();
    return this.afs.collection(this.filesCollectionPath)
      .doc(this.username).collection(this.userUploadsPath);
  }

  uploadFile(file: File): AngularFireUploadTask {
    const username = this.authService.getUsername();
    const path = `${username}/${new Date().getTime()}_${file.name}`;
    return this.storage.upload(path, file);
  }

  updateCollection(path: string) {
    const userId = this.authService.getUID();
    const item = {userId, path};
    this.getCollection().add(item)
      .then(() => console.log('Updated!'));
  }

}
