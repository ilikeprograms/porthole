import { ChangeDetectionStrategy, Component, ElementRef, Inject, OnDestroy, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MatSelectChange, MatSnackBar } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators/takeUntil';

import { KeywordModifiers } from '../keyword-modifier-enum';
import { IKeyword } from '../keyword.interface';
import { KeywordMatchingOptionsFacade } from '../ngrx/keyword-matching-options.facade';

@Component({
  selector: 'app-tag-container',
  templateUrl: './tag-container.component.html',
  styleUrls: [
    './tag-container.component.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagContainerComponent implements OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  private documentRef: Document;

  @ViewChild('clipboard')
  public clipboardTextArea: ElementRef;

  public keywordModifiers = KeywordModifiers;

  public newKeywordText: string = '';

  public selectedMatchOption: KeywordModifiers;
  public keywords: Observable<Array<IKeyword>>;
  public keywordsCount: Observable<number>;
  public allSelected: Observable<boolean>;
  public keywordsSelectedCount: Observable<number>;

  constructor(
    @Inject(DOCUMENT) dom: Document,
    private snackBar: MatSnackBar,
    private keywordMatchingOptionsFacade: KeywordMatchingOptionsFacade
  ) {
    this.documentRef = dom;

    this.keywords = this.keywordMatchingOptionsFacade.keywords.pipe(takeUntil(this.unsubscribe$));
    this.keywordsCount = this.keywordMatchingOptionsFacade.keywordsCount.pipe(takeUntil(this.unsubscribe$));
    this.keywordMatchingOptionsFacade.matchOption
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((matchOption: KeywordModifiers) => {
       this.selectedMatchOption = matchOption;
    });
    this.allSelected = this.keywordMatchingOptionsFacade.allSelected.pipe(takeUntil(this.unsubscribe$));
    this.keywordsSelectedCount = this.keywordMatchingOptionsFacade.keywordsSelectedCount.pipe(takeUntil(this.unsubscribe$));
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

  public onEditKeywordText(keyword: IKeyword, text: string): void {
    this.keywordMatchingOptionsFacade.editKeywordText(keyword, text);
  }

  public onRemoveKeyword(keyword: IKeyword): void {
    this.keywordMatchingOptionsFacade.removeKeyword(keyword);
  }

  public onRemoveSelectedKeywords(): void {
    this.keywordMatchingOptionsFacade.removeSelectedKeywords();
  }

  public onRemoveAllKeywords(): void {
    this.keywordMatchingOptionsFacade.removeAllKeywords();
  }

  public onToggleKeywordSelected(keyword: IKeyword): void {
    this.keywordMatchingOptionsFacade.toggleKeywordSelected(keyword);
  }

  public onToggleAllKeywordSelected(): void {
    this.keywordMatchingOptionsFacade.toggleAllSelected();
  }

  public copyToClipboard(): void {
    this.clipboardTextArea.nativeElement.value = this.getTextToCopy();
    this.clipboardTextArea.nativeElement.focus();
    this.clipboardTextArea.nativeElement.select();

    try {
      this.documentRef.execCommand('copy');

      this.snackBar.open('Copied', '', {
        duration: 1500
      });
    } catch (e) {
      this.snackBar.open('Failed', '', {
        duration: 1500
      });
    }
  }

  private getTextToCopy(): string {
    return '';
    // const keywords: Array<string> = this.keywords.map((keyword: IKeyword) => {
    //   switch (keyword.modifier) {
    //     case KeywordModifiers.BroadMatch:
    //       return keyword.text;
    //     case KeywordModifiers.Negative:
    //       return `-${keyword.text}`;
    //     case KeywordModifiers.BroadMatchModifier:
    //       return `"${keyword.text}"`;
    //     case KeywordModifiers.ExactMatch:
    //       return `[${keyword.text}]`;
    //   }
    // });

    // return keywords.join(', ');
  }
}
