import { createSelector } from '@ngrx/store';

import { adgroupAdapter } from './adgroups.adapter';
import { IAppState } from '../../../ngrx/app-state.interface';
import { IKeywordMatchingOptionsState } from '../../ngrx/keyword-matching-options-state.interface';
import { IAdgroupState } from './adgroups-state.interface';

const {
  selectAll
} = adgroupAdapter.getSelectors();

const selectFeature = (state: IAppState) => {
  return state.keywordMatchingOptions;
};

export const selectAdroupsState = createSelector(selectFeature, (state: IKeywordMatchingOptionsState) => state.adgroups);
export const selectAllAdgroups = createSelector(selectAdroupsState, selectAll);
export const selectAdgroupById = (id: string) => {
  return createSelector(selectAdroupsState, (state: IAdgroupState) => {
    return state.entities[id];
  });
};
