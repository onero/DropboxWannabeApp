import {Component, Input, OnInit} from '@angular/core';
import {FileModel} from '../shared/file.model';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {
  @Input()
  currentFile: FileModel;

  srcLoaded: boolean;

  constructor() { }

  ngOnInit() {
  }

  checkForImage(): boolean {
    return this.currentFile.type === 'image/jpeg';
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
