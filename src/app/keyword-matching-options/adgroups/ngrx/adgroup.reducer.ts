import { IAdgroupState } from './adgroups-state.interface';
import { AdgroupDefaultState } from './adgroup-default.state';

import { ADD_ADGROUP_ACTION, AdgroupActions, DELETE_ADGROUP_ACTION, EDIT_ADGROUP_ACTION } from './adgroup.actions';
import { adgroupAdapter } from './adgroups.adapter';
import { CHANGE_NEW_KEYWORD_OPTION_ACTION } from '../../keywords/ngrx/keywords.actions';

export function adgroupReducer(state: IAdgroupState = AdgroupDefaultState, action: AdgroupActions) {
  switch (action.type) {
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
