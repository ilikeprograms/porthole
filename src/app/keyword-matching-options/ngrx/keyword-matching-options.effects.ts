import { Injectable } from '@angular/core';

import { v4 as uuid } from 'uuid';

import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';

import { ClipboardService } from '../../core/clipboard.service';
import {
  COPY_ALL_KEYWORDS_ACTION, CopyAllKeywordsAction, IMPORT_FROM_CHROME_STORAGE, PASTE_KEYWORDS_ACTION,
  PasteKeywordsAction,
} from './keyword-matching-options.actions';
import { CreateTextSnackbarAction } from '../../snackbar-ngrx/ngrx/snackbar-ngrx.actions';
import { KeywordMatchingOptionsFacade } from './keyword-matching-options.facade';
import { IKeyword } from '../keywords/keyword.interface';
import { IParseKeywordTextModifier, KeywordParser } from '../keyword-parser';
import {
  AddKeywordAction, REMOVE_ALL_KEYWORDS_ACTION,
  RemoveAllKeywordsAction
} from '../keywords/ngrx/keywords.actions';
import 'rxjs/add/observable/empty';
import { ChromeStorageService } from '../../core/chrome-storage.service';
import { DELETE_CAMPAIGN_ACTION, DeleteCampaignsAction } from '../campaigns/ngrx/campaigns.actions';
import { IAdgroup } from '../adgroups/adgroup-interface';
import { DeleteAdgroupAction } from '../adgroups/ngrx/adgroup.actions';

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
    return this.actions$
      .ofType(IMPORT_FROM_CHROME_STORAGE)
      .map((action) => {
        this.chromeStorageService.initialised = true;

        return Observable.empty();
      });
  }

  @Effect()
  public deleteCampaign() {
    return this.actions$
      .ofType(DELETE_CAMPAIGN_ACTION)
      .withLatestFrom(this.keywordMatchingOptionsFacade.addgroups$)
      .mergeMap((value: [DeleteCampaignsAction, Array<IAdgroup>]): Array<DeleteAdgroupAction | undefined> => {
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
      });
  }

  @Effect()
  public removeAllKeywordsActionEffect() {
    return this.actions$
      .ofType(REMOVE_ALL_KEYWORDS_ACTION)
      .map((action: RemoveAllKeywordsAction) => {
        return new CreateTextSnackbarAction('All keywords removed', {
          duration: 1500
        });
      });
  }

  @Effect()
  public copyAllKeywordsEffect() {
    return this.actions$
      .ofType(COPY_ALL_KEYWORDS_ACTION)
      .withLatestFrom(this.keywordMatchingOptionsFacade.keywords)
      .switchMap((value: [CopyAllKeywordsAction, Array<IKeyword>]) => {
        const clientKeywords: Array<IKeyword> = value[1].filter((keyword: IKeyword) => {
          return keyword.adgroupId === value[0].payload.adgroupId;
        });

        const formattedKeywords: Array<string> = clientKeywords.map((keyword: IKeyword) => {
          return KeywordParser.keywordToText(keyword);
        });

        this.clipboardService.copyToClipboard(formattedKeywords.join(newLineCharacter));

        return Observable.of(new CreateTextSnackbarAction('Copied', {
          duration: 1500
        }));
      });
  }

  @Effect()
  public pasteKeywordsEffect() {
    return this.actions$
      .ofType(PASTE_KEYWORDS_ACTION)
      .mergeMap((action: PasteKeywordsAction) => {
        let keywords: Array<string|IParseKeywordTextModifier> = action.payload.text.split(/\n/m);

        keywords = keywords.map((keyword: string) => {
          return KeywordParser.textToKeywordTextAndModifier(keyword);
        });

        const keywordAction = keywords.map((keywordWithModifier: IParseKeywordTextModifier) => {
          return new AddKeywordAction({
            keyword: {
              id: uuid(),
              adgroupId: action.payload.adgroupId,
              text: keywordWithModifier.text,
              modifier: keywordWithModifier.modifier,
              selected: false
            }
          });
        });

        return [
          ...keywordAction,
          new CreateTextSnackbarAction('Pasted', {
            duration: 1500
          })
        ];
      });
  }
}
