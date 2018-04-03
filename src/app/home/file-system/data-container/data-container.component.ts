import {Component, OnInit} from '@angular/core';
import {FolderModel} from '../shared/folder.model';
import {FileModel} from '../shared/file.model';
import {FolderService} from '../shared/folder.service';
import {AuthService} from '../../../auth/shared/auth.service';

@Component({
  selector: 'app-data-container',
  templateUrl: './data-container.component.html',
  styleUrls: ['./data-container.component.scss']
})
export class DataContainerComponent implements OnInit {
  folders: FolderModel[] = [];
  file: FileModel;

  constructor(private authService: AuthService,
              private folderService: FolderService) {
  }

  ngOnInit() {
    const uid = this.authService.getUID();
    this.folderService.getRootFolder(uid)
      .subscribe(folder => {
        const rootFolder = folder as FolderModel;
        this.addFolder(rootFolder);
      });
  }

  addFolder(folder: FolderModel) {
    const folderAlreadyDisplayed = this.folders.find(displayedFolder => displayedFolder.uid === folder.uid);
    if (!folderAlreadyDisplayed) {
      this.folders.push(folder);
    }
  }

  selectFile(file: FileModel) {
    this.file = file;
  }
}
