import { clientsAdapter } from './clients.adapter';
import { IClientsState } from './clients-state.interface';

export const ClientsDefaultState: IClientsState = clientsAdapter.getInitialState({
  ids: [],
  entities: {}
});
