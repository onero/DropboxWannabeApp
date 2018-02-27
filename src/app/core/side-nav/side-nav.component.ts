import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  navBarOpen = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.authenticationUpdated.subscribe(userLoggedIn => {
      if (!userLoggedIn) {
        this.onUserLoggedOut();
      }
    });
  }

  onUserLoggedOut() {
    this.navBarOpen = false;
  }

  toggleNav() {
    this.navBarOpen = !this.navBarOpen;
  }

}
