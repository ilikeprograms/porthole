import { IKeywordMatchingOptionsState } from '../keyword-matching-options/ngrx/keyword-matching-options-state.interface';
import { INotificationsState } from '../notifications/ngrx/notifications.state';

export interface IAppState {
  keywordMatchingOptions: IKeywordMatchingOptionsState;
  notifications?: INotificationsState;
}
