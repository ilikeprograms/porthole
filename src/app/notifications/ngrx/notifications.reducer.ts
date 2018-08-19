import {
  ADD_NOTIFICATION_ACTION,
  NotificationsActionsUnion
} from './notifications.actions';
import { notificationsAdapter } from './notifications.adapter';
import { INotificationsState } from './notifications.state';
import { NotificationsDefaultState } from './notifications-default.state';

export function notificationsReducer(state: INotificationsState = NotificationsDefaultState, action: NotificationsActionsUnion) {
  switch (action.type) {
    case ADD_NOTIFICATION_ACTION:
      return notificationsAdapter.addOne(action.alert, state);
    default: {
      return {
        ...state
      };
    }
  }
}
