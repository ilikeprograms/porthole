
import { empty, Observable, of } from 'rxjs';

import { mergeMap, withLatestFrom, switchMap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { v4 as uuid } from 'uuid';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';



import { ClipboardService } from '../../core/clipboard.service';
import {
  COPY_KEYWORDS_ACTION, COPY_NEGATIVE_KEYWORDS_ACTION, CopyKeywordsAction, IMPORT_FROM_CHROME_STORAGE,
  PASTE_KEYWORDS_ACTION, PASTE_NEGATIVE_KEYWORDS_ACTION,
  PasteKeywordsAction,
} from './keyword-matching-options.actions';
import { AddNotificationAction } from '../../notifications/ngrx/notifications.actions';
import { KeywordMatchingOptionsFacade } from './keyword-matching-options.facade';
import { IKeyword } from '../keywords/keyword.interface';
import { IParseKeywordTextModifier, KeywordParser } from '../keyword-parser';
import {
  AddKeywordAction
} from '../keywords/ngrx/keywords.actions';

import { ChromeStorageService } from '../../core/chrome-storage.service';
import { DELETE_CAMPAIGN_ACTION, DeleteCampaignsAction } from '../campaigns/ngrx/campaigns.actions';
import { IAdgroup } from '../adgroups/adgroup-interface';
import { DeleteAdgroupAction } from '../adgroups/ngrx/adgroup.actions';
import { KeywordModifiers } from '../keywords/keyword-modifier-enum';

const newLineCharacter: string = String.fromCharCode(13, 10);

@Injectable()
export class KeywordMatchingOptionsEffects {
  constructor(
    private actions$: Actions<Action>,
    private clipboardService: ClipboardService,
    private keywordMatchingOptionsFacade: KeywordMatchingOptionsFacade,
    private chromeStorageService: ChromeStorageService
  ) {}

  @Effect({
    dispatch: false
  })
  public loadFromChromeStorage() {
    return this.actions$.pipe(
      ofType(IMPORT_FROM_CHROME_STORAGE),
      map((action) => {
        this.chromeStorageService.initialised = true;

        return empty();
      })
    );
  }

  @Effect()
  public deleteCampaign() {
    return this.actions$.pipe(
      ofType(DELETE_CAMPAIGN_ACTION),
      withLatestFrom(this.keywordMatchingOptionsFacade.addgroups$),
      mergeMap((value: [DeleteCampaignsAction, Array<IAdgroup>]): Array<DeleteAdgroupAction | undefined> => {
        if (value[0].payload.shouldDeleteAdgroups) {
          const adgroupsToDelete: Array<IAdgroup> = value[1].filter((adgroup: IAdgroup) => {
            return adgroup.campaignId === value[0].payload.id;
          });

          return adgroupsToDelete.map((adgroup: IAdgroup) => {
            return new DeleteAdgroupAction({
              id: adgroup.id
            });
          });
        }

        return [];
      })
    );
  }

  @Effect()
  public copyKeywordsEffect() {
    return this.actions$.pipe(
      ofType(COPY_KEYWORDS_ACTION),
      withLatestFrom(this.keywordMatchingOptionsFacade.keywords),
      switchMap((value: [CopyKeywordsAction, Array<IKeyword>]) => {
        const clientKeywords: Array<IKeyword> = value[1].filter((keyword: IKeyword) => {
          return keyword.adgroupId === value[0].payload.adgroupId && keyword.modifier !== KeywordModifiers.NegativeMatch;
        });

        const formattedKeywords: Array<string> = clientKeywords.map((keyword: IKeyword) => {
          return KeywordParser.keywordToText(keyword);
        });

        this.clipboardService.copyToClipboard(formattedKeywords.join(newLineCharacter));

        return of(new AddNotificationAction({
          id: uuid(),
          type: 'info',
          text: 'Copied keywords'
        }));
      })
    );
  }

  @Effect()
  public copyNegativeKeywordsEffect() {
    return this.actions$.pipe(
      ofType(COPY_NEGATIVE_KEYWORDS_ACTION),
      withLatestFrom(this.keywordMatchingOptionsFacade.keywords),
      switchMap((value: [CopyKeywordsAction, Array<IKeyword>]) => {
        const clientKeywords: Array<IKeyword> = value[1].filter((keyword: IKeyword) => {
          return keyword.adgroupId === value[0].payload.adgroupId && keyword.modifier === KeywordModifiers.NegativeMatch;
        });

        const formattedKeywords: Array<string> = clientKeywords.map((keyword: IKeyword) => {
          return KeywordParser.keywordToText(keyword);
        });

        this.clipboardService.copyToClipboard(formattedKeywords.join(newLineCharacter));

        return of(new AddNotificationAction({
          id: uuid(),
          type: 'info',
          text: 'Copied keywords'
        }));
      })
    );
  }

  @Effect()
  public pasteKeywordsEffect() {
    return this.actions$.pipe(
      ofType(PASTE_KEYWORDS_ACTION),
      mergeMap((action: PasteKeywordsAction) => {
        let keywords: Array<string|IParseKeywordTextModifier> = action.payload.text.split(/\n/m);

        keywords = keywords.filter((keyword: string) => keyword.trim() !== '');

        keywords = keywords.map((keyword: string) => {
          return KeywordParser.textToKeywordTextAndModifier(keyword);
        });

        const keywordAction = keywords.map((keywordWithModifier: IParseKeywordTextModifier) => {
          return new AddKeywordAction({
            keyword: {
              id: uuid(),
              adgroupId: action.payload.adgroupId,
              text: keywordWithModifier.text,
              modifier: keywordWithModifier.modifier
            }
          });
        });

        return [
          ...keywordAction,
          new AddNotificationAction({
            id: uuid(),
            type: 'info',
            text: 'Pasted keywords'
          })
        ];
      })
    );
  }

  @Effect()
  public pasteNegativeKeywordsEffect() {
    return this.actions$.pipe(
      ofType(PASTE_NEGATIVE_KEYWORDS_ACTION),
      mergeMap((action: PasteKeywordsAction) => {
        let keywords: Array<string|IParseKeywordTextModifier> = action.payload.text.split(/\n/m);

        keywords = keywords.filter((keyword: string) => keyword.trim() !== '');

        const keywordAction = keywords.map((keyword: string) => {
          return new AddKeywordAction({
            keyword: {
              id: uuid(),
              adgroupId: action.payload.adgroupId,
              text: keyword,
              modifier: KeywordModifiers.NegativeMatch
            }
          });
        });

        return [
          ...keywordAction,
          new AddNotificationAction({
            id: uuid(),
            type: 'info',
            text: 'Pasted keywords'
          })
        ];
      })
    );
  }
}
