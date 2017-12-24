import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { MatSelectChange } from '@angular/material';

import { takeUntil } from 'rxjs/operators/takeUntil';
import { Subject } from 'rxjs/Subject';

import { KeywordMatchingOptionsFacade } from '../ngrx/keyword-matching-options.facade';
import { KeywordModifiers } from '../keyword-modifier-enum';

@Component({
  selector: 'app-add-keyword',
  templateUrl: './add-keyword.component.html',
  styles: [
    `
      .keyword-entry-container {
        display: flex;
        justify-content: space-between;
      }

      .match-options-selector {
        width: 15%;
      }

      .keyword-entry-card {
        width: 80%;
        display: flex;
        padding: 10px 10px 10px 20px;
      }

      .keyword-entry-card input {
        border: 0;
        flex-grow: 1;
        font-size: 20px;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddKeywordComponent implements OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();

  public newKeywordText: string = '';
  public selectedMatchOption: KeywordModifiers;
  public keywordModifiers = KeywordModifiers;

  constructor(
    private keywordMatchingOptionsFacade: KeywordMatchingOptionsFacade
  ) {
    this.keywordMatchingOptionsFacade.matchOption
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((matchOption: KeywordModifiers) => {
        this.selectedMatchOption = matchOption;
      });
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public setAddKeywordText(text: string) {
    this.newKeywordText = text;
  }

  public addKeyword(event: KeyboardEvent): void {
    const input: HTMLInputElement = event.target as HTMLInputElement;
    const value: string = input.value.trim();

    if (value) {
      this.keywordMatchingOptionsFacade.addKeyword(value);

      this.setAddKeywordText('');
    }
  }

  public onAddKeywordButtonClicked(): void {
    this.keywordMatchingOptionsFacade.addKeyword(this.newKeywordText);

    this.setAddKeywordText('');
  }

  public onNewKeywordMatchOptionChanged(selectChange: MatSelectChange): void {
    this.keywordMatchingOptionsFacade.changeNewKeywordOption(selectChange.value);
  }
}
