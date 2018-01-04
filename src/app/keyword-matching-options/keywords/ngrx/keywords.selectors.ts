import { keywordsAdapter } from './keywords.adapter';
import { IAppState } from '../../../ngrx/app-state.interface';
import { createSelector } from '@ngrx/store';
import { IKeywordMatchingOptionsState } from '../../ngrx/keyword-matching-options-state.interface';

const {
  selectAll
} = keywordsAdapter.getSelectors();

const selectFeature = (state: IAppState) => state.keywordMatchingOptions;
export const selectKeywordsState = createSelector(selectFeature, (state: IKeywordMatchingOptionsState) => state.keywords);
export const selectAllKeywords = createSelector(selectKeywordsState, selectAll);
