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

}
