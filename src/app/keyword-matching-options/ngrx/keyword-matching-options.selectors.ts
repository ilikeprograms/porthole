import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IKeywordMatchingOptionsState } from './keyword-matching-options-state.interface';

const selectFeature = createFeatureSelector<IKeywordMatchingOptionsState>('keywordMatchingOptions');
export const selectKeywords = createSelector(selectFeature, (state: IKeywordMatchingOptionsState) => state.keywords);
export const selectMatchOption = createSelector(selectFeature, (state: IKeywordMatchingOptionsState) => state.matchOption);
