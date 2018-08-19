import { Action } from '@ngrx/store';
import { IClarityAlert } from '../clarity-alert.interface';

export const CREATE_TEXT_SNACKBAR_ACTION = '[Snackbar NGRX] Create snackbar';

export class CreateTextSnackbarAction implements Action {
  readonly type = CREATE_TEXT_SNACKBAR_ACTION;

  constructor(public alert: IClarityAlert) {}
}

export type NotificationsActionsUnion = CreateTextSnackbarAction;
