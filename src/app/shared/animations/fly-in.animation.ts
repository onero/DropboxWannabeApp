
  import {animate, state, style, transition, trigger} from '@angular/animations';

export const flyInAnimation =
  trigger('flyInAnimation', [
    // route 'enter' transition
    state('in', style({transform: 'translateX(0)'})),
    transition('void => *', [
      style({transform: 'translateX(-200%)'}),
      animate(500)
    ])
  ]);
