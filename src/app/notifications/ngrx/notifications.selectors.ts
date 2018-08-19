import { keywordsAdapter } from '../../keyword-matching-options/keywords/ngrx/keywords.adapter';
import { IAppState } from '../../ngrx/app-state.interface';
import { createSelector } from '@ngrx/store';
import { IKeywordMatchingOptionsState } from '../../keyword-matching-options/ngrx/keyword-matching-options-state.interface';
import { IKeyword } from '../../keyword-matching-options/keywords/keyword.interface';
import { notificationsAdapter } from './notifications.adapter';

const {
  selectAll
} = notificationsAdapter.getSelectors();

const selectFeature = (state: IAppState) => state.notifications;

export const selectAllNotifications = createSelector(selectFeature, selectAll);
