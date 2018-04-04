import {Component, OnInit} from '@angular/core';
import {StorageService} from './shared/storage.service';
import {Observable} from 'rxjs/Observable';
import {AngularFireUploadTask} from 'angularfire2/storage';
import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions} from 'ngx-gallery';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-file-system',
  templateUrl: './file-system.component.html',
  styleUrls: ['./file-system.component.scss']
})
export class FileSystemComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }


}
