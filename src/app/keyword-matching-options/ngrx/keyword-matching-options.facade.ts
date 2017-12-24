import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import { Store } from '@ngrx/store';

import { IAppState } from '../../ngrx/app-state.interface';
import { IKeyword } from '../keyword.interface';
import { selectKeywords, selectMatchOption } from './keyword-matching-options.selectors';
import {
  AddKeywordAction, ChangeNewKeywordOptionAction, EditKeywordTextAction, RemoveAllKeywordsAction, RemoveKeywordAction,
  RemoveSelectedKeywordsAction,
  ToggleKeywordAllSelectedAction,
  ToggleKeywordSelectedAction
} from './keyword-matching-options.actions';
import { KeywordModifiers } from '../keyword-modifier-enum';
import { CreateTextSnackbarAction } from '../../snackbar-ngrx/ngrx/snackbar-ngrx.actions';

@Injectable()
export class KeywordMatchingOptionsFacade {
  public keywords: Observable<Array<IKeyword>>;
  public keywordsCount: Observable<number>;
  public matchOption: Observable<KeywordModifiers>;
  public allSelected: Observable<boolean>;
  public keywordsSelectedCount: Observable<number>;

  constructor(private store: Store<IAppState>) {
    this.keywords = this.store.select(selectKeywords);

    this.matchOption = this.store.select(selectMatchOption);

    this.keywordsCount = this.store.select(selectKeywords).flatMap((keywords: Array<IKeyword>) => {
      return Observable.of(keywords.length);
    });

    this.allSelected = this.keywords.flatMap((keywords: Array<IKeyword>) => {
      if (keywords.length === 0) {
        return Observable.of(false);
      }

      const anyUnselectedKeywords: boolean = keywords.some((keyword: IKeyword) => {
        return !keyword.selected;
      });

      return Observable.of(!anyUnselectedKeywords);
    });

    this.keywordsSelectedCount = this.keywords.flatMap((keywords: Array<IKeyword>) => {
      return Observable.of(
        keywords.filter((keyword: IKeyword) => {
          return keyword.selected;
        }).length
      );
    });
  }

  public addKeyword(text: string): void {
    this.store.dispatch(new AddKeywordAction(text));
  }

  public editKeywordText(id: string, text: string): void {
    this.store.dispatch(new EditKeywordTextAction(id, text));
  }

  public removeKeyword(id: string): void {
    this.store.dispatch(new RemoveKeywordAction(id));
  }

  public removeSelectedKeywords(): void {
    this.store.dispatch(new RemoveSelectedKeywordsAction());
  }

  public removeAllKeywords(): void {
    this.store.dispatch(new RemoveAllKeywordsAction());
  }

  public toggleKeywordSelected(id: string): void {
    this.store.dispatch(new ToggleKeywordSelectedAction(id));
  }

  public changeNewKeywordOption(matchOption: KeywordModifiers): void {
    this.store.dispatch(new ChangeNewKeywordOptionAction(matchOption));
  }

  public toggleAllSelected(): void {
    this.store.dispatch(new ToggleKeywordAllSelectedAction());
  }

  public copyToClipboard(): void {
    this.store.dispatch(new CreateTextSnackbarAction('Copied', {
      duration: 1500
    }));
  }
}
