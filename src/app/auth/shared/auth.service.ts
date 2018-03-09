import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';
import {SnackMessengerService} from '../../core/message-handling/snack-messenger.service';
import {User} from '../../user/shared/user.model';

@Injectable()
export class AuthService {

  constructor(private fireAuth: AngularFireAuth,
              private router: Router,
              private snackService: SnackMessengerService) {
  }

  getUsername(): string {
    return this.fireAuth.auth.currentUser.displayName;
  }

  getUID(): string {
    return this.fireAuth.auth.currentUser.uid;
  }

  getProfilePic(): string {
    return this.fireAuth.auth.currentUser.photoURL || null;
  }

  getAuthUser(): Observable<User> {
    return this.fireAuth.authState
      .map(authState => {
        return {
          uid: authState.uid,
          email: authState.email
        };
      });
  }

  deleteAuthUser() {
    this.fireAuth.auth.currentUser.delete()
      .then(() => {
        this.router.navigateByUrl('login');
        this.snackService.displaySnack('Account deleted!', 2);
      });
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
      .then(createdAuthUser => {
        const createdUser = createdAuthUser.user;
        return createdUser.updateProfile({
          displayName: user.username
        });
      });
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
