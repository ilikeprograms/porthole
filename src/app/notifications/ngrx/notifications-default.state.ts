import { INotificationsState } from './notifications.state';
import { notificationsAdapter } from './notifications.adapter';

export const NotificationsDefaultState: INotificationsState = notificationsAdapter.getInitialState({
  ids: [],
  entities: {}
});
