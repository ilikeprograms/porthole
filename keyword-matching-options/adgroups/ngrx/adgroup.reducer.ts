import { IAdgroupState } from './adgroups-state.interface';
import { AdgroupDefaultState } from './adgroup-default.state';

import { ADD_ADGROUP_ACTION, AdgroupActions, DELETE_ADGROUP_ACTION, EDIT_ADGROUP_ACTION } from './adgroup.actions';
import { adgroupAdapter } from './adgroups.adapter';
import { CHANGE_NEW_KEYWORD_OPTION_ACTION } from '../../keywords/ngrx/keywords.actions';
import { IMPORT_FROM_CHROME_STORAGE, ImportFromChromeStorage } from '../../ngrx/keyword-matching-options.actions';

export function adgroupReducer(state: IAdgroupState = AdgroupDefaultState, action: AdgroupActions | ImportFromChromeStorage) {
  switch (action.type) {
    case IMPORT_FROM_CHROME_STORAGE:
      return Object.assign({}, state, {
        ids: action.payload.keywordMatchingOptions.adgroups.ids,
        entities: action.payload.keywordMatchingOptions.adgroups.entities,
      });
    case ADD_ADGROUP_ACTION:
      return adgroupAdapter.addOne(action.payload.adgroup, state);
    case CHANGE_NEW_KEYWORD_OPTION_ACTION:
    case EDIT_ADGROUP_ACTION:
      return adgroupAdapter.updateOne(action.payload.adgroup, state);
    case DELETE_ADGROUP_ACTION:
      return adgroupAdapter.removeOne(action.payload.id, state);
    default:
      return state;
  }
}
