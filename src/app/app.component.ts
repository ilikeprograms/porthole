import { Component } from '@angular/core';

import { ChromeStorageService } from './core/chrome-storage.service';

import { KeywordMatchingOptionsFacade } from './keyword-matching-options/ngrx/keyword-matching-options.facade';
import { environment } from '../environments/environment';
import { ILicence } from './licence/licence.interface';
import { LicenceService } from './licence/licence.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public licenceValid$: Observable<boolean>;

  constructor(
    private licenceService: LicenceService
    // private keywordMatchingOptionsFacade: KeywordMatchingOptionsFacade,
    // private chromeStorageService: ChromeStorageService
  ) {
    this.licenceValid$ = this.licenceService.userLicence$.take(1).map((licence: ILicence) => {
      return LicenceService.isLicenceValid(licence);
    });
    // Get the previously stored state and import it
    // this.chromeStorageService.sync.get(environment.storageKey, (appState) => {
    //   if (appState && appState[environment.storageKey]) {
    //     // this.keywordMatchingOptionsFacade.importFromChromeStorage(appState[environment.storageKey]);
    //   } else {
    //     this.chromeStorageService.initialised = true;
    //   }
    // });
  }

  title = 'app';
}
