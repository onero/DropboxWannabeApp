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

  addFileToFolder(uid: string, updatedArray: FileModel[]) {
    return this.afs.doc<FolderModel>(this.foldersPath + uid)
      .set({
        files: updatedArray
      }, {merge: true});
  }

  createSubFolder(parentFolder: FolderModel, subFolderName: string) {
    const newSubFolder: FolderModel = {
      displayName: subFolderName
    };
    // create subfolder as new document
    return this.afs.collection(this.foldersPath).add(newSubFolder)
      .then(result => {
        newSubFolder.uid = result.id;
        // Add uid to new subFolder
        result.set(newSubFolder, {merge: true});
        // Check for subFolders
        if (!parentFolder.subFolders) {
          parentFolder.subFolders = [];
        }
        parentFolder.subFolders.push(newSubFolder);
        // Add subFolder to ParentFolder
        return this.afs.doc<FolderModel>(this.foldersPath + parentFolder.uid)
          .set({
            subFolders: parentFolder.subFolders
          }, {merge: true});
      });
  }
}
