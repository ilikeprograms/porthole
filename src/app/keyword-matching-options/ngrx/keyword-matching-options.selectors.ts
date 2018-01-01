import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IKeywordMatchingOptionsState } from './keyword-matching-options-state.interface';
import { IKeyword } from '../keyword.interface';
import { IClient } from '../client.interface';
import { ICampaign } from '../campaign.interface';

const selectFeature = createFeatureSelector<IKeywordMatchingOptionsState>('keywordMatchingOptions');
export const selectClients = createSelector(selectFeature, (state: IKeywordMatchingOptionsState) => Object.keys(state.clients).map((clientId: string) => {
  return state.clients[clientId];
}));
export const selectCampaigns = createSelector(selectFeature, (state: IKeywordMatchingOptionsState) => Object.keys(state.campaigns).map((campaignId: string) => {
  return state.campaigns[campaignId];
}));
export const selectAdgroups = createSelector(selectFeature, (state: IKeywordMatchingOptionsState) => state.adgroups.ids.map((adgroupId: string) => {
  return state.adgroups.entities[adgroupId];
}));
export const selectKeywords = createSelector(selectFeature, (state: IKeywordMatchingOptionsState) => Object.keys(state.keywords).map((keywordId: string) => {
  return state.keywords[keywordId];
}));
