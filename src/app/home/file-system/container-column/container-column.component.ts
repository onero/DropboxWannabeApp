import {Component, OnInit} from '@angular/core';
import {FolderModel} from '../shared/folder.model';
import {FileModel} from '../shared/file.model';
import {FolderService} from '../shared/folder.service';
import {AuthService} from '../../../auth/shared/auth.service';

@Component({
  selector: 'app-container-column',
  templateUrl: './container-column.component.html',
  styleUrls: ['./container-column.component.scss']
})
export class ContainerColumnComponent implements OnInit {
  folders: FolderModel[] = [];
  file: FileModel;

  constructor(private authService: AuthService,
              private folderService: FolderService) {
  }

  ngOnInit() {
    const uid = this.authService.getUID();
    this.folderService.getFolder(uid)
      .subscribe(folder => {
        const rootFolder = folder as FolderModel;
        this.folders.push(rootFolder);
      });
  }

  selectFolder(newFolder: FolderModel) {
    this.file = null;
    const notFound = -1;
    const folderIndex = this.folders.findIndex(folder => {
      const folderModel = folder as FolderModel;
      if (folderModel.subFolders) {
        const folderFound = folderModel.subFolders.find(subFolder => subFolder.uid === newFolder.uid);
        if (folderFound) {
          return true;
        }
      }
    });
    if (folderIndex !== notFound) {
      this.folders.splice(folderIndex + 1);
    }
    this.folders.push(newFolder);
  }

  selectFile(file: FileModel) {
    const folderWithFileIndex = this.folders.findIndex(folder => {
      const folderModel = folder as FolderModel;
      if (folderModel.files) {
        const fileInFolder = folderModel.files.find(folderFile => folderFile.fileName === file.fileName);
        if (fileInFolder) {
          return true;
        }
      }
    });
    this.folders.splice(folderWithFileIndex + 1);
    this.file = file;
  }
}
