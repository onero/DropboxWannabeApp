import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Output()
  navToggle = new EventEmitter();

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  toggleNav() {
    this.navToggle.emit();
  }
}
