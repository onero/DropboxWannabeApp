import {Component, Input, OnInit} from '@angular/core';
import {NgxGalleryImage, NgxGalleryOptions} from 'ngx-gallery';
import {Observable} from 'rxjs/Observable';
import {FileService} from '../shared/file.service';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss']
})
export class ImageGalleryComponent implements OnInit {

  @Input()
  files: Observable<any[]>;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private fileService: FileService) {
  }

  ngOnInit() {
    this.files = this.fileService.collection.valueChanges();
    this.galleryImages = [];
    this.galleryOptions = [
      {'imageSize': 'contain'},
      {
        'breakpoint': 500,
        'width': '300px',
        'height': '300px',
        'thumbnailsColumns': 3
      },
      {
        'breakpoint': 300,
        'width': '100%',
        'height': '200px',
        'thumbnailsColumns': 2
      }
    ];
    this.files.subscribe(files => {
      this.galleryImages = [];
      files.forEach(file => {
        const image = {
          small: file.path,
          medium: file.path,
          big: file.path
        };
        this.galleryImages.push(image);
      });
    });
  }
}
