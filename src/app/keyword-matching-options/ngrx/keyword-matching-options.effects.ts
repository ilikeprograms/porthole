import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';

import { ClipboardService } from '../../core/clipboard.service';
import {
  AddKeywordAction, COPY_ALL_KEYWORDS_ACTION, CopyAllKeywordsAction, PASTE_KEYWORDS_ACTION,
  PasteKeywordsAction, REMOVE_ALL_KEYWORDS_ACTION, RemoveAllKeywordsAction,
} from './keyword-matching-options.actions';
import { CreateTextSnackbarAction } from '../../snackbar-ngrx/ngrx/snackbar-ngrx.actions';
import { KeywordMatchingOptionsFacade } from './keyword-matching-options.facade';
import { IKeyword } from '../keyword.interface';
import { KeywordModifiers } from '../keyword-modifier-enum';
import { IParseKeywordTextModifier, KeywordParser } from '../keyword-parser';

const newLineCharacter: string = String.fromCharCode(13, 10);

@Injectable()
export class KeywordMatchingOptionsEffects {
  constructor(
    private actions$: Actions<Action>,
    private clipboardService: ClipboardService,
    private keywordMatchingOptionsFacade: KeywordMatchingOptionsFacade
  ) {}

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
          return keyword.clientId === value[0].clientId;
        })

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
        let keywords: Array<string|IParseKeywordTextModifier> = action.text.split(/\n/m);

        keywords = keywords.map((keyword: string) => {
          return KeywordParser.textToKeywordTextAndModifier(keyword);
        });

        console.log(keywords);

        const keywordAction = keywords.map((keywordWithModifier: IParseKeywordTextModifier) => {
          return new AddKeywordAction(action.clientId, keywordWithModifier.text, keywordWithModifier.modifier);
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
