import { map, take } from 'rxjs/operators';
import { AfterViewInit, Component, ElementRef, Inject } from '@angular/core';

import { ILicence } from './licence/licence.interface';
import { LicenceService } from './licence/licence.service';
import { Observable } from 'rxjs';
import { IClarityAlert } from './notifications/clarity-alert.interface';
import { NotificationsFacade } from './notifications/notifications.facade';
import { environment } from '../environments/environment';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  public licenceValid$: Observable<boolean>;
  public notifications$: Observable<Array<IClarityAlert>>;

  constructor(
    private licenceService: LicenceService,
    private notificationsFacade: NotificationsFacade,
    private elementRef: ElementRef,
    @Inject(DOCUMENT) private document
  ) {
    this.licenceValid$ = this.licenceService.userLicence$.pipe(take(1), map((licence: ILicence) => {
      return LicenceService.isLicenceValid(licence);
    }));

    this.notifications$ = this.notificationsFacade.notifications$;
  }

  title = 'app';

  public ngAfterViewInit(): void {
    if (environment.production) {
      const script: HTMLScriptElement = this.document.createElement('script') as HTMLScriptElement;

      script.innerHTML = `
        var _gaq = _gaq || [];
        _gaq.push(['_setAccount', 'UA-24379431-4']);
        _gaq.push(['_trackPageview']);
  
        (function() {
          var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
          ga.src = 'https://ssl.google-analytics.com/ga.js';
          var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
        })();
      `;

      this.elementRef.nativeElement.appendChild(script);
    }
  }
}
