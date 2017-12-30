import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-client-add-modal',
  template: `
    <h2 mat-dialog-title>{{ data ? 'Change name' : 'Add new client' }}</h2>
    <mat-dialog-content>
      <mat-form-field>
        <input #clientName placeholder="name" type="text" matInput [value]="data?.client.name" />
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close tabindex="-1">Cancel</button>
      <!-- Can optionally provide a result for the closing dialog. -->
      <button mat-button color="primary" [mat-dialog-close]="clientName.value">Confirm</button>
    </mat-dialog-actions>
  `,
})
export class ClientAddModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ClientAddModalComponent>
  ) {}

  public onNoClick(): void {
    this.dialogRef.close();
  }
}
