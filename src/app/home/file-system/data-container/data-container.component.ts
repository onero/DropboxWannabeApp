import {Component, OnInit} from '@angular/core';
import {FolderModel} from '../shared/folder.model';

@Component({
  selector: 'app-data-container',
  templateUrl: './data-container.component.html',
  styleUrls: ['./data-container.component.scss']
})
export class DataContainerComponent implements OnInit {
  folders: FolderModel[];

  constructor() {
  }

  ngOnInit() {
    this.folders = [
      {
        displayName: 'root',
        uid: '1',
        files: [
          {
            uid: '1',
            url: 'https://firebasestorage.googleapis.com/v0/b/dropboxwannabe.appspot.com/o/adamino%2F1520711029667_the_hobbit_the_battle_of_the_five_armies-wide.jpg?alt=media&token=bc01f8d6-ac9f-4a6a-9a4c-15b21a28a601',
            created: '3/10/2018',
            displayName: 'Awesome',
            fileName: 'awesome.jpg',
            size: 3450,
            type: 'image/jpeg'
          }
        ],
        subFolders: [
          {
            uid: '2',
            displayName: 'It Works!'
          },
          {
            uid: '3',
            displayName: 'It Really Does!'
          }
        ]
      }
    ];
  }

  addFolder(folder: FolderModel) {
    const folderAlreadyDisplayed = this.folders.find(displayedFolder => displayedFolder.uid === folder.uid);
    if (!folderAlreadyDisplayed) {
      this.folders.push(folder);
    }
  }

}
