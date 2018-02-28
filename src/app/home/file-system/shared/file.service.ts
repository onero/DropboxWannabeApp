import {Injectable} from '@angular/core';
import {AngularFireStorage, AngularFireUploadTask} from 'angularfire2/storage';

@Injectable()
export class FileService {

  userPath = 'adamino';

  // collection: AngularFirestoreCollection<File>;
  // files$: Observable<File[]>;


  constructor(private storage: AngularFireStorage) {
    // this.collection = this.afs.collection('files');
    // this.files$ = this.collection.valueChanges();
  }

  getFiles() {
    // return this.files$;
  }

  uploadFile(file): AngularFireUploadTask {
    return this.storage.upload(this.userPath, file);
  }

}
