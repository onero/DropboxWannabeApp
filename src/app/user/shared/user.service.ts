import {Injectable} from '@angular/core';
import {User} from './user.model';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../../auth/shared/auth.service';
import 'rxjs/add/operator/first';

@Injectable()
export class UserService {

  constructor(private afs: AngularFirestore,
              private authService: AuthService) {
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

  deleteUser(user: User): Promise<any> {
    return this.afs.doc(`users/${user.uid}`).delete();
  }

  updateUser(user: User): Promise<any> {
    return this.afs.doc(`users/${user.uid}`).set(user, {merge: true});
  }

}
