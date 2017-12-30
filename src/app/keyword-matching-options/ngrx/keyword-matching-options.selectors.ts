import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IKeywordMatchingOptionsState } from './keyword-matching-options-state.interface';
import { IKeyword } from '../keyword.interface';
import { IClient } from '../client.interface';
import { ICampaign } from '../campaign.interface';

const selectFeature = createFeatureSelector<IKeywordMatchingOptionsState>('keywordMatchingOptions');
export const selectClients = createSelector(selectFeature, (state: IKeywordMatchingOptionsState) => state.clients);
export const selectCampaigns = createSelector(selectFeature, (state: IKeywordMatchingOptionsState) => state.campaigns);
export const selectKeywords = createSelector(selectFeature, (state: IKeywordMatchingOptionsState) => state.keywords);
