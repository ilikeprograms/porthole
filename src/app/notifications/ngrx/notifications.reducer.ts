import {
  ImportFromChromeStorage
} from '../../keyword-matching-options/ngrx/keyword-matching-options.actions';
import {
  CREATE_TEXT_SNACKBAR_ACTION,
  NotificationsActionsUnion
} from './notifications.actions';
import { notificationsAdapter } from './notifications.adapter';
import { INotificationsState } from './notifications.state';
import { NotificationsDefaultState } from './notifications-default.state';

export function notificationsReducer(state: INotificationsState = NotificationsDefaultState, action: NotificationsActionsUnion | ImportFromChromeStorage) {
  switch (action.type) {
    case CREATE_TEXT_SNACKBAR_ACTION:
      return notificationsAdapter.addOne(action.alert, state);
    default: {
      return {
        ...state
      };
    }
  }
}
