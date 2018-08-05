import { ClientsDefaultState } from './clients-default.state';
import { ADD_CLIENT_ACTION, ClientActions, DELETE_CLIENT_ACTION, EDIT_CLIENT_ACTION } from './clients-actions';
import { IClientsState } from './clients-state.interface';
import { clientsAdapter } from './clients.adapter';
import { IMPORT_FROM_CHROME_STORAGE, ImportFromChromeStorage } from '../../ngrx/keyword-matching-options.actions';

export function clientsReducer(state: IClientsState = ClientsDefaultState, action: ClientActions | ImportFromChromeStorage) {
  switch (action.type) {
    case IMPORT_FROM_CHROME_STORAGE:
      return Object.assign({}, state, {
        ids: action.payload.keywordMatchingOptions.clients.ids,
        entities: action.payload.keywordMatchingOptions.clients.entities,
      });
    case ADD_CLIENT_ACTION:
      return clientsAdapter.addOne(action.payload.client, state);
    case EDIT_CLIENT_ACTION:
      return clientsAdapter.updateOne(action.payload.client, state);
    case DELETE_CLIENT_ACTION:
      return clientsAdapter.removeOne(action.payload.id, state);
    default:
      return state;
  }
}
