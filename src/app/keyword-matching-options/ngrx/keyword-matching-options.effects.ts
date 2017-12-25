import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';

import { ClipboardService } from '../../core/clipboard.service';
import { COPY_ALL_KEYWORDS_ACTION } from './keyword-matching-options.actions';
import { CreateTextSnackbarAction } from '../../snackbar-ngrx/ngrx/snackbar-ngrx.actions';
import { KeywordMatchingOptionsFacade } from './keyword-matching-options.facade';
import { IKeyword } from '../keyword.interface';
import { KeywordModifiers } from '../keyword-modifier-enum';

const newLineCharacter: string = String.fromCharCode(13, 10);

@Injectable()
export class KeywordMatchingOptionsEffects {
  constructor(
    private actions$: Actions<Action>,
    private clipboardService: ClipboardService,
    private keywordMatchingOptionsFacade: KeywordMatchingOptionsFacade
  ) {}

  @Effect()
  public copyAllKeywordsEffect() {
    return this.actions$
      .ofType(COPY_ALL_KEYWORDS_ACTION)
      .withLatestFrom(this.keywordMatchingOptionsFacade.keywords)
      .switchMap(([value, keywords]) => {
        const formattedKeywords: Array<string> = keywords.map((keyword: IKeyword) => {
          switch (keyword.modifier) {
            case KeywordModifiers.BroadMatch:
              return keyword.text;
            case KeywordModifiers.Negative:
              return `-${keyword.text}`;
            case KeywordModifiers.PhraseMatch:
              return `"${keyword.text}"`;
            case KeywordModifiers.BroadMatchModifier:
              return `+${keyword.text}`;
            case KeywordModifiers.ExactMatch:
              return `[${keyword.text}]`;
          }
        });

        this.clipboardService.copyToClipboard(formattedKeywords.join(newLineCharacter));

        return Observable.of(new CreateTextSnackbarAction('Copied', {
          duration: 1500
        }));
      });
  }
}
