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
    const uid = this.authService.getUID();
    const path = `${uid}/${new Date().getTime()}_${file.name}`;
    return this.afStorage.upload(path, file);
  }

  uploadUniqueFile(file: File, specificFileName?: string): AngularFireUploadTask {
    const uid = this.authService.getUID();
    const path = `${uid}/${specificFileName || file.name}`;
    return this.afStorage.upload(path, file);
  }

  deleteFileByUrl(path: string): Promise<any> {
    return this.afStorage.storage.refFromURL(path).delete();
  }

  deleteProfilePic(user: User) {
    const ref = this.afStorage.storage.ref(`${user.uid}/profile_photo`);
    if (ref) {
      ref.delete();
    }
  }
}
