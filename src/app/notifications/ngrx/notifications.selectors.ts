import { createSelector } from '@ngrx/store';

import { IAppState } from '../../ngrx/app-state.interface';
import { notificationsAdapter } from './notifications.adapter';

const {
  selectAll
} = notificationsAdapter.getSelectors();

const selectFeature = (state: IAppState) => state.notifications;

export const selectAllNotifications = createSelector(selectFeature, selectAll);
