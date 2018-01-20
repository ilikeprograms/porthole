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
export class CheckingLicenceComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private licenceService: LicenceService,
    private zone: NgZone
  ) {
    this.loadingError$ = this.loadingErrorSubject$.asObservable();
    this.loading$ = this.loadingSubject$.asObservable();
  }

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
      if (LicenceService.isLicenceValid(license)) {
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

  public onOpenStoreRequest(): void {
    chrome.tabs.create({
      url: environment.storeUrl
    });
  }
}
