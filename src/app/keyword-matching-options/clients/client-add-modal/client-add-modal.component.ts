import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-client-add-modal',
  template: `
    <!--<h2 mat-dialog-title>{{ data ? 'Change name' : 'Add new client' }}</h2>-->
    <!--<mat-dialog-content>-->
      <!--<mat-form-field>-->
        <!--<input #clientName placeholder="name" type="text" matInput [value]="data?.client.name" (keyup.enter)="closeWithData(clientName.value)" />-->
      <!--</mat-form-field>-->
    <!--</mat-dialog-content>-->
    <!--<mat-dialog-actions>-->
      <!--<button mat-button mat-dialog-close tabindex="-1">Cancel</button>-->
      <!--&lt;!&ndash; Can optionally provide a result for the closing dialog. &ndash;&gt;-->
      <!--<button mat-button color="primary" [mat-dialog-close]="clientName.value">Confirm</button>-->
    <!--</mat-dialog-actions>-->
  `,
})
export class ClientAddModalComponent {
  public onNoClick(): void {
    // this.dialogRef.close();
  }

  public closeWithData(clientName: string): void {
    // this.dialogRef.close(clientName);
  }
}
