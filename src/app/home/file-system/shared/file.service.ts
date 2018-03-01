import {Injectable} from '@angular/core';
import {AngularFireStorage, AngularFireUploadTask} from 'angularfire2/storage';
import {AuthService} from '../../../auth/auth.service';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class FileService {

  collection: AngularFirestoreCollection<any>;
  files$: Observable<any[]>;

  private filesCollectionPath = 'files';

  private userUploadsPath = 'uploads';

  constructor(private storage: AngularFireStorage,
              private authService: AuthService,
              private afs: AngularFirestore) {
    const currentUserName = this.authService.getCurrentUserHandle();

    this.collection = this.afs.collection(this.filesCollectionPath)
      .doc(currentUserName).collection(this.userUploadsPath);
    this.files$ = this.collection.valueChanges();
  }

  uploadFile(file: File): AngularFireUploadTask {
    const username = this.authService.getCurrentUserHandle();
    const path = `${username}/${new Date().getTime()}_${file.name}`;
    return this.storage.upload(path, file);
  }

  updateCollection(path: string) {
    const userId = this.authService.getUserId();
    const item = { userId, path };
    this.collection.add(item)
      .then(() => console.log('Updated!'));
  }

}
