import { IAdgroupState } from './adgroups-state.interface';
import { AdgroupDefaultState } from './adgroup-default.state';

import { AdgroupActionsUnion, AdgroupActionTypes } from './adgroup.actions';
import { adgroupAdapter } from './adgroups.adapter';
import { IMPORT_FROM_CHROME_STORAGE, ImportFromChromeStorage } from '../../ngrx/keyword-matching-options.actions';

export function adgroupReducer(state: IAdgroupState = AdgroupDefaultState, action: AdgroupActionsUnion | ImportFromChromeStorage) {
  switch (action.type) {
    case IMPORT_FROM_CHROME_STORAGE:
      return Object.assign({}, state, {
        ids: action.payload.keywordMatchingOptions.adgroups.ids,
        entities: action.payload.keywordMatchingOptions.adgroups.entities,
      });
    case AdgroupActionTypes.ADD_ADGROUP:
      return adgroupAdapter.addOne(action.payload.adgroup, state);
    // case KeywordActionTypes.CHANGE_NEW_KEYWORD_OPTION_ACTION:
    case AdgroupActionTypes.EDIT_ADGROUP:
      return adgroupAdapter.updateOne(action.payload.adgroup, state);
    case AdgroupActionTypes.DELETE_ADGROUP:
      return adgroupAdapter.removeOne(action.payload.id, state);
    default:
      return state;
  }
}
