import { ClientsDefaultState } from './clients-default.state';
import { ADD_CLIENT_ACTION, ClientActions, DELETE_CLIENT_ACTION, EDIT_CLIENT_ACTION } from './clients-actions';
import { IClientsState } from './clients-state.interface';
import { clientsAdapter } from './clients.adapter';

export function clientsReducer(state: IClientsState = ClientsDefaultState, action: ClientActions) {
  switch (action.type) {
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
