import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IClarityAlert } from './clarity-alert.interface';
import { Observable } from 'rxjs';
import { selectAllNotifications } from './ngrx/notifications.selectors';
import { IAppState } from '../ngrx/app-state.interface';

@Injectable()
export class NotificationsFacade {
  public notifications$: Observable<Array<IClarityAlert>>;

  constructor(
    private store: Store<IAppState>
  ) {
    this.notifications$ = this.store.select(selectAllNotifications);
  }
}
