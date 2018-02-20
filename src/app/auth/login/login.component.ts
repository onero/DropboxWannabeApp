import { Component} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  mustEnterValue = 'You must enter a value';

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  getErrorMessage() {
    return this.email.hasError('required') ?
       this.mustEnterValue :
      this.email.hasError('email') ?
        'Not a valid email' :
        this.password.hasError('required') ?
          this.mustEnterValue :
        '';
  }
}
