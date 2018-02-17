import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {email: '', password: ''};

  constructor(//public auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    // reset login status
    // this.auth.signOut();
  }

  googleLogin() {
    // this.auth.googleLogin().then(result => {
    //   this.navigateHome();
    // });
  }

  private navigateHome() {
    this.router.navigateByUrl('/home');
  }

  signIn() {
    // this.auth.emailLogin(this.model.email, this.model.password).then(result => {
    //   this.navigateHome();
    // });
  }
}
