import { keywordsAdapter } from './keywords.adapter';
import { IAppState } from '../../../ngrx/app-state.interface';
import { createSelector } from '@ngrx/store';
import { IKeywordMatchingOptionsState } from '../../ngrx/keyword-matching-options-state.interface';
import { IKeyword } from '../keyword.interface';

const {
  selectAll
} = keywordsAdapter.getSelectors();

const selectFeature = (state: IAppState) => state.keywordMatchingOptions;
export const selectKeywordsState = createSelector(selectFeature, (state: IKeywordMatchingOptionsState) => state.keywords);
export const selectAllKeywords = createSelector(selectKeywordsState, selectAll);

export const selectedKeywordsByAdGroupId = (adGroupId: string) => {
  return createSelector(selectAllKeywords, (keywords: Array<IKeyword>) => {
    return keywords.filter((keyword: IKeyword) => keyword.adgroupId === adGroupId);
  });
};

export const selectedKeywordsCountByAdGroupId = (adGroupId: string) => {
  return createSelector(selectedKeywordsByAdGroupId(adGroupId), (keywords: Array<IKeyword>) => {
    return keywords.filter((keyword: IKeyword) => keyword.selected).length;
  });
};

export const keywordsAllSelectedByAdGroupId = (adGroupId: string) => {
  return createSelector(selectedKeywordsByAdGroupId(adGroupId), (keywords: Array<IKeyword>) => {
    return !keywords.some((keyword: IKeyword) => {
      return !keyword.selected;
    });
  });
};
