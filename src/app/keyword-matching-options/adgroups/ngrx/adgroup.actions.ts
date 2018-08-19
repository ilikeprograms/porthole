import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity/src/models';

import { IAdgroup } from '../adgroup-interface';

export enum AdgroupActionTypes {
  ADD_ADGROUP = '[Adgroup] Add ad group',
  EDIT_ADGROUP = '[Adgroup] Edit ad group',
  DELETE_ADGROUP = '[Adgroup] Delete ad group'
}

export class AddAdgroupAction implements Action {
  readonly type = AdgroupActionTypes.ADD_ADGROUP;

  constructor(public payload: { adgroup: IAdgroup }) {}
}

export class EditAdgroupAction implements Action {
  readonly type = AdgroupActionTypes.EDIT_ADGROUP;

  constructor(public payload: { adgroup: Update<IAdgroup> }) {}
}

export class DeleteAdgroupAction implements Action {
  readonly type = AdgroupActionTypes.DELETE_ADGROUP;

  constructor(public payload: { id: string }) {}
}

// export class ChangeNewKeywordOptionAction implements Action {
//   readonly type = CHANGE_NEW_KEYWORD_OPTION_ACTION;
//
//   constructor(public payload: { adgroup: Update<IAdgroup> }) {}
// }

export type AdgroupActionsUnion = AddAdgroupAction |
  EditAdgroupAction |
  DeleteAdgroupAction;
  // ChangeNewKeywordOptionAction;
