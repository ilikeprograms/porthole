import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-delete-adgroup-confirm-modal',
  template: `
    <h2 mat-dialog-title>Delete Ad Group</h2>
    <mat-dialog-content>Are you sure? This will also remove all Keywords withing this Ad Group and cannot be undone.</mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close tabindex="-1">No</button>
      <!-- Can optionally provide a result for the closing dialog. -->
      <button mat-button color="warn" [mat-dialog-close]="true">Yes</button>
    </mat-dialog-actions>
  `,
})
export class DeleteAdgroupConfirmComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteAdgroupConfirmComponent>
  ) {}

  public onNoClick(): void {
    this.dialogRef.close();
  }
}
