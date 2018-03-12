import {Injectable} from '@angular/core';
import {User} from './user.model';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../../auth/shared/auth.service';
import 'rxjs/add/operator/first';
import {SnackMessengerService} from '../../core/message-handling/snack-messenger.service';

@Injectable()
export class UserService {

  private filesCollectionPath = 'files';
  private userUploadsPath = 'uploads';
  private username;

  constructor(private afs: AngularFirestore,
              private authService: AuthService,
              private snack: SnackMessengerService) {
  }

  getUser(): Observable<User> {
    // Get the AuthUser
    return this.authService.getAuthUser()
      .first()
      .switchMap(authUser => {
        // Get the DBUser
        return this.afs.doc<User>('users/' + authUser.uid).valueChanges()
          .map(dbUser => {
            // Merge information from AuthUser+DBUser
            dbUser.uid = authUser.uid;
            dbUser.email = authUser.email;
            return dbUser;
          });
      });
  }

  getUserCollection(): AngularFirestoreCollection<any> {
    this.username = this.authService.getUsername();
    return this.afs.collection(this.filesCollectionPath)
      .doc(this.username).collection(this.userUploadsPath);
  }

  updateUserCollection(path: string) {
    const userId = this.authService.getUID();
    const item = {userId, path};
    this.getUserCollection().add(item)
      .catch(reason => console.log(reason));
  }

  deleteFileFromUserCollection(path: string) {
    this.afs.collection(this.filesCollectionPath)
      .doc(this.username).collection(this.userUploadsPath, ref => ref.where('path', '==', path))
      .snapshotChanges()
      .subscribe(result => {
        result.map(info => {
          info.payload.doc.ref.delete()
            .then(() => this.snack.displaySnack('Deleted!', 2));
        });
      });
    return null;
  }

  deleteUser(user: User): Promise<any> {
    return this.afs.doc(`users/${user.uid}`).delete();
  }

  updateUser(user: User): Promise<any> {
    return this.afs.doc(`users/${user.uid}`).set(user, {merge: true});
  }

}
