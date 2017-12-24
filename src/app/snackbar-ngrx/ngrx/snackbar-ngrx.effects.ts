import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { CREATE_SNACKBAR_ACTION, CreateSnackbarAction } from './snackbar-ngrx.actions';
import { SnackbarNgrxService } from '../snackbar-ngrx.service';
import 'rxjs/add/operator/do';

@Injectable()
export class SnackbarNgrxEffects {
  constructor(
    private actions$: Actions<Action>,
    private snackbarNgrxService: SnackbarNgrxService
  ) {}

  @Effect({ dispatch: false })
  public createSnackbar(): Observable<Action> {
    return this.actions$
      .ofType(CREATE_SNACKBAR_ACTION)
      .do((action: CreateSnackbarAction) => {
        this.snackbarNgrxService.createSnackbar(action.text);
      });
  }
}
