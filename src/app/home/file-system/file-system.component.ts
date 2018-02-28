import {Component, OnInit} from '@angular/core';
import {FileService} from './shared/file.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-file-system',
  templateUrl: './file-system.component.html',
  styleUrls: ['./file-system.component.scss']
})
export class FileSystemComponent implements OnInit {

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  constructor(private fileService: FileService) { }

  ngOnInit() {
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const task = this.fileService.uploadFile(file);

    this.uploadPercent = task.percentageChanges();
    this.downloadURL = task.downloadURL();
    // this.fileService.addFile({
    //   title: title
    // });
  }
}
