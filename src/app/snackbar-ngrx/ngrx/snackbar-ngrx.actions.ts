import { Action } from '@ngrx/store';

export const CREATE_TEXT_SNACKBAR_ACTION = '[Snackbar NGRX] Create snackbar';

export class CreateTextSnackbarAction implements Action {
  readonly type = CREATE_TEXT_SNACKBAR_ACTION;

  constructor(public text: string, public config?: any) {}
}

export type SnackbardNgrxActions = CreateTextSnackbarAction;
