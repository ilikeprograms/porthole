import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import {
  CREATE_TEXT_SNACKBAR_ACTION,
  CreateTextSnackbarAction
} from './snackbar-ngrx.actions';
import { SnackbarNgrxService } from '../snackbar-ngrx.service';
import 'rxjs/add/operator/do';

@Injectable()
export class SnackbarNgrxEffects {
  constructor(
    private actions$: Actions<Action>,
    private snackbarNgrxService: SnackbarNgrxService
  ) {}

  @Effect({ dispatch: false })
  public createTextSnackbar(): Observable<Action> {
    return this.actions$
      .ofType(CREATE_TEXT_SNACKBAR_ACTION)
      .do((action: CreateTextSnackbarAction) => {
        this.snackbarNgrxService.createTextSnackbar(action.text, action.config);
      });
  }
}
