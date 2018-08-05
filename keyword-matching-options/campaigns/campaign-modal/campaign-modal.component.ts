import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-campaign-modal',
  template: `
    <h2 mat-dialog-title>{{ data ? 'Change name' : 'Add new campaign' }}</h2>
    <mat-dialog-content>
      <mat-form-field>
        <input #campaignName placeholder="name" type="text" matInput [value]="data?.campaign.name" (keyup.enter)="closeWithData(campaignName.value)" />
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close tabindex="-1">Cancel</button>
      <!-- Can optionally provide a result for the closing dialog. -->
      <button mat-button color="primary" [mat-dialog-close]="campaignName.value">Confirm</button>
    </mat-dialog-actions>
  `,
})
export class CampaignModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CampaignModalComponent>
  ) {}

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public closeWithData(campaignName: string): void {
    this.dialogRef.close(campaignName);
  }
}
