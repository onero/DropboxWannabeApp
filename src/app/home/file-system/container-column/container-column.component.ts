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
        this.addFolder(rootFolder);
      });
  }

  addFolder(folder: FolderModel) {
    this.file = null;
    const folderAlreadyDisplayed = this.folders.find(displayedFolder => displayedFolder.uid === folder.uid);
    if (!folderAlreadyDisplayed) {
      // Make sure only 1 folder from current directory is shown
      if (this.folders.length > 1) {
        this.folders.pop();
      }
      this.folders.push(folder);
    }
  }

  selectFile(file: FileModel) {
    this.file = file;
  }
}
