import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';
import {SnackMessengerService} from '../core/message-handling/snack-messenger.service';

@Injectable()
export class AuthService {

  constructor(private fireAuth: AngularFireAuth,
              private router: Router,
              private snackService: SnackMessengerService) { }

  isAuthenticated(): Observable<boolean> {
    return this.fireAuth.authState
      .map(authState => {
        return authState !== null;
      });
  }

  getCurrentUserHandle(): string {
    if (this.fireAuth.authState !== null) {
      return (this.fireAuth.auth.currentUser.displayName !== null) ?
        this.fireAuth.auth.currentUser.displayName :
        this.fireAuth.auth.currentUser.email;
    }
    return '';
  }

  getUserId(): string {
    return this.fireAuth.auth.currentUser.uid;
  }

  login(email: string, password: string): Promise<any> {
    return this.fireAuth.auth
      .signInAndRetrieveDataWithEmailAndPassword(email, password);
  }

  registerWithEmailAndPassword(username: string, email: string, password: string): Promise<any> {
    return this.fireAuth.auth
      .createUserAndRetrieveDataWithEmailAndPassword(email, password)
      .then(data => {
        data.user.updateProfile({
          displayName: username
        });
      });
  }

  logout() {
    const username = this.getCurrentUserHandle();
    this.fireAuth.auth.signOut()
      .then(() => {
      this.router.navigateByUrl('/login')
        .then(() => {
        this.snackService.displaySnack('Goodbye ' + username, 2);
        });
      });
  }

}
