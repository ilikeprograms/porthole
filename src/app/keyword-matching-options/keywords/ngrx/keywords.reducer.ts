import { IKeywordState } from './keywords-state.interface';
import { KeywordsDefaultState } from './keywords-default.state';
import { KeywordActionTypes, KeywordsActionsUnion } from './keywords.actions';
import { keywordsAdapter } from './keywords.adapter';
import { AdgroupActionTypes, DeleteAdgroupAction } from '../../adgroups/ngrx/adgroup.actions';
import {
  ImportFromChromeStorage,
  KeywordMatchingOptionsActionTypes
} from '../../ngrx/keyword-matching-options.actions';

export function keywordsReducer(state: IKeywordState = KeywordsDefaultState, action: KeywordsActionsUnion | DeleteAdgroupAction | ImportFromChromeStorage) {
  switch (action.type) {
    case KeywordMatchingOptionsActionTypes.IMPORT_FROM_CHROME_STORAGE:
      return Object.assign({}, state, {
        ids: action.payload.keywordMatchingOptions.keywords.ids,
        entities: action.payload.keywordMatchingOptions.keywords.entities,
      });
    case KeywordActionTypes.ADD_KEYWORD:
      return keywordsAdapter.addOne(action.payload.keyword, state);
    case KeywordActionTypes.EDIT_KEYWORD:
    case KeywordActionTypes.EDIT_KEYWORD_MODIFIER:
      return keywordsAdapter.updateOne(action.payload.keyword, state);
    case AdgroupActionTypes.DELETE_ADGROUP:
      const adgroupKeywords: Array<string> = [...state.ids as string[]].filter((keywordId: string) => {
        return state.entities[keywordId].adgroupId === action.payload.id;
      });

      return keywordsAdapter.removeMany(adgroupKeywords, state);
    case KeywordActionTypes.REMOVE_SELECTED_KEYWORDS_ACTION:
      return keywordsAdapter.removeMany(action.ids, state);
    case KeywordActionTypes.REMOVE_ALL_KEYWORDS_ACTION:
      const adgroupKeywordsToRemoveAll: Array<string> = [...state.ids as string[]].filter((keywordId: string) => {
        return state.entities[keywordId].adgroupId === action.adgroupId;
      });

      return keywordsAdapter.removeMany(adgroupKeywordsToRemoveAll, state);
    case KeywordActionTypes.CHANGE_ADGROUP:
    case KeywordActionTypes.CHANGE_MODIFIER:
      return keywordsAdapter.updateMany(action.payload.keywords, state);
    default:
      return {
        ...state
      };
  }
}
