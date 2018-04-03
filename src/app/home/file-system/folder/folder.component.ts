import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FolderModel} from '../shared/folder.model';
import {FileModel} from '../shared/file.model';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss']
})
export class FolderComponent implements OnInit {
  @Input()
  currentFolder: FolderModel;

  @Output()
  folderClicked = new EventEmitter<FolderModel>();

  @Output()
  fileClicked = new EventEmitter<FileModel>();

  constructor() {
  }

  ngOnInit() {
  }

  onFileClicked(file: FileModel) {
    // TODO: ALH: Consider file service to get folder
    this.fileClicked.emit(file);
  }

  onFolderClicked(folder: FolderModel) {
    // TODO: ALH: Consider folder service to get folder
    // this.folderService.getFolder(folder.uid)
    //   .first().subscribe(folderDb => {
    //   this.addFolder(folderDb);
    // });
    const folderToAdd: FolderModel = {
      uid: '2',
      displayName: folder.displayName,
      files: [
        {
          uid: '2',
          url: 'https://firebasestorage.googleapis.com/v0/b/dropboxwannabe.appspot.com/o/adamino%2F1520653670895_Profil.jpg?alt=media&token=7f3eea89-00ec-4438-9cf8-2310bba92cba',
          created: '3/10/2018',
          displayName: 'Mr. Awesome',
          fileName: 'mrAwesome.jpg',
          size: 180,
          type: 'image/jpeg'
        }
      ]
    };
    this.folderClicked.emit(folderToAdd);
  }

}
