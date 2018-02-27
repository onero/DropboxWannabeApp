import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  userLoggedIn = true;

  @Output()
  navToggle = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  toggleNav() {
    this.navToggle.emit();
  }
}
