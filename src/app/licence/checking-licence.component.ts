import { Router } from '@angular/router';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { LicenceService } from './licence.service';
import { ILicence } from './licence.interface';
import { LicenceAccessLevelEnum } from './licence-access-level.enum';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-checking-licence',
  template: `
    <mat-card>
      <mat-card-content>
        <h2 class="example-h2">Checking your licence</h2>

        <mat-progress-spinner
          *ngIf="!licence; else licenceLoaded"
          color="primary"
          mode="indeterminate"
        >
        </mat-progress-spinner>
        
        <ng-template #licenceLoaded>
          <div *ngIf="licenceExpired">
            <p>Your free trial has expired. If you wish to continue using porthole then please purchase!</p>
            <p>You can do so from the store page.</p>
            <p><button mat-button color="primary" (click)="onOpenStoreRequest()">Go to store</button>&nbsp; (opens in a new tab)</p>
            <p>If you dont wish to purcahse, but want to provide some feedback then please get in contact by submitting feedback on the store page.</p>
          </div>
        </ng-template>
      </mat-card-content>
    </mat-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckingLicenceComponent implements OnInit {
  constructor(private router: Router, private licenceService: LicenceService) {}

  public licence: ILicence;
  public licenceExpired: boolean = false;

  public static licenceAccessLevelEnum = LicenceAccessLevelEnum;

  public ngOnInit(): void {
    // this.licenceService.userLicenceError$.subscribe(() => {
    //
    // });
    //
    // this.licenceService.userLicence$.subscribe((license: ILicence) => {
    //   let licenceValid: boolean = false;
    //
    //   this.licence = license;
    //
    //   if (license.result && license.accessLevel === LicenceAccessLevelEnum.full) {
    //     licenceValid = true;
    //     console.log('Full licence');
    //     // console.log("Fully paid & properly licensed.");
    //     // licenseStatusText = "FULL";
    //     // licenseStatus = "alert-success";
    //   } else if (license.result && license.accessLevel === LicenceAccessLevelEnum.freetrial) {
    //     console.log('Free trial');
    //     var daysAgoLicenseIssued = Date.now() - parseInt(license.createdTime, 10);
    //     daysAgoLicenseIssued = daysAgoLicenseIssued / 1000 / 60 / 60 / 24;
    //
    //     if (daysAgoLicenseIssued <= 30) {
    //       licenceValid = true;
    //       console.log("Free trial, still within trial period");
    //       // licenseStatusText = "FREE_TRIAL";
    //       // licenseStatus = "alert-info";
    //     } else {
    //       this.licenceExpired = true;
    //       console.log('free trial expored');
    //       // expired
    //     }
    //   }
    //
    //   if (licenceValid) {
        this.router.navigateByUrl('/keywords');
      // }
    // });

    // this.licenceService.getLicence();
  }

  public onOpenStoreRequest(): void {
    chrome.tabs.create({
      url: environment.storeUrl
    });
  }
}
