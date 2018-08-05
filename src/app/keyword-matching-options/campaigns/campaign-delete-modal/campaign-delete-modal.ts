import { Component } from '@angular/core';

@Component({
  selector: 'app-campaign-delete-modal',
  template: `
    <!--<h2 mat-dialog-title>Confirm delete campaign</h2>-->
    <!--<mat-dialog-content>-->
      <!--<p>Are you sure you want to remove this campaign?</p>-->
      <!--<p>Use the below toggle to also remove all Add Groups and Keywords associated with this campaign.</p>-->

      <!--<mat-slide-toggle #slideToggle>-->
        <!--Remove Ad Groups and Keywords?-->
      <!--</mat-slide-toggle>-->
    <!--</mat-dialog-content>-->
    <!--<mat-dialog-actions>-->
      <!--<button mat-button mat-dialog-close tabindex="-1">Cancel</button>-->
      <!--&lt;!&ndash; Can optionally provide a result for the closing dialog. &ndash;&gt;-->
      <!--<button type="submit" tabindex="1" mat-button color="primary" [mat-dialog-close]="slideToggle.checked">Confirm</button>-->
    <!--</mat-dialog-actions>-->
  `,
})
export class CampaignDeleteModalComponent {
  public onNoClick(): void {
    // this.dialogRef.close();
  }

  public closeWithData(shouldRemove: string): void {
    // this.dialogRef.close(shouldRemove);
  }
}
