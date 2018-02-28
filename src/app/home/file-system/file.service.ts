import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';

interface File {
  title: string;
}

@Injectable()
export class FileService {

  files: AngularFirestoreCollection<File>;

  constructor(private afs: AngularFirestore) {
    this.files = this.afs.collection('files');
  }

  getFiles() {
    return this.files.valueChanges();
  }

  getFileById(id: number) {
    return this.afs.doc('files/' + id).valueChanges();
  }

  addFile(title: string) {
   this.files.add({ title: title});
  }

}
