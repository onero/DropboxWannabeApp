import {Injectable} from '@angular/core';
import {SnackMessengerService} from '../message-handling/snack-messenger.service';

const MessageDisplayLengthInSeconds = 5;

@Injectable()
export class ErrorService {

  constructor(private snack: SnackMessengerService) {
  }

  displayError(errorMessage: string) {
    this.snack.displayErrorSnack(errorMessage, MessageDisplayLengthInSeconds);
  }

}
