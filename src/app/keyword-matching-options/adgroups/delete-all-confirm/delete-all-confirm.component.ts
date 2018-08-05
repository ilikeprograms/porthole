import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-delete-all-confirm',
  template: `
    <!--<h2 mat-dialog-title>Delete all Keywords</h2>-->
    <!--<mat-dialog-content>Are you sure? This cannot be undone.</mat-dialog-content>-->
    <!--<mat-dialog-actions>-->
      <!--<button mat-button mat-dialog-close tabindex="-1">No</button>-->
      <!--&lt;!&ndash; Can optionally provide a result for the closing dialog. &ndash;&gt;-->
      <!--<button mat-button color="warn" [mat-dialog-close]="true">Yes</button>-->
    <!--</mat-dialog-actions>-->
  `,
})
export class DeleteAllConfirmComponent {
  public onNoClick(): void {
    // this.dialogRef.close();
  }
}
