import { IKeywordState } from './keywords-state.interface';
import { KeywordsDefaultState } from './keywords-default.state';
import { IKeyword } from '../keyword.interface';
import {
  ADD_KEYWORD_ACTION, EDIT_KEYWORD_MODIFIER_ACTION, EDIT_KEYWORD_TEXT_ACTION,
  KeywordsActions, REMOVE_ALL_KEYWORDS_ACTION, REMOVE_KEYWORD_ACTION, REMOVE_SELECTED_KEYWORD_ACTION,
  TOGGLE_KEYWORD_ALL_SELECTED_ACTION,
  TOGGLE_KEYWORD_SELECTED_ACTION
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
    case REMOVE_KEYWORD_ACTION:
        return keywordsAdapter.removeOne(action.payload.id, state);
    case DELETE_ADGROUP_ACTION:
      const adgroupKeywords: Array<string> = [...state.ids as string[]].filter((keywordId: string) => {
        return state.entities[keywordId].adgroupId === action.payload.id;
      });

      return keywordsAdapter.removeMany(adgroupKeywords, state);
    case REMOVE_SELECTED_KEYWORD_ACTION:
      const idsToRemove: Array<string> = [];

      [...state.ids].forEach((keywordId: string) => {
        if (state.entities[keywordId].selected && state.entities[keywordId].adgroupId === action.payload.adgroupId) {
          idsToRemove.push(keywordId);
        }
      });

      return keywordsAdapter.removeMany(idsToRemove, state);
    case REMOVE_ALL_KEYWORDS_ACTION:
      const idsToRemoveAll: Array<string> = [];

      [...state.ids].forEach((keywordId: string) => {
        if (state.entities[keywordId].adgroupId === action.payload.adgroupId) {
          idsToRemoveAll.push(keywordId);
        }
      });

      return keywordsAdapter.removeMany(idsToRemoveAll, state);
    case TOGGLE_KEYWORD_SELECTED_ACTION:
      const currentKeyword: IKeyword = state.entities[action.payload.id];

      return keywordsAdapter.updateOne({
        id: action.payload.id,
        changes: {
          selected: !currentKeyword.selected
        }
      }, state);
    case TOGGLE_KEYWORD_ALL_SELECTED_ACTION:
      const keywordsToAllToggleSelected: Array<string> = [];
      const anySelected: boolean = [...state.ids].some((keywordToToggleId: string) => {
        if (state.entities[keywordToToggleId].adgroupId !== action.payload.adgroupId) {
          return false;
        }

        return state.entities[keywordToToggleId].selected;
      });

      [...state.ids].forEach((keywordToToggleId: string) => {
        if (state.entities[keywordToToggleId].adgroupId === action.payload.adgroupId) {
          keywordsToAllToggleSelected.push(keywordToToggleId);
        }
      });

      return keywordsAdapter.updateMany(keywordsToAllToggleSelected.map((keywordId: string) => {
        return {
          id: keywordId,
          changes: {
            selected: !anySelected
          }
        };
      }), state);
    default:
      return {
        ...state
      };
  }
}
