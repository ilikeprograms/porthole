import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ReplaySubject } from 'rxjs/ReplaySubject';

import { environment } from '../../environments/environment';
import { ILicence } from './licence.interface';
import { LicenceAccessLevelEnum } from './licence-access-level.enum';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/catch';

const LICENCE_API_URL_BASE: string = 'https://www.googleapis.com/chromewebstore/v1.1/userlicenses/';

@Injectable()
export class LicenceService {
  constructor(
    private httpClient: HttpClient,
    private zone: NgZone
  ) {}

  public userLicence$: ReplaySubject<ILicence> = new ReplaySubject(1);
  public userLicenceError$: Subject<void> = new Subject<void>();

  private access_token: any;

  public getLicence(): void {
    if (environment.production !== true) {
      this.userLicenceError$.next();

      this.userLicence$.next({
        result: true,
        accessLevel: LicenceAccessLevelEnum.full,
        createdTime: '1'
      });

      return;
    }

    this.zone.run(() => {
      chrome.identity.getAuthToken({ interactive: true }, (token) => {
        if (chrome.runtime.lastError) {
          this.userLicenceError$.next();

          return;
        }

        this.access_token = token;

        this.loadLicence();
      });
    });
  }

  private loadLicence(): void {
    const getLicenceRequest = this.httpClient.get(LICENCE_API_URL_BASE + chrome.runtime.id, {
      headers: {
        'Authorization': 'Bearer ' + this.access_token
      }
    });

    getLicenceRequest
    .catch(() => {
      this.zone.run(() => {
        chrome.identity.removeCachedAuthToken({ token: this.access_token });
      });

      return (getLicenceRequest);
    })
    .retry(2)
    .take(1)
    .subscribe((response: ILicence) => {
      this.userLicence$.next(response);
    }, () => {
      this.userLicenceError$.next();
    });
  }
}
