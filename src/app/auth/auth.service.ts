import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';
import {SnackMessengerService} from '../core/message-handling/snack-messenger.service';
import {User} from '../user/user.model';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';

@Injectable()
export class AuthService {

  userCollection$: AngularFirestoreCollection<User>;
  currentUser;

  constructor(private fireAuth: AngularFireAuth,
              private router: Router,
              private snackService: SnackMessengerService,
              private afs: AngularFirestore) {
    this.userCollection$ = this.afs.collection('users');
    this.fireAuth.authState.subscribe(user => {
      this.currentUser = user;
    });
  }

  getUsername(): string {
    return this.currentUser.displayName;
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
        const createdUser = data.user;
        createdUser.updateProfile({
          displayName: user.username
        });
        this.userCollection$.add({
          uid: createdUser.uid,
          username: user.username,
          email: user.email
        });
      });
  }

  logout() {
    const username = this.currentUser.displayName;
    this.fireAuth.auth.signOut()
      .then(() => {
        this.router.navigateByUrl('/login')
          .then(() => {
            this.snackService.displaySnack('Goodbye ' + username, 2);
          });
      });
  }

}
