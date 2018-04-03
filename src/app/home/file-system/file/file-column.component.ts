import {Component, Input, OnInit} from '@angular/core';
import {FileModel} from '../shared/file.model';

@Component({
  selector: 'app-file-column',
  templateUrl: './file-column.component.html',
  styleUrls: ['./file-column.component.scss']
})
export class FileColumnComponent implements OnInit {
  @Input()
  currentFile: FileModel;

  srcLoaded: boolean;

  constructor() { }

  ngOnInit() {
  }

  checkForImage(): boolean {
    return this.currentFile.type.includes('image');
  }

  getFileSrc() {
    const fileIsImage = this.checkForImage();
    if (fileIsImage) {
      return this.currentFile.url;
    } else {
      return '/assets/file_img.png';
    }
  }
}
