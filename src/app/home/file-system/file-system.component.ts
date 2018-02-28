import { Component, OnInit } from '@angular/core';
import {FileService} from './file.service';
import {FirebaseListObservable} from 'angularfire2/database-deprecated';

@Component({
  selector: 'app-file-system',
  templateUrl: './file-system.component.html',
  styleUrls: ['./file-system.component.css']
})
export class FileSystemComponent implements OnInit {

  files$;
  file$;

  constructor(private fileService: FileService) { }

  ngOnInit() {
    this.files$ = this.fileService.getFiles();
    this.file$ = this.fileService.getFileById(1);
  }

  addFile(newFile: string) {
    this.fileService.addFile(newFile);
  }
}
