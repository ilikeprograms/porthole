import { Router } from '@angular/router';
import { ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit } from '@angular/core';

import { takeUntil } from 'rxjs/operators';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

import { LicenceService } from '../licence.service';
import { ILicence } from '../licence.interface';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-checking-licence',
  templateUrl: './checking-licence.component.html'
})
export class CheckingLicenceComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private licenceService: LicenceService,
    private zone: NgZone,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.loadingError$ = this.loadingErrorSubject$.asObservable();
    this.loading$ = this.loadingSubject$.asObservable();
  }

  public loadingErrorSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public loadingError$: Observable<boolean>;
  public loadingSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public loading$:  Observable<boolean>;

  public ngOnInit(): void {
    this.licenceService.userLicenceError$.pipe(
      takeUntil(this.unsubscribe$))
      .subscribe((isInvalid: boolean) => {
        if (isInvalid) {
          console.error('user licenc error');
          this.loadingErrorSubject$.next(true);
        }

        this.loadingSubject$.next(false);

        this.changeDetectorRef.markForCheck();
      }, (error: any) => {
        console.error('error from user licence errro: ' + error);
        this.loadingErrorSubject$.next(true);

        this.loadingSubject$.next(false);

        this.changeDetectorRef.markForCheck();
      });

    this.licenceService.userLicence$.pipe(takeUntil(this.unsubscribe$)).subscribe((license: ILicence) => {
      if (LicenceService.isLicenceValid(license)) {
        console.log('keywords navigate');
        this.zone.run(() => {
          this.router.navigate(['keywords']);
        });
      } else {
        console.log('licence is not valid');
        this.loadingSubject$.next(false);

        this.changeDetectorRef.markForCheck();
      }
    }, (error: any) => {
      console.error(error);
      this.loadingErrorSubject$.next(true);

      this.loadingSubject$.next(false);

      this.changeDetectorRef.markForCheck();
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
