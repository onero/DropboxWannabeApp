import {Injectable} from '@angular/core';
import {AngularFireStorage, AngularFireUploadTask} from 'angularfire2/storage';
import {AuthService} from '../../../auth/shared/auth.service';
import {User} from '../../../user/shared/user.model';

@Injectable()
export class StorageService {

  constructor(private afStorage: AngularFireStorage,
              private authService: AuthService) {
  }

  uploadFile(file: File): AngularFireUploadTask {
    const username = this.authService.getUsername();
    const path = `${username}/${new Date().getTime()}_${file.name}`;
    return this.afStorage.upload(path, file);
  }

  uploadUniqueFile(file: File, specificFileName?: string): AngularFireUploadTask {
    const username = this.authService.getUsername();
    const path = `${username}/${specificFileName || file.name}`;
    return this.afStorage.upload(path, file);
  }

  deleteFileByUrl(path: string): Promise<any> {
    return this.afStorage.storage.refFromURL(path).delete();
  }

  deleteProfilePic(user: User) {
    const ref = this.afStorage.storage.ref(`${user.username}/profile_photo`);
    if (ref) {
      ref.delete();
    }
  }
}
