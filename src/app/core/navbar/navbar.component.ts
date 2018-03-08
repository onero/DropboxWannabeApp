import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../../auth/shared/auth.service';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean;

  @Output()
  navToggle = new EventEmitter();

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.authService.isAuthenticated()
      .subscribe(userLoggedIn => {
        this.isLoggedIn = userLoggedIn;
      });
  }

  shouldBeMobileFriendly() {
    return environment.shouldBeMobileFriendly;
  }

  toggleNav() {
    this.navToggle.emit();
  }

  logout() {
    this.authService.logout();
  }
}
