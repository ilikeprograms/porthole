import { Action } from '@ngrx/store';

import { KeywordModifiers } from '../keyword-modifier-enum';

export const ADD_KEYWORD_ACTION = '[KeywordMatchingOptions] Add keyword';
export const EDIT_KEYWORD_TEXT_ACTION = '[KeywordMatchingOptions] Edit keyword';
export const REMOVE_KEYWORD_ACTION = '[KeywordMatchingOptions] Remove keyword';
export const REMOVE_SELECTED_KEYWORD_ACTION = '[KeywordMatchingOptions] Remove selected keyword';
export const REMOVE_ALL_KEYWORDS_ACTION = '[KeywordMatchingOptions] Remove all keyword';
export const TOGGLE_KEYWORD_SELECTED_ACTION = '[KeywordMatchingOptions] Toggle keyword selected';
export const CHANGE_NEW_KEYWORD_OPTION_ACTION = '[KeywordMatchingOptions] Change new keyword option';
export const TOGGLE_KEYWORD_ALL_SELECTED_ACTION = '[KeywordMatchingOptions] Toggle keyword all selected option';
export const COPY_ALL_KEYWORDS_ACTION = '[KeywordMatchingOptions] Copy all keywords';

export class AddKeywordAction implements Action {
  readonly type = ADD_KEYWORD_ACTION;

  constructor(public id: string) {}
}

export class EditKeywordTextAction implements Action {
  readonly type = EDIT_KEYWORD_TEXT_ACTION;

  constructor(public id: string, public text: string) {}
}

export class RemoveKeywordAction implements Action {
  readonly type = REMOVE_KEYWORD_ACTION;

  constructor(public id: string) {}
}

export class RemoveSelectedKeywordsAction implements Action {
  readonly type = REMOVE_SELECTED_KEYWORD_ACTION;
}

export class RemoveAllKeywordsAction implements Action {
  readonly type = REMOVE_ALL_KEYWORDS_ACTION;
}

export class ToggleKeywordSelectedAction implements Action {
  readonly type = TOGGLE_KEYWORD_SELECTED_ACTION;

  constructor(public payload: string) {}
}

export class ChangeNewKeywordOptionAction implements Action {
  readonly type = CHANGE_NEW_KEYWORD_OPTION_ACTION;

  constructor(public payload: KeywordModifiers) {}
}

export class ToggleKeywordAllSelectedAction implements Action {
  readonly type = TOGGLE_KEYWORD_ALL_SELECTED_ACTION;
}

export class CopyAllKeywordsAction implements Action {
  readonly type = COPY_ALL_KEYWORDS_ACTION;
}

export type KeywordMatchingOptionsActions = AddKeywordAction |
  EditKeywordTextAction |
  RemoveKeywordAction |
  RemoveSelectedKeywordsAction |
  RemoveAllKeywordsAction |
  ToggleKeywordSelectedAction |
  ChangeNewKeywordOptionAction |
  ToggleKeywordAllSelectedAction |
  CopyAllKeywordsAction;
