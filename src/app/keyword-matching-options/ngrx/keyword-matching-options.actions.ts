import { Action } from '@ngrx/store';

import { IAppState } from '../../ngrx/app-state.interface';

export const IMPORT_FROM_CHROME_STORAGE = '[KeywordMatchingOptions] Import from Chrome storage';
export const COPY_KEYWORDS_ACTION = '[KeywordMatchingOptions] Copy keywords';
export const COPY_NEGATIVE_KEYWORDS_ACTION = '[KeywordMatchingOptions] Copy negative keywords';
export const PASTE_KEYWORDS_ACTION = '[KeywordMatchingOptions] Paste keywords';

export class ImportFromChromeStorage implements Action {
  readonly type = IMPORT_FROM_CHROME_STORAGE;

  constructor(public payload: IAppState) {}
}

export class CopyKeywordsAction implements Action {
  readonly type = COPY_KEYWORDS_ACTION;

  constructor(public payload: { adgroupId: string }) {}
}

export class CopyNegativeKeywordsAction implements Action {
  readonly type = COPY_NEGATIVE_KEYWORDS_ACTION;

  constructor(public payload: { adgroupId: string }) {}
}

export class PasteKeywordsAction implements Action {
  readonly type = PASTE_KEYWORDS_ACTION;

  constructor(public payload: { adgroupId: string, text: string }) {}
}
