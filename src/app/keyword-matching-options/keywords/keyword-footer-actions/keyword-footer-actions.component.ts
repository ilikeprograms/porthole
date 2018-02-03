import {
  ChangeDetectionStrategy, Component, EventEmitter, Input, Output,
} from '@angular/core';

import 'rxjs/add/operator/take';

import { MatDialog, MatDialogRef } from '@angular/material';
import { DeleteAllConfirmComponent } from '../../adgroups/delete-all-confirm/delete-all-confirm.component';
import { PasteModalComponent } from '../paste-modal/paste-modal.component';

@Component({
  selector: 'app-keyword-footer-actions',
  templateUrl: './keyword-footer-actions.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KeywordFooterActionsComponent {
  @Input()
  public keywordsCount: number;

  @Input()
  public keywordsSelectedCount: number;

  @Input()
  public keywordsAllSelected: number;

  @Output()
  public toggleAllSelected: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public removeSelectedKeywords: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public removeAllKeywords: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public copyKeywords: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public copyNegativeKeywords: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public pasteKeywords: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public pasteNegativeKeywords: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public csvExport: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private dialog: MatDialog
  ) {}

  public onToggleAllKeywordSelected(): void {
    this.toggleAllSelected.emit();
  }

  public onRemoveSelectedKeywords(): void {
    this.removeSelectedKeywords.emit();
  }

  public onRemoveAllKeywords(): void {
    // Open confirmation dialog, then remove all if yes is clicked
    const dialogRef: MatDialogRef<DeleteAllConfirmComponent> = this.dialog.open(DeleteAllConfirmComponent);

    dialogRef.afterClosed().take(1).subscribe(result => {
      if (result === true) {
        this.removeAllKeywords.emit();
      }
    });
  }

  public onCopyKeywords(): void {
    this.copyKeywords.emit();
  }

  public onCopyNegativeKeywords(): void {
    this.copyNegativeKeywords.emit();
  }

  public onPasteKeywords(): void {
    const dialogRef: MatDialogRef<PasteModalComponent> = this.dialog.open(PasteModalComponent);

    dialogRef.afterClosed().take(1).subscribe(result => {
      if (result) {
        this.pasteKeywords.emit(result.trim());
      }
    });
  }

  public onPasteNegativeKeywords(): void {
    const dialogRef: MatDialogRef<PasteModalComponent> = this.dialog.open(PasteModalComponent);

    dialogRef.afterClosed().take(1).subscribe(result => {
      if (result) {
        this.pasteNegativeKeywords.emit(result.trim());
      }
    });
  }

  public onCsvExport(): void {
    this.csvExport.emit();
  }
}
