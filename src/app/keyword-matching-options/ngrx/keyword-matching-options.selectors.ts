import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IKeywordMatchingOptionsState } from './keyword-matching-options-state.interface';

const selectFeature = createFeatureSelector<IKeywordMatchingOptionsState>('keywordMatchingOptions');
export const selectAdgroups = createSelector(selectFeature, (state: IKeywordMatchingOptionsState) => state.keywordMatchingOptions.adgroups.ids.map((adgroupId: string) => {
  return state.keywordMatchingOptions.adgroups.entities[adgroupId];
}));
export const selectKeywords = createSelector(selectFeature, (state: IKeywordMatchingOptionsState) => Object.keys(state.keywordMatchingOptions.keywords).map((keywordId: string) => {
  return state.keywordMatchingOptions.keywords[keywordId];
}));
