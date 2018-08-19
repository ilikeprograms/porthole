import { map, take } from 'rxjs/operators';
import { Component } from '@angular/core';

import { ILicence } from './licence/licence.interface';
import { LicenceService } from './licence/licence.service';
import { Observable } from 'rxjs';
import { IClarityAlert } from './notifications/clarity-alert.interface';
import { NotificationsFacade } from './notifications/notifications.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public licenceValid$: Observable<boolean>;
  public notifications$: Observable<Array<IClarityAlert>>;

  constructor(
    private licenceService: LicenceService,
    private notificationsFacade: NotificationsFacade
  ) {
    this.licenceValid$ = this.licenceService.userLicence$.pipe(take(1), map((licence: ILicence) => {
      return LicenceService.isLicenceValid(licence);
    }));

    this.notifications$ = this.notificationsFacade.notifications$;
  }

  title = 'app';
}
