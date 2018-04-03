export interface FolderModel {
  uid: string;
  displayName: string;
  subFolders?: FolderModel[];
}
