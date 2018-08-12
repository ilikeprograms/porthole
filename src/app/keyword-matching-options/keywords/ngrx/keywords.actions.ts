import { Action } from '@ngrx/store';
import { IKeyword } from '../keyword.interface';
import { Update } from '@ngrx/entity/src/models';

export const ADD_KEYWORD_ACTION = '[KeywordMatchingOptions] Add keyword';
export const EDIT_KEYWORD_TEXT_ACTION = '[KeywordMatchingOptions] Edit keyword text';
export const EDIT_KEYWORD_MODIFIER_ACTION = '[KeywordMatchingOptions] Edit keyword modifier';
export const REMOVE_SELECTED_KEYWORDS_ACTION = '[KeywordMatchingOptions] Remove selected keywords';
export const CHANGE_NEW_KEYWORD_OPTION_ACTION = '[KeywordMatchingOptions] Change new keyword option';

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

export class RemoveSelectedKeywordsAction implements Action {
  readonly type = REMOVE_SELECTED_KEYWORDS_ACTION;

  constructor(public ids: Array<string>) {}
}

export type KeywordsActions = AddKeywordAction |
  EditKeywordTextAction |
  EditKeywordModifierAction |
  RemoveSelectedKeywordsAction;
