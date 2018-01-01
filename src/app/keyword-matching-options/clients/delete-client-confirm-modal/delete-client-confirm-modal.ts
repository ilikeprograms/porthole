import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-delete-client-confirm-modal',
  template: `
    <h2 mat-dialog-title>Delete Client</h2>
    <mat-dialog-content>Are you sure? This will also remove all Campaigns (but not Ad Groups) from this client and cannot be undone.</mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close tabindex="-1">No</button>
      <!-- Can optionally provide a result for the closing dialog. -->
      <button mat-button color="warn" [mat-dialog-close]="true">Yes</button>
    </mat-dialog-actions>
  `,
})
export class DeleteClientConfirmComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteClientConfirmComponent>
  ) {}

  public onNoClick(): void {
    this.dialogRef.close();
  }
}
