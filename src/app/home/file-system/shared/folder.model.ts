import {FileModel} from './file.model';

export interface FolderModel {
  uid?: string;
  displayName?: string;
  files?: FileModel[];
  subFolders?: FolderModel[];
}
