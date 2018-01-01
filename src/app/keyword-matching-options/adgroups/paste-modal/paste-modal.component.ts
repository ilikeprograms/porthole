import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-paste-modal',
  template: `
    <h2 mat-dialog-title>Paste keywords below</h2>
    <mat-dialog-content>
      <mat-form-field>
        <textarea matInput #paste placeholder="Keywords"></textarea>
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close tabindex="-1">Cancel</button>
      <!-- Can optionally provide a result for the closing dialog. -->
      <button mat-button color="primary" [mat-dialog-close]="paste.value">Confirm</button>
    </mat-dialog-actions>
  `
})
export class PasteModalComponent {
  constructor(
    public dialogRef: MatDialogRef<PasteModalComponent>
  ) {}

  public onNoClick(): void {
    this.dialogRef.close();
  }
}
