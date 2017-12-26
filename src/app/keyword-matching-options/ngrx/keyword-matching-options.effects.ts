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
  AddKeywordAction, COPY_ALL_KEYWORDS_ACTION, PASTE_KEYWORDS_ACTION,
  PasteKeywordsAction, REMOVE_ALL_KEYWORDS_ACTION, RemoveAllKeywordsAction,
} from './keyword-matching-options.actions';
import { CreateTextSnackbarAction } from '../../snackbar-ngrx/ngrx/snackbar-ngrx.actions';
import { KeywordMatchingOptionsFacade } from './keyword-matching-options.facade';
import { IKeyword } from '../keyword.interface';
import { KeywordModifiers } from '../keyword-modifier-enum';
import { KeywordParser } from '../keyword-parser';

const newLineCharacter: string = String.fromCharCode(13, 10);

interface IAddKeywordWithModifier {
  text: string;
  modifier: KeywordModifiers;
}

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
      .switchMap(([value, keywords]) => {
        const formattedKeywords: Array<string> = keywords.map((keyword: IKeyword) => {
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
        let keywords: Array<string|IAddKeywordWithModifier> = action.text.split(/\n/m);

        keywords = keywords.map((keyword: string) => {
          if (keyword.charAt(0) === '-') { // Negative match
            return {
              text: keyword.slice(1),
              modifier: KeywordModifiers.Negative
            };
          }

          if (keyword.charAt(0) === '"' && keyword.charAt(keyword.length - 1) === '"') {
            return {
              text: keyword.slice(1, -1),
              modifier: KeywordModifiers.PhraseMatch
            };
          }

          if (keyword.charAt(0) === '+') { // Broad match modifier
            return {
              text: keyword.slice(1),
              modifier: KeywordModifiers.BroadMatchModifier
            };
          }

          if (keyword.charAt(0) === '[' && keyword.charAt(keyword.length - 1) === ']') {
            return {
              text: keyword.slice(1, -1),
              modifier: KeywordModifiers.ExactMatch
            };
          }

          return {
            text: keyword,
            modifier: KeywordModifiers.BroadMatch
          };
        });

        const keywordAction = keywords.map((keywordWithModifier: IAddKeywordWithModifier) => {
          return new AddKeywordAction(keywordWithModifier.text, keywordWithModifier.modifier);
        });

        console.log(keywordAction);

        return [
          ...keywordAction,
          new CreateTextSnackbarAction('Pasted', {
            duration: 1500
          })
        ];
      });
  }
}
