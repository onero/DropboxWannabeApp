import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FolderModel} from '../shared/folder.model';
import {FileModel} from '../shared/file.model';
import {FolderService} from '../shared/folder.service';

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

  constructor(private folderService: FolderService) {
  }

  ngOnInit() {
  }

  onFileClicked(file: FileModel) {
    this.fileClicked.emit(file);
  }

  onFolderClicked(folder: FolderModel) {
    this.folderService.getFolder(folder.uid)
      .subscribe(folderDb => {
      this.folderClicked.emit(folderDb);
    });
  }

}
