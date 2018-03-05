import {Directive, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[appFrannyCapsLock]'
})
export class FrannyCapsLockDirective {

  @Output() capsLock = new EventEmitter<boolean>();

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const capsOn = event.getModifierState && event.getModifierState('CapsLock');
    if (capsOn) {
      this.capsLock.emit(true);
    } else {
      this.capsLock.emit(false);
    }
  }

}
