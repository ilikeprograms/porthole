import { ChangeDetectionStrategy, Component, ElementRef, Inject, OnDestroy, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { Observable } from 'rxjs/Observable';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { Subject } from 'rxjs/Subject';

import { KeywordMatchingOptionsFacade } from '../ngrx/keyword-matching-options.facade';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DeleteAllConfirmComponent } from '../delete-all-confirm/delete-all-confirm.component';
import 'rxjs/add/operator/take';
import { PasteModalComponent } from '../paste-modal/paste-modal.component';

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
    private keywordMatchingOptionsFacade: KeywordMatchingOptionsFacade,
    private dialog: MatDialog
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
    // Open confirmation dialog, then remove all if yes is clicked
    const dialogRef: MatDialogRef<DeleteAllConfirmComponent> = this.dialog.open(DeleteAllConfirmComponent);

    dialogRef.afterClosed().take(1).subscribe(result => {
      if (result === true) {
        this.keywordMatchingOptionsFacade.removeAllKeywords();
      }
    });
  }

  public copyAllKeywords(): void {
    this.keywordMatchingOptionsFacade.copyAllKeywords();
  }

  public onPasteKeywords(): void {
    const dialogRef: MatDialogRef<PasteModalComponent> = this.dialog.open(PasteModalComponent);

    dialogRef.afterClosed().take(1).subscribe(result => {
      if (result) {
        this.keywordMatchingOptionsFacade.pasteKeywords(result);
      }
    });
  }
}
