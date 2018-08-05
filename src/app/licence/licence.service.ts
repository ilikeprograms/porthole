import { take, retry, catchError, startWith, shareReplay } from 'rxjs/operators';
import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ReplaySubject, Subject, Observable, of, combineLatest } from 'rxjs';

import { environment } from '../../environments/environment';
import { ILicence } from './licence.interface';
import { LicenceAccessLevelEnum } from './licence-access-level.enum';

const LICENCE_API_URL_BASE: string = 'https://www.googleapis.com/chromewebstore/v1.1/userlicenses/';

@Injectable()
export class LicenceService {
  constructor(
    private httpClient: HttpClient,
    private zone: NgZone
  ) {
    this.userLicence$ = this.userLicenceSubject$.asObservable();

    this.getLicence();
    // )
    // this.userLicence$ = Observable.create(() => {
    //   this.getLicence();
    // })
    //   .startWith({})
    //   .combineLatest(this.userLicenceSubject$, (values, value2) => {
    //     return value2;
    //   })
    //   .shareReplay(1);
  }

  public userLicence$: Observable<ILicence>;
  public userLicenceSubject$: ReplaySubject<ILicence> = new ReplaySubject(1);
  public userLicenceError$: Subject<void> = new Subject<void>();

  private access_token: any;

  public static isLicenceValid(licence: ILicence) {
    console.log('licence', licence);
    if (licence.result && licence.accessLevel === LicenceAccessLevelEnum.full) {
      return true;
    } else if (licence.result && licence.accessLevel === LicenceAccessLevelEnum.freetrial) {
      let daysAgoLicenseIssued: number = Date.now() - parseInt(licence.createdTime, 10);
      daysAgoLicenseIssued = daysAgoLicenseIssued / 1000 / 60 / 60 / 24;

      if (daysAgoLicenseIssued <= 30) {
        return true;
      }
    }

    return false;
  }

  public getLicence(): void {
    console.log(environment.production);
    if (environment.production !== true) {
      this.userLicenceError$.next();

      this.userLicenceSubject$.next({
        result: true,
        accessLevel: LicenceAccessLevelEnum.full,
        createdTime: '1'
      });

      return;
    }

    this.zone.run(() => {
      chrome.identity.getAuthToken({ interactive: true }, (token) => {
        console.log('token', token);
        if (chrome.runtime.lastError) {
          console.log('last error', chrome.runtime.lastError);
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

    getLicenceRequest.pipe(
      catchError(() => {
        console.log('error loading licence');
        this.zone.run(() => {
          chrome.identity.removeCachedAuthToken({ token: this.access_token });
        });

        return (getLicenceRequest);
      }),
      retry(2),
      take(1)
    )
    .subscribe((response: ILicence) => {
      console.log('licence load', response);
      this.userLicenceSubject$.next(response);
    }, () => {
      console.log('get licence failure');
      this.userLicenceError$.next();
    });
  }
}
