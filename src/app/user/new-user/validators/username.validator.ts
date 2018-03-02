import {AngularFirestore} from 'angularfire2/firestore';
import {AbstractControl} from '@angular/forms';
import {debounceTime, map, take} from 'rxjs/operators';

export class UsernameValidator {
  static usernameAvailable(afs: AngularFirestore) {
    return (control: AbstractControl) => {

      const username = control.value.toLowerCase();

      return afs.collection('users', ref =>
        ref.where('username', '==', username))
        .valueChanges().pipe(
          debounceTime(500),
          take(1),
          map(arr => arr.length ?
            {'usernameAvailable': {usernameAvailable: false}}:
            null )
        );
    };
  }
}
