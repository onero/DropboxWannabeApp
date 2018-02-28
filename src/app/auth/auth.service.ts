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

  login(email: string, password: string): Promise<any> {
    return this.fireAuth.auth.signInAndRetrieveDataWithEmailAndPassword(email, password);
  }

  logout() {
    this.fireAuth.auth.signOut()
      .then(() => {
      this.router.navigateByUrl('/login')
        .then(() => {
        this.snackService.displaySnack('Goodbye!', 2);
        });
      });
  }

}
