import {Component, Input, OnInit} from '@angular/core';
import {NgxGalleryAction, NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions} from 'ngx-gallery';
import {Observable} from 'rxjs/Observable';
import {StorageService} from '../shared/storage.service';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
import {UserService} from '../../../user/shared/user.service';
import {MatDialog} from '@angular/material';
import {ConfirmDeleteComponent} from '../../../shared/dialogs/confirm-delete/confirm-delete.component';

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

  constructor(private spinnerService: Ng4LoadingSpinnerService,
              private userService: UserService,
              private storageService: StorageService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.spinnerService.show();
    this.isLoading = true;
    this.files = this.userService.getUserCollection().valueChanges();
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
            this.dialog.open(ConfirmDeleteComponent)
              .afterClosed()
              .subscribe(userResponse => {
                if (userResponse === 'yes') {
                  this.storageService.deleteFileByUrl(currentImagePath)
                    .then(() => {
                      this.userService.deleteFileFromUserCollection(currentImagePath);
                    });
                }
              });
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
