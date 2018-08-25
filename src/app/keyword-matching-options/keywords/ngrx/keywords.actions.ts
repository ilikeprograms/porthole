import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity/src/models';

import { IKeyword } from '../keyword.interface';

export enum KeywordActionTypes {
  ADD_KEYWORD = '[Keywords] Add keyword',
  EDIT_KEYWORD = '[Keywords] Edit keyword',
  EDIT_KEYWORD_MODIFIER = '[Keywords] Edit keyword modifier',
  REMOVE_SELECTED_KEYWORDS_ACTION = '[Keywords] Remove selected keywords',
  REMOVE_ALL_KEYWORDS_ACTION = '[Keywords] Remove all keywords',
  CHANGE_NEW_KEYWORD_OPTION_ACTION = '[Keywords] Change new keyword option',
  CHANGE_ADGROUP = '[Keywords] Change adgroup',
  CHANGE_MODIFIER = '[Keywords] Change modifier'
}

export class AddKeywordAction implements Action {
  readonly type = KeywordActionTypes.ADD_KEYWORD;

  constructor(public payload: { keyword: IKeyword }) {}
}

export class EditKeywordAction implements Action {
  readonly type = KeywordActionTypes.EDIT_KEYWORD;

  constructor(public payload: { keyword: Update<IKeyword> }) {}
}

export class EditKeywordModifierAction implements Action {
  readonly type = KeywordActionTypes.EDIT_KEYWORD_MODIFIER;

  constructor(public payload: { keyword: Update<IKeyword> }) {}
}

export class RemoveSelectedKeywordsAction implements Action {
  readonly type = KeywordActionTypes.REMOVE_SELECTED_KEYWORDS_ACTION;

  constructor(public ids: Array<string>) {}
}

export class RemoveAllKeywordsAction implements Action {
  readonly type = KeywordActionTypes.REMOVE_ALL_KEYWORDS_ACTION;

  constructor(public adgroupId: string) {}
}

export class ChangeAdgroupAction implements Action {
  readonly type = KeywordActionTypes.CHANGE_ADGROUP;

  constructor(public payload: { keywords: Array<Update<IKeyword>> }) {}
}

export class ChangeModifierAction implements Action {
  readonly type = KeywordActionTypes.CHANGE_MODIFIER;

  constructor(public payload: { keywords: Array<Update<IKeyword>> }) {}
}

export type KeywordsActionsUnion = AddKeywordAction |
  EditKeywordAction |
  EditKeywordModifierAction |
  RemoveSelectedKeywordsAction |
  RemoveAllKeywordsAction |
  ChangeAdgroupAction |
  ChangeModifierAction;
