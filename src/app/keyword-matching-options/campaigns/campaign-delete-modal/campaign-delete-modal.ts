import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-campaign-delete-modal',
  template: `
    <h2 mat-dialog-title>Confirm delete campaign</h2>
    <mat-dialog-content>
      <p>Are you sure you want to remove this campaign?</p>
      <p>Use the below toggle to also remove all Add Groups and Keywords associated with this campaign.</p>

      <mat-slide-toggle #slideToggle>
        Remove Ad Groups and Keywords?
      </mat-slide-toggle>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close tabindex="-1">Cancel</button>
      <!-- Can optionally provide a result for the closing dialog. -->
      <button mat-button color="primary" [mat-dialog-close]="slideToggle.checked">Confirm</button>
    </mat-dialog-actions>
  `,
})
export class CampaignDeleteModalComponent {
  constructor(
    public dialogRef: MatDialogRef<CampaignDeleteModalComponent>
  ) {}

  public onNoClick(): void {
    this.dialogRef.close();
  }
}
