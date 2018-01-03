import { Component } from '@angular/core';

@Component({
  selector: 'app-keyword-matching-options-tabs',
  template: `
    <h2>Keywords manager</h2>

    <mat-tab-group>
      <mat-tab label="Ad Groups">
        <div class="tab-content">
          <!--<app-keyword-card-list></app-keyword-card-list>-->
        </div>
      </mat-tab>
      <mat-tab label="Clients">
        <div class="tab-content">
          <app-client-list></app-client-list>
        </div>
      </mat-tab>
    </mat-tab-group>
  `,
  styles: [`
    .tab-content {
      padding: 1rem;
    }
  `]
})
export class KeywordMatchingOptionsTabsComponent {
}
