import { Component } from '@angular/core';

@Component({
  selector: 'app-action-bar-button-stack',
  template: `<ng-content></ng-content>`,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
    }
  `]
})
export class ActionBarButtonStackComponent {}
