import { IKeywordState } from './keywords-state.interface';
import { KeywordsDefaultState } from './keywords-default.state';
import {
  ADD_KEYWORD_ACTION,
  EDIT_KEYWORD_MODIFIER_ACTION,
  EDIT_KEYWORD_TEXT_ACTION,
  KeywordsActions, REMOVE_ALL_KEYWORDS_ACTION,
  REMOVE_SELECTED_KEYWORDS_ACTION,
} from './keywords.actions';
import { keywordsAdapter } from './keywords.adapter';
import { DELETE_ADGROUP_ACTION, DeleteAdgroupAction } from '../../adgroups/ngrx/adgroup.actions';
import { IMPORT_FROM_CHROME_STORAGE, ImportFromChromeStorage } from '../../ngrx/keyword-matching-options.actions';

export function keywordsReducer(state: IKeywordState = KeywordsDefaultState, action: KeywordsActions | DeleteAdgroupAction| ImportFromChromeStorage) {
  switch (action.type) {
    case IMPORT_FROM_CHROME_STORAGE:
      return Object.assign({}, state, {
        ids: action.payload.keywordMatchingOptions.keywords.ids,
        entities: action.payload.keywordMatchingOptions.keywords.entities,
      });
    case ADD_KEYWORD_ACTION:
      return keywordsAdapter.addOne(action.payload.keyword, state);
    case EDIT_KEYWORD_TEXT_ACTION:
    case EDIT_KEYWORD_MODIFIER_ACTION:
      return keywordsAdapter.updateOne(action.payload.keyword, state);
    case DELETE_ADGROUP_ACTION:
      const adgroupKeywords: Array<string> = [...state.ids as string[]].filter((keywordId: string) => {
        return state.entities[keywordId].adgroupId === action.payload.id;
      });

      return keywordsAdapter.removeMany(adgroupKeywords, state);
    case REMOVE_SELECTED_KEYWORDS_ACTION:
      return keywordsAdapter.removeMany(action.ids, state);
    case REMOVE_ALL_KEYWORDS_ACTION:
      const adgroupKeywordsToRemoveAll: Array<string> = [...state.ids as string[]].filter((keywordId: string) => {
        return state.entities[keywordId].adgroupId === action.adgroupId;
      });

      return keywordsAdapter.removeMany(adgroupKeywordsToRemoveAll, state);
    default:
      return {
        ...state
      };
  }
}
