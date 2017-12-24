import { Action } from '@ngrx/store';

export const CREATE_SNACKBAR_ACTION = '[Snackbar NGRX] Create snackbar';

export class CreateSnackbarAction implements Action {
  readonly type = CREATE_SNACKBAR_ACTION;

  constructor(public text: string) {}
}

export type SnackbardNgrxActions = CreateSnackbarAction;
