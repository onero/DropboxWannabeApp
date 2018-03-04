import { Component } from '@angular/core';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';
import {environment} from '../environments/environment';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  mediaWatcher: Subscription;
  loadingScreen = `<img src="/assets/loading.gif"/>`;

  constructor(media: ObservableMedia) {
    this.mediaWatcher = media.subscribe((change: MediaChange) => {
      switch (change.mqAlias) {
        case 'xs':
          environment.shouldBeMobileFriendly = true;
          break;
        case 'sm':
          environment.shouldBeMobileFriendly = true;
          break;
        default:
          environment.shouldBeMobileFriendly = false;
      }
    });
  }
}
