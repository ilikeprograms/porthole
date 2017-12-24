import { ChangeDetectionStrategy, Component, ElementRef, Inject, OnDestroy, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { Observable } from 'rxjs/Observable';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { Subject } from 'rxjs/Subject';

import { KeywordMatchingOptionsFacade } from '../ngrx/keyword-matching-options.facade';

@Component({
  selector: 'app-keyword-footer-actions',
  templateUrl: './keyword-footer-actions.component.html',
  styles: [
    `
    .clipboard {
      height: 0;
      width: 0;
      position: absolute;
      left: -1000px;
      top: 0;
    }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KeywordFooterActionsComponent implements OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  private documentRef: Document;

  @ViewChild('clipboard')
  public clipboardTextArea: ElementRef;

  public keywordsCount: Observable<number>;
  public keywordsSelectedCount: Observable<number>;
  public allSelected: Observable<boolean>;

  constructor(
    @Inject(DOCUMENT) dom: Document,
    private keywordMatchingOptionsFacade: KeywordMatchingOptionsFacade
  ) {
    this.documentRef = dom;

    this.keywordsCount = this.keywordMatchingOptionsFacade.keywordsCount.pipe(takeUntil(this.unsubscribe$));
    this.keywordsSelectedCount = this.keywordMatchingOptionsFacade.keywordsSelectedCount.pipe(takeUntil(this.unsubscribe$));
    this.allSelected = this.keywordMatchingOptionsFacade.allSelected.pipe(takeUntil(this.unsubscribe$));
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public onToggleAllKeywordSelected(): void {
    this.keywordMatchingOptionsFacade.toggleAllSelected();
  }

  public onRemoveSelectedKeywords(): void {
    this.keywordMatchingOptionsFacade.removeSelectedKeywords();
  }

  public onRemoveAllKeywords(): void {
    this.keywordMatchingOptionsFacade.removeAllKeywords();
  }

  public copyToClipboard(): void {
    this.keywordMatchingOptionsFacade.copyToClipboard();
    // this.clipboardTextArea.nativeElement.value = this.getTextToCopy();
    // this.clipboardTextArea.nativeElement.focus();
    // this.clipboardTextArea.nativeElement.select();
    //
    // try {
    //   this.documentRef.execCommand('copy');
    //
    //   this.snackBar.open('Copied', '', {
    //     duration: 1500
    //   });
    // } catch (e) {
    //   this.snackBar.open('Failed', '', {
    //     duration: 1500
    //   });
    // }
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
