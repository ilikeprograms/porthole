import { createFeatureSelector, createSelector } from '@ngrx/store';

import { campaignsAdapter } from './campaigns.adapter';
import { IKeywordMatchingOptionsState } from '../../ngrx/keyword-matching-options-state.interface';
import { IAppState } from '../../../ngrx/app-state.interface';

const {
  selectAll: selectAll
} = campaignsAdapter.getSelectors();

const selectFeature = (state: IAppState) => {
  return state.keywordMatchingOptions;
};

export const selectCampaignsState = createSelector(selectFeature, (state: IKeywordMatchingOptionsState) => state.campaigns);
export const selectAllCampaigns = createSelector(selectCampaignsState, selectAll);
