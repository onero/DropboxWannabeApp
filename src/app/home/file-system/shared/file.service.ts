import {Injectable, OnInit} from '@angular/core';
import {AngularFireStorage, AngularFireUploadTask} from 'angularfire2/storage';
import {AuthService} from '../../../auth/shared/auth.service';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import {SnackMessengerService} from '../../../core/message-handling/snack-messenger.service';

@Injectable()
export class FileService {

  private filesCollectionPath = 'files';

  private userUploadsPath = 'uploads';
  private username;

  constructor(private storage: AngularFireStorage,
              private authService: AuthService,
              private afs: AngularFirestore,
              private snack: SnackMessengerService) {
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

  uploadUniqueFile(file: File, specificFileName?: string): AngularFireUploadTask {
    const username = this.authService.getUsername();
    const path = `${username}/${specificFileName || file.name}`;
    return this.storage.upload(path, file);
  }

  updateCollection(path: string) {
    const userId = this.authService.getUID();
    const item = {userId, path};
    this.getCollection().add(item)
      .catch(reason => console.log(reason));
  }

  deleteFileByPath(path: string) {
    this.afs.collection(this.filesCollectionPath)
      .doc(this.username).collection(this.userUploadsPath, ref => ref.where('path', '==', path))
      .snapshotChanges()
      .subscribe(result => {
        result.map(info => {
          info.payload.doc.ref.delete()
            .then(() => this.snack.displaySnack('Deleted!', 2));
        });
      });
    return null;
  }

}
