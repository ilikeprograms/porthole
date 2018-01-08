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
  public copyAllKeywords: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public pasteKeywords: EventEmitter<string> = new EventEmitter<string>();

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

  public onCopyAllKeywords(): void {
    this.copyAllKeywords.emit();
  }

  public onPasteKeywords(): void {
    const dialogRef: MatDialogRef<PasteModalComponent> = this.dialog.open(PasteModalComponent);

    dialogRef.afterClosed().take(1).subscribe(result => {
      if (result) {
        this.pasteKeywords.emit(result.trim());
      }
    });
  }
}
