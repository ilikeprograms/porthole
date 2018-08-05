import { Action } from '@ngrx/store';
import { MatSnackBarConfig } from '@angular/material';

export const CREATE_TEXT_SNACKBAR_ACTION = '[Snackbar NGRX] Create snackbar';

export class CreateTextSnackbarAction implements Action {
  readonly type = CREATE_TEXT_SNACKBAR_ACTION;

  constructor(public text: string, public config?: MatSnackBarConfig) {}
}

export type SnackbardNgrxActions = CreateTextSnackbarAction;
