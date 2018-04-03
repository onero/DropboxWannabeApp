import {Component, OnInit} from '@angular/core';
import {FolderModel} from '../shared/folder.model';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss']
})
export class FolderComponent implements OnInit {
  currentFolder: FolderModel;

  constructor() {
  }

  ngOnInit() {
    this.currentFolder = {
      displayName: 'root',
      uid: '1',
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
    };
  }

}
