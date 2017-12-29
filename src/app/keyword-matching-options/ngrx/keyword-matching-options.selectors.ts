import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IKeywordMatchingOptionsState } from './keyword-matching-options-state.interface';
import { IKeyword } from '../keyword.interface';

const selectFeature = createFeatureSelector<IKeywordMatchingOptionsState>('keywordMatchingOptions');
export const selectClients = createSelector(selectFeature, (state: IKeywordMatchingOptionsState) => state.clients);
export const selectKeywords = createSelector(selectFeature, (state: IKeywordMatchingOptionsState) => state.keywords);
// export const selectMatchOption = createSelector(selectFeature, (state: IKeywordMatchingOptionsState) => state.matchOption);
//
// export const selectKeywordsByClientId = (clientId: string) => {
//   return createSelector(
//     selectKeywords,
//     (keywords: Array<IKeyword>) => keywords.filter((keyword: IKeyword) => keyword.clientId === clientId)
//   );
// };
