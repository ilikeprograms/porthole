import { Action } from '@ngrx/store';

import { IAppState } from '../../ngrx/app-state.interface';
import { IKeyword } from '../keywords/keyword.interface';

export const IMPORT_FROM_CHROME_STORAGE = '[KeywordMatchingOptions] Import from Chrome storage';
export const COPY_KEYWORDS_ACTION = '[KeywordMatchingOptions] Copy keywords';
export const COPY_NEGATIVE_KEYWORDS_ACTION = '[KeywordMatchingOptions] Copy negative keywords';
export const PASTE_KEYWORDS_ACTION = '[KeywordMatchingOptions] Paste keywords';
export const PASTE_NEGATIVE_KEYWORDS_ACTION = '[KeywordMatchingOptions] Paste negative keywords';

export enum KeywordMatchingOptionsActionTypes {
  IMPORT_FROM_CHROME_STORAGE = '[Keywords] Import from Chrome storage',
  COPY_KEYWORDS = '[Keywords] Copy keywords',
  COPY_NEGATIVE_KEYWORDS = '[Keywords] Copy negative keywords',
  PASTE_KEYWORDS = '[Keywords] Paste keywords',
  PASTE_NEGATIVE_KEYWORDS = '[Keywords] Paste negative keywords',
  EXPORT_KEYWORDS = '[Keywords] Export keywords'
}

export class ImportFromChromeStorage implements Action {
  readonly type = KeywordMatchingOptionsActionTypes.IMPORT_FROM_CHROME_STORAGE;

  constructor(public payload: IAppState) {}
}

export class CopyKeywordsAction implements Action {
  readonly type = KeywordMatchingOptionsActionTypes.COPY_KEYWORDS;

  constructor(public payload: { adgroupId: string }) {}
}

export class CopyNegativeKeywordsAction implements Action {
  readonly type = KeywordMatchingOptionsActionTypes.COPY_NEGATIVE_KEYWORDS;

  constructor(public payload: { adgroupId: string }) {}
}

export class PasteKeywordsAction implements Action {
  readonly type = KeywordMatchingOptionsActionTypes.PASTE_KEYWORDS;

  constructor(public payload: { adgroupId: string, text: string }) {}
}

export class PasteNegativeKeywordsAction implements Action {
  readonly type = KeywordMatchingOptionsActionTypes.PASTE_NEGATIVE_KEYWORDS;

  constructor(public payload: { adgroupId: string, text: string }) {}
}

export class ExportKeywordsAction implements Action {
  readonly type = KeywordMatchingOptionsActionTypes.EXPORT_KEYWORDS;

  constructor(public campaignName: string, public adgroupName: string, public keywords: Array<IKeyword>) {}
}
