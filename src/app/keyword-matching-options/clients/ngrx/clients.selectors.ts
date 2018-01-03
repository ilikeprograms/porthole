import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IClientsState } from './clients-state.interface';
import { clientsAdapter } from './clients.adapter';
import { IKeywordMatchingOptionsState } from '../../ngrx/keyword-matching-options-state.interface';
import { IAppState } from '../../../ngrx/app-state.interface';

const {
  // select the array of user ids
  selectIds: selectUserIds,

  // select the dictionary of user entities
  selectEntities: selectUserEntities,

  // select the array of users
  selectAll: selectAll,

  // select the total user count
  selectTotal: selectUserTotal
} = clientsAdapter.getSelectors();

const selectFeature = (state: IAppState) => {
  return state.keywordMatchingOptions;
};

export const selectClientsState = createSelector(selectFeature, (state: IKeywordMatchingOptionsState) => state.clients);
export const selectAllClients = createSelector(selectClientsState, selectAll);
