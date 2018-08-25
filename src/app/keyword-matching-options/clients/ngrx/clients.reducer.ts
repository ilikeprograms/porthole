import { ClientsDefaultState } from './clients-default.state';
import { ClientActionsUnion, ClientActionTypes } from './clients.actions';
import { IClientsState } from './clients-state.interface';
import { clientsAdapter } from './clients.adapter';
import {
  ImportFromChromeStorage,
  KeywordMatchingOptionsActionTypes
} from '../../ngrx/keyword-matching-options.actions';

export function clientsReducer(state: IClientsState = ClientsDefaultState, action: ClientActionsUnion | ImportFromChromeStorage) {
  switch (action.type) {
    case KeywordMatchingOptionsActionTypes.IMPORT_FROM_CHROME_STORAGE:
      return Object.assign({}, state, {
        ids: action.payload.keywordMatchingOptions.clients.ids,
        entities: action.payload.keywordMatchingOptions.clients.entities,
      });
    case ClientActionTypes.ADD_CLIENT:
      return clientsAdapter.addOne(action.payload.client, state);
    case ClientActionTypes.EDIT_CLIENT:
      return clientsAdapter.updateOne(action.payload.client, state);
    case ClientActionTypes.DELETE_CLIENT:
      return clientsAdapter.removeOne(action.payload.id, state);
    default:
      return state;
  }
}
