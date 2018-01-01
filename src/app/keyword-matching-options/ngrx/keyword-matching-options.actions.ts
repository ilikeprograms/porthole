import { Action } from '@ngrx/store';

import { KeywordModifiers } from '../keyword-modifier-enum';

export const ADD_KEYWORD_ACTION = '[KeywordMatchingOptions] Add keyword';
export const EDIT_KEYWORD_TEXT_ACTION = '[KeywordMatchingOptions] Edit keyword text';
export const EDIT_KEYWORD_MODIFIER_ACTION = '[KeywordMatchingOptions] Edit keyword modifier';
export const REMOVE_KEYWORD_ACTION = '[KeywordMatchingOptions] Remove keyword';
export const REMOVE_SELECTED_KEYWORD_ACTION = '[KeywordMatchingOptions] Remove selected keyword';
export const REMOVE_ALL_KEYWORDS_ACTION = '[KeywordMatchingOptions] Remove all keyword';
export const TOGGLE_KEYWORD_SELECTED_ACTION = '[KeywordMatchingOptions] Toggle keyword selected';
export const CHANGE_NEW_KEYWORD_OPTION_ACTION = '[KeywordMatchingOptions] Change new keyword option';
export const TOGGLE_KEYWORD_ALL_SELECTED_ACTION = '[KeywordMatchingOptions] Toggle keyword all selected option';
export const COPY_ALL_KEYWORDS_ACTION = '[KeywordMatchingOptions] Copy all keywords';
export const PASTE_KEYWORDS_ACTION = '[KeywordMatchingOptions] Paste keywords';
export const ADD_CLIENT_ACTION = '[KeywordMatchingOptions] Add client';
export const EDIT_CLIENT_ACTION = '[KeywordMatchingOptions] Edit client';
export const DELETE_CLIENT_ACTION = '[KeywordMatchingOptions] Delete client';
export const ADD_CAMPAIGN_ACTION = '[KeywordMatchingOptions] Add campaign';
export const EDIT_CAMPAIGN_ACTION = '[KeywordMatchingOptions] Edit campaign';
export const DELETE_CAMPAIGN_ACTION = '[KeywordMatchingOptions] Delete campaign';
export const ADD_ADGROUP_ACTION = '[KeywordMatchingOptions] Add ad group';
export const EDIT_ADGROUP_ACTION = '[KeywordMatchingOptions] Edit ad group';
export const DELETE_ADGROUP_ACTION = '[KeywordMatchingOptions] Delete ad group';

export class AddKeywordAction implements Action {
  readonly type = ADD_KEYWORD_ACTION;

  constructor(public addroupId: string, public text: string, public modifier?: KeywordModifiers) {}
}

export class EditKeywordTextAction implements Action {
  readonly type = EDIT_KEYWORD_TEXT_ACTION;

  constructor(public id: string, public text: string) {}
}

export class EditKeywordModifierAction implements Action {
  readonly type = EDIT_KEYWORD_MODIFIER_ACTION;

  constructor(public id: string, public modifier: KeywordModifiers) {}
}

export class RemoveKeywordAction implements Action {
  readonly type = REMOVE_KEYWORD_ACTION;

  constructor(public addgroupId: string, public id: string) {}
}

export class RemoveSelectedKeywordsAction implements Action {
  readonly type = REMOVE_SELECTED_KEYWORD_ACTION;

  constructor(public addgroupId: string) {}
}

export class RemoveAllKeywordsAction implements Action {
  readonly type = REMOVE_ALL_KEYWORDS_ACTION;

  constructor(public addgroupId: string) {}
}

export class ToggleKeywordSelectedAction implements Action {
  readonly type = TOGGLE_KEYWORD_SELECTED_ACTION;

  constructor(public id: string) {}
}

export class ChangeNewKeywordOptionAction implements Action {
  readonly type = CHANGE_NEW_KEYWORD_OPTION_ACTION;

  constructor(public addgroupId: string, public payload: KeywordModifiers) {}
}

export class ToggleKeywordAllSelectedAction implements Action {
  readonly type = TOGGLE_KEYWORD_ALL_SELECTED_ACTION;

  constructor(public addgroupId: string) {}
}

export class CopyAllKeywordsAction implements Action {
  readonly type = COPY_ALL_KEYWORDS_ACTION;

  constructor(public adgroupId: string) {}
}

export class PasteKeywordsAction implements Action {
  readonly type = PASTE_KEYWORDS_ACTION;

  constructor(public addroupId: string, public text: string) {}
}

export class AddClientAction implements Action {
  readonly type = ADD_CLIENT_ACTION;

  constructor(public name: string) {}
}

export class EditClientAction implements Action {
  readonly type = EDIT_CLIENT_ACTION;

  constructor(public id: string, public name: string) {}
}

export class DeleteClientAction implements Action {
  readonly type = DELETE_CLIENT_ACTION;

  constructor(public id: string) {}
}

export class AddCampaign implements Action {
  readonly type = ADD_CAMPAIGN_ACTION;

  constructor(public clientId: string, public name: string) {}
}

export class EditCampaign implements Action {
  readonly type = EDIT_CAMPAIGN_ACTION;

  constructor(public id: string, public name: string) {}
}

export class DeleteCampaignsAction implements Action {
  readonly type = DELETE_CAMPAIGN_ACTION;

  constructor(public id: string, public shouldDeleteAdgroups: boolean) {}
}

export class AddAdgroupAction implements Action {
  readonly type = ADD_ADGROUP_ACTION;

  constructor(public name: string, public campaignId?: string) {}
}

export class EditAdgroupAction implements Action {
  readonly type = EDIT_ADGROUP_ACTION;

  constructor(public id: string, public name: string, public campaignId: string) {}
}

export class DeleteAdgroupAction implements Action {
  readonly type = DELETE_ADGROUP_ACTION;

  constructor(public id: string) {}
}

export type KeywordMatchingOptionsActions = AddKeywordAction |
  EditKeywordTextAction |
  EditKeywordModifierAction |
  RemoveKeywordAction |
  RemoveSelectedKeywordsAction |
  RemoveAllKeywordsAction |
  ToggleKeywordSelectedAction |
  ChangeNewKeywordOptionAction |
  ToggleKeywordAllSelectedAction |
  CopyAllKeywordsAction |
  PasteKeywordsAction |
  AddClientAction |
  EditClientAction |
  DeleteClientAction |
  AddCampaign |
  EditCampaign |
  DeleteCampaignsAction |
  AddAdgroupAction |
  EditAdgroupAction |
  DeleteAdgroupAction;
