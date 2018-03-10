import {animate, state, style, transition, trigger} from '@angular/animations';

export const hoverAnimation =
  trigger('imageHover', [
    state('hoveringImage', style({
      opacity: 0.3
    })),
    state('notHoveringImage', style({
      opacity: 1
    })),
    transition('hoveringImage <=> notHoveringImage',
      animate('200ms ease-in'))
  ]);
