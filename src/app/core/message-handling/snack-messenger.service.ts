import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class SnackMessengerService {

  constructor(private snack: MatSnackBar) { }

  displaySnack(message: string, durationInSecs: number) {
    return this.snack.open(message,
      'YES MASTER',
      {
        duration: durationInSecs * 1000,
        verticalPosition: 'top',
        extraClasses: ['adamino-snackbar']
      });
  }

}
