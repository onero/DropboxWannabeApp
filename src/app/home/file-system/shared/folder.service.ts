import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {FolderModel} from './folder.model';

@Injectable()
export class FolderService {

  private foldersPath = 'folders/';

  constructor(private afs: AngularFirestore) {
  }

  getFolder(uid: string) {
    return this.afs.doc<FolderModel>(this.foldersPath + uid).valueChanges();
  }
}
