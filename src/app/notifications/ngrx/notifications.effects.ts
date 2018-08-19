import { tap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  CREATE_TEXT_SNACKBAR_ACTION,
  CreateTextSnackbarAction
} from './notifications.actions';
import { NotificationsFacade } from '../notifications.facade';


@Injectable()
export class NotificationsEffects {
  constructor(
    private actions$: Actions<Action>,
    private notificationsService: NotificationsFacade
  ) {}

  // @Effect({ dispatch: false })
  // public createTextSnackbar(): Observable<Action> {
  //   return this.actions$.pipe(
  //     ofType(CREATE_TEXT_SNACKBAR_ACTION),
  //     tap((action: CreateTextSnackbarAction) => {
  //       this.notificationsService.createTextSnackbar(action.text, action.config);
  //     })
  //   );
  // }
}
