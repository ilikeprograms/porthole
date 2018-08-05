import { tap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  CREATE_TEXT_SNACKBAR_ACTION,
  CreateTextSnackbarAction
} from './snackbar-ngrx.actions';
import { SnackbarNgrxService } from '../snackbar-ngrx.service';


@Injectable()
export class SnackbarNgrxEffects {
  constructor(
    private actions$: Actions<Action>,
    private snackbarNgrxService: SnackbarNgrxService
  ) {}

  @Effect({ dispatch: false })
  public createTextSnackbar(): Observable<Action> {
    return this.actions$.pipe(
      ofType(CREATE_TEXT_SNACKBAR_ACTION),
      tap((action: CreateTextSnackbarAction) => {
        // this.snackbarNgrxService.createTextSnackbar(action.text, action.config);
      })
    );
  }
}
