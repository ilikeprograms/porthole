import { Action } from '@ngrx/store';
import { IKeyword } from '../keyword.interface';
import { Update } from '@ngrx/entity/src/models';

export const ADD_KEYWORD_ACTION = '[KeywordMatchingOptions] Add keyword';
export const EDIT_KEYWORD_TEXT_ACTION = '[KeywordMatchingOptions] Edit keyword text';
export const EDIT_KEYWORD_MODIFIER_ACTION = '[KeywordMatchingOptions] Edit keyword modifier';
export const REMOVE_KEYWORD_ACTION = '[KeywordMatchingOptions] Remove keyword';
export const REMOVE_SELECTED_KEYWORD_ACTION = '[KeywordMatchingOptions] Remove selected keyword';
export const REMOVE_ALL_KEYWORDS_ACTION = '[KeywordMatchingOptions] Remove all keyword';
export const TOGGLE_KEYWORD_SELECTED_ACTION = '[KeywordMatchingOptions] Toggle keyword selected';
export const CHANGE_NEW_KEYWORD_OPTION_ACTION = '[KeywordMatchingOptions] Change new keyword option';
export const TOGGLE_KEYWORD_ALL_SELECTED_ACTION = '[KeywordMatchingOptions] Toggle keyword all selected option';

export class AddKeywordAction implements Action {
  readonly type = ADD_KEYWORD_ACTION;

  constructor(public payload: { keyword: IKeyword }) {}
}

export class EditKeywordTextAction implements Action {
  readonly type = EDIT_KEYWORD_TEXT_ACTION;

  constructor(public payload: { keyword: Update<IKeyword> }) {}
}

export class EditKeywordModifierAction implements Action {
  readonly type = EDIT_KEYWORD_MODIFIER_ACTION;

  constructor(public payload: { keyword: Update<IKeyword> }) {}
}

export class RemoveKeywordAction implements Action {
  readonly type = REMOVE_KEYWORD_ACTION;

  constructor(public payload: { id: string }) {}
}

export class RemoveSelectedKeywordsAction implements Action {
  readonly type = REMOVE_SELECTED_KEYWORD_ACTION;

  constructor(public payload: { adgroupId: string }) {}
}

export class RemoveAllKeywordsAction implements Action {
  readonly type = REMOVE_ALL_KEYWORDS_ACTION;

  constructor(public payload: { adgroupId: string }) {}
}

export class ToggleKeywordSelectedAction implements Action {
  readonly type = TOGGLE_KEYWORD_SELECTED_ACTION;

  constructor(public payload: { id: string }) {}
}

export class ToggleKeywordAllSelectedAction implements Action {
  readonly type = TOGGLE_KEYWORD_ALL_SELECTED_ACTION;

  constructor(public payload: { adgroupId: string }) {}
}

export type KeywordsActions = AddKeywordAction |
  EditKeywordTextAction |
  EditKeywordModifierAction |
  RemoveKeywordAction |
  RemoveSelectedKeywordsAction |
  RemoveAllKeywordsAction |
  ToggleKeywordSelectedAction |
  ToggleKeywordAllSelectedAction;
