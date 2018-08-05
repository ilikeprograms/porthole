import { Component } from '@angular/core';

@Component({
  selector: 'app-keyword-matching-options-tabs',
  template: `
    <h2>Keywords manager</h2>

    <clr-tabs>
      <clr-tab>
        <button clrTabLink>Ad Groups</button>
        <clr-tab-content *clrIfActive>
          <app-keyword-card-list></app-keyword-card-list>
        </clr-tab-content>
      </clr-tab>

      <clr-tab>
        <button clrTabLink>Clients</button>
        <clr-tab-content *clrIfActive>
          <app-client-list></app-client-list>
        </clr-tab-content>
      </clr-tab>
    </clr-tabs>
  `
})
export class KeywordMatchingOptionsTabsComponent {
}
