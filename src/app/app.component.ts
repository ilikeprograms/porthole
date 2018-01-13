import { Component } from '@angular/core';

import { ChromeStorageService } from './core/chrome-storage.service';

import { KeywordMatchingOptionsFacade } from './keyword-matching-options/ngrx/keyword-matching-options.facade';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private keywordMatchingOptionsFacade: KeywordMatchingOptionsFacade, private chromeStorageService: ChromeStorageService) {
    // Get the previously stored state and import it
    this.chromeStorageService.sync.get(environment.storageKey, (appState) => {
      if (appState && appState[environment.storageKey]) {
        this.keywordMatchingOptionsFacade.importFromChromeStorage(appState[environment.storageKey]);
      } else {
        this.chromeStorageService.initialised = true;
      }
    });
  }

  title = 'app';

  public navigationSideMenu: Array<{
    label: string;
    link: string;
  }> = [{
    label: 'Keywords',
    link: 'keywords'
  }, {
    label: 'About',
    link: 'about'
  }];
}
