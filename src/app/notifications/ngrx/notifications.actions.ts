import { Action } from '@ngrx/store';
import { IClarityAlert } from '../clarity-alert.interface';

export const ADD_NOTIFICATION_ACTION = '[Notifications] Add notification';

export class AddNotificationAction implements Action {
  readonly type = ADD_NOTIFICATION_ACTION;

  constructor(public alert: IClarityAlert) {}
}

export type NotificationsActionsUnion = AddNotificationAction;
