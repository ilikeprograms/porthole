import { Router } from '@angular/router';
import { AfterViewInit, ChangeDetectionStrategy, Component, NgZone, OnDestroy, OnInit } from '@angular/core';

import { LicenceService } from '../licence.service';
import { ILicence } from '../licence.interface';
import { LicenceAccessLevelEnum } from '../licence-access-level.enum';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/take';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-checking-licence',
  templateUrl: './checking-licence.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckingLicenceComponent implements OnInit, OnDestroy, AfterViewInit {
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private licenceService: LicenceService,
    private zone: NgZone
  ) {
    this.loadingError$ = this.loadingErrorSubject$.asObservable();
    this.loading$ = this.loadingSubject$.asObservable();
  }

  public licence: ILicence;

  public loadingErrorSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public loadingError$: Observable<boolean>;
  public loadingSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public loading$:  Observable<boolean>;

  public ngOnInit(): void {
    this.licenceService.userLicenceError$
      .takeUntil(this.unsubscribe$)
      .subscribe(() => {
        this.loadingErrorSubject$.next(true);

        this.loadingSubject$.next(false);
      });

    this.licenceService.userLicence$.takeUntil(this.unsubscribe$).subscribe((license: ILicence) => {
      let licenceValid: boolean = false;

      this.licence = license;

      if (license.result && license.accessLevel === LicenceAccessLevelEnum.full) {
        licenceValid = true;
      } else if (license.result && license.accessLevel === LicenceAccessLevelEnum.freetrial) {
        let daysAgoLicenseIssued: number = Date.now() - parseInt(license.createdTime, 10);
        daysAgoLicenseIssued = daysAgoLicenseIssued / 1000 / 60 / 60 / 24;

        if (daysAgoLicenseIssued <= 30) {
          licenceValid = true;
        }
      }

      if (licenceValid) {
        this.zone.run(() => {
          this.router.navigate(['keywords']);
        });
      } else {
        this.loadingSubject$.next(false);
      }
    });
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.licenceService.getLicence();
    }, 0);
  }

  public onOpenStoreRequest(): void {
    chrome.tabs.create({
      url: environment.storeUrl
    });
  }
}
