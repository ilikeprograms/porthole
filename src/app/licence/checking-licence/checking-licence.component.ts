import { Router } from '@angular/router';
import { AfterViewInit, ChangeDetectionStrategy, Component, NgZone, OnInit } from '@angular/core';

import { LicenceService } from '../licence.service';
import { ILicence } from '../licence.interface';
import { LicenceAccessLevelEnum } from '../licence-access-level.enum';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/take';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-checking-licence',
  templateUrl: './checking-licence.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckingLicenceComponent implements OnInit, AfterViewInit {
  constructor(
    private router: Router,
    private licenceService: LicenceService,
    private zone: NgZone
  ) {}

  public licence: ILicence;
  public loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  public ngOnInit(): void {
    // this.licenceService.userLicenceError$.subscribe(() => {
    //
    // });
    //
    this.licenceService.userLicence$.take(1).subscribe((license: ILicence) => {
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
        this.loading$.next(false);
      }
    });
  }

  public ngAfterViewInit(): void {
    this.licenceService.getLicence();
  }

  public onOpenStoreRequest(): void {
    chrome.tabs.create({
      url: environment.storeUrl
    });
  }
}
