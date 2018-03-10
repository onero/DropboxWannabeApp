import {Component, Input, OnInit} from '@angular/core';
import {NgxGalleryAction, NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions} from 'ngx-gallery';
import {Observable} from 'rxjs/Observable';
import {FileService} from '../shared/file.service';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
import {UserService} from '../../../user/shared/user.service';

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
  isLoading = false;
  currentImageIndex = 0;

  constructor(private fileService: FileService,
              private spinnerService: Ng4LoadingSpinnerService) {
  }

  ngOnInit() {
    this.spinnerService.show();
    this.isLoading = true;
    this.files = this.fileService.getCollection().valueChanges();
    this.galleryImages = [];
    this.galleryOptions = [
      {
        previewCloseOnClick: true,
        previewCloseOnEsc: true,
        previewAutoPlay: true,
        previewAutoPlayPauseOnHover: true,
        previewKeyboardNavigation: true,
        imageAnimation: NgxGalleryAnimation.Slide,
        imageActions: [{
          icon: 'fa fa-trash',
          titleText: 'Delete Image',
          onClick: () => {
            const currentImagePath: string = this.galleryImages[this.currentImageIndex].url;
            this.fileService.deleteFileByPath(currentImagePath);
          }
        }]
      },
      {
        'imageSize': 'contain',
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
          big: file.path,
          url: file.path
        };
        this.galleryImages.push(image);
      });
      this.spinnerService.hide();
      this.isLoading = false;
    });
  }

  setCurrentImageIndex(event: { index: number; image: NgxGalleryImage }) {
    this.currentImageIndex = event.index;
  }
}
