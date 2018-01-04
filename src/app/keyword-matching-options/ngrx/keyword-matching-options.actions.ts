import { Action } from '@ngrx/store';

export const COPY_ALL_KEYWORDS_ACTION = '[KeywordMatchingOptions] Copy all keywords';
export const PASTE_KEYWORDS_ACTION = '[KeywordMatchingOptions] Paste keywords';

export class CopyAllKeywordsAction implements Action {
  readonly type = COPY_ALL_KEYWORDS_ACTION;

  constructor(public payload: { adgroupId: string }) {}
}

export class PasteKeywordsAction implements Action {
  readonly type = PASTE_KEYWORDS_ACTION;

  constructor(public payload: { adgroupId: string, text: string }) {}
}

export type KeywordMatchingOptionsActions =
  CopyAllKeywordsAction |
  PasteKeywordsAction;
