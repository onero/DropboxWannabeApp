import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Output()
  navToggle = new EventEmitter();

  constructor(public authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  toggleNav() {
    this.navToggle.emit();
  }
}
