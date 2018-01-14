import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ReplaySubject } from 'rxjs/ReplaySubject';

import { environment } from '../../environments/environment';
import { ILicence } from './licence.interface';
import { LicenceAccessLevelEnum } from './licence-access-level.enum';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/retry';

const LICENCE_API_URL_BASE: string = 'https://www.googleapis.com/chromewebstore/v1.1/userlicenses/';

@Injectable()
export class LicenceService {
  constructor(private httpClient: HttpClient) {}

  public userLicence$: ReplaySubject<ILicence> = new ReplaySubject(1);
  public userLicenceError$: Subject<void> = new Subject();

  private access_token: any;

  public getLicence(): void {
    if (environment.production !== true) {
      this.userLicence$.next({
        result: true,
        accessLevel: LicenceAccessLevelEnum.full,
        createdTime: ''
      });

      return;
    }
    // this.httpClient.get(LICENCE_API_URL_BASE + chrome.runtime.id)
    // xhrWithAuth('GET', CWS_LICENSE_API_URL + chrome.runtime.id, true, onLicenseFetched);


    chrome.identity.getAuthToken({ interactive: true }, (token) => {
      if (chrome.runtime.lastError) {
        this.userLicenceError$.next();

        console.log('error', chrome.runtime.lastError);

        // RETURN ERROR MESSAGE FROM GET LICENCE
        // callback(chrome.runtime.lastError);

        return;
      }

      console.log('chrome.identity.getAuthToken returned a token', token);

      this.access_token = token;

      this.loadLicence();
    });
  }

  private loadLicence(): void {
    console.log('load licence attempt');
    console.log(LICENCE_API_URL_BASE + chrome.runtime.id, this.access_token);
    this.httpClient.get(LICENCE_API_URL_BASE + chrome.runtime.id, {
      headers: {
        'Authorization': 'Bearer ' + this.access_token
      }
    })
    .retry(2)
    .take(1)
    .subscribe((response: ILicence) => {
      console.log('got licence', response);
      this.userLicence$.next(response);
    }, () => {
      console.log('failed to get licence');
      chrome.identity.removeCachedAuthToken({ token: this.access_token });
    });
  }
}
