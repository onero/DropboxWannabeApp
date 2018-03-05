import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';
import {SnackMessengerService} from '../core/message-handling/snack-messenger.service';
import {User} from '../user/user.model';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';

@Injectable()
export class AuthService {

  userCollection$: AngularFirestoreCollection<User>;
  currentUser: Observable<User>;

  constructor(private fireAuth: AngularFireAuth,
              private router: Router,
              private snackService: SnackMessengerService,
              private afs: AngularFirestore) {
    this.userCollection$ = this.afs.collection('users');
    this.currentUser = this.fireAuth.authState
      .switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return Observable.of(null);
        }
      });
  }

  getUsername(): string {
    return this.fireAuth.auth.currentUser.displayName;
  }

  getUID(): string {
    return this.fireAuth.auth.currentUser.uid;
  }

  isAuthenticated(): Observable<boolean> {
    return this.fireAuth.authState
      .map(authState => {
        return authState !== null;
      });
  }

  login(email: string, password: string): Promise<any> {
    return this.fireAuth.auth
      .signInAndRetrieveDataWithEmailAndPassword(email, password);
  }

  registerWithEmailAndPassword(user: User): Promise<any> {
    return this.fireAuth.auth
      .createUserAndRetrieveDataWithEmailAndPassword(user.email, user.password)
      .then(data => {
        console.log(data.user);
        const createdUser = data.user;
        console.log('User created');
        createdUser.updateProfile({
          displayName: user.username
        }).then(() => {
            const data: User = {
            uid: this.fireAuth.auth.currentUser.uid,
            email: this.fireAuth.auth.currentUser.email,
            username: this.fireAuth.auth.currentUser.displayName,
            profilePicSrc: this.fireAuth.auth.currentUser.photoURL
          };
          return this.updateFireStoreUsersCollection(data);
        });
      });
  }

  updateFireStoreUsersCollection(user: User) {
    // const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const uid = user.uid !== null ?
      user.uid :
      this.fireAuth.auth.currentUser.uid;
    return this.userCollection$.doc(`${uid}`).set(user, {merge: true});
  }

  logout() {
    const username = this.getUsername();
    this.fireAuth.auth.signOut()
      .then(() => {
        this.router.navigateByUrl('/login')
          .then(() => {
            this.snackService.displaySnack('Goodbye ' + username, 2);
          });
      });
  }
}
