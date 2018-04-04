import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {FolderModel} from './folder.model';
import {FileModel} from './file.model';

@Injectable()
export class FolderService {

  private foldersPath = 'folders/';

  constructor(private afs: AngularFirestore) {
  }

  getFolder(uid: string) {
    return this.afs.doc<FolderModel>(this.foldersPath + uid).valueChanges();
  }

  addFileToFolder(uid: string, upatedArray: FileModel[]) {
    return this.afs.doc<FolderModel>(this.foldersPath + uid)
      .set({
        files: upatedArray
      }, {merge: true});
  }
}
