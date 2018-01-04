import { Action } from '@ngrx/store';
import { IClient } from '../client.interface';
import { Update } from '@ngrx/entity/src/models';

export const ADD_CLIENT_ACTION = '[KeywordMatchingOptions] Add client';
export const EDIT_CLIENT_ACTION = '[KeywordMatchingOptions] Edit client';
export const DELETE_CLIENT_ACTION = '[KeywordMatchingOptions] Delete client';

export class AddClientAction implements Action {
  readonly type = ADD_CLIENT_ACTION;

  constructor(public payload: { client: IClient }) {}
}

export class EditClientAction implements Action {
  readonly type = EDIT_CLIENT_ACTION;

  constructor(public payload: { client: Update<IClient> }) {}
}

export class DeleteClientAction implements Action {
  readonly type = DELETE_CLIENT_ACTION;

  constructor(public payload: { id: string }) {}
}

export type ClientActions = AddClientAction |
  EditClientAction |
  DeleteClientAction;
