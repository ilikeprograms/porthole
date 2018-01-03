import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-adgroup-modal',
  template: `
    <h2 mat-dialog-title>{{ data.adgroup ? 'Change Ad Group' : 'Add new Ad Group' }}</h2>
    <mat-dialog-content>
      <p *ngIf="!data.adgroup">Once an Ad Group is created you can add Keywords to it and manage/change them.</p>

      <mat-form-field>
        <input #adgroupName placeholder="Name" type="text" matInput [value]="data.adgroup?.name" />
      </mat-form-field>

      <mat-form-field>
        <mat-select #adgroupCampaign [value]="data.adgroup?.campaignId" placeholder="Campaign (Optional)" hintLabel="Choose a Campaign to associate the Ad Group with">
          <mat-option>None</mat-option>
          <mat-option *ngFor="let campaign of data.campaigns" [value]="campaign.id">
            {{ campaign.name }}
          </mat-option>
        </mat-select>
      </mat-form-field>

      <p *ngIf="!data.adgroup">Campaign can be added and/or changed later.</p>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close tabindex="-1">Cancel</button>
      <!-- Can optionally provide a result for the closing dialog. -->
      <button mat-button color="primary" [mat-dialog-close]="{name: adgroupName.value, campaignId: adgroupCampaign.value}">Confirm</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .mat-form-field, input, select {
      width: 100%;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdgroupModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AdgroupModalComponent>
  ) {}

  public onNoClick(): void {
    this.dialogRef.close();
  }
}