import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity/src/models';

import { IAdgroup } from '../adgroup-interface';
import { CHANGE_NEW_KEYWORD_OPTION_ACTION } from '../../keywords/ngrx/keywords.actions';
import { KeywordModifiers } from '../../keywords/keyword-modifier-enum';

export const ADD_ADGROUP_ACTION = '[KeywordMatchingOptions] Add ad group';
export const EDIT_ADGROUP_ACTION = '[KeywordMatchingOptions] Edit ad group';
export const DELETE_ADGROUP_ACTION = '[KeywordMatchingOptions] Delete ad group';

export class AddAdgroupAction implements Action {
  readonly type = ADD_ADGROUP_ACTION;

  constructor(public payload: { adgroup: IAdgroup }) {}
}

export class EditAdgroupAction implements Action {
  readonly type = EDIT_ADGROUP_ACTION;

  constructor(public payload: { adgroup: Update<IAdgroup> }) {}
}

export class DeleteAdgroupAction implements Action {
  readonly type = DELETE_ADGROUP_ACTION;

  constructor(public payload: { id: string }) {}
}

export class ChangeNewKeywordOptionAction implements Action {
  readonly type = CHANGE_NEW_KEYWORD_OPTION_ACTION;

  constructor(public payload: { adgroup: Update<IAdgroup> }) {}
}

export type AdgroupActions = AddAdgroupAction |
  EditAdgroupAction |
  DeleteAdgroupAction |
  ChangeNewKeywordOptionAction;
