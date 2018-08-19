import { Action } from '@ngrx/store';
import { IClient } from '../client.interface';
import { Update } from '@ngrx/entity/src/models';

export enum ClientActionTypes {
  ADD_CLIENT = '[Client] Add client',
  EDIT_CLIENT = '[Client] Edit client',
  DELETE_CLIENT = '[Client] Delete client'
}

export class AddClientAction implements Action {
  readonly type = ClientActionTypes.ADD_CLIENT;

  constructor(public payload: { client: IClient }) {}
}

export class EditClientAction implements Action {
  readonly type = ClientActionTypes.EDIT_CLIENT;

  constructor(public payload: { client: Update<IClient> }) {}
}

export class DeleteClientAction implements Action {
  readonly type = ClientActionTypes.DELETE_CLIENT;

  constructor(public payload: { id: string }) {}
}

export type ClientActionsUnion = AddClientAction |
  EditClientAction |
  DeleteClientAction;
