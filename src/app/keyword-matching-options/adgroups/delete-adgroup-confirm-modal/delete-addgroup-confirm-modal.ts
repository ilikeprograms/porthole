import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-adgroup-confirm-modal',
  template: `
    <clr-modal [(clrModalOpen)]="modalOpen" (clrModalOpenChange)="close()">
      <h3 class="modal-title">{{ 'Delete Ad Group' }}</h3>
      <div class="modal-body">
        Are you sure? This will also remove all Keywords withing this Ad Group and cannot be undone.
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline" (click)="close()">No</button>
        <button type="button" class="btn btn-primary" (click)="closeWithData()">Yes</button>
      </div>
    </clr-modal>
  `,
})
export class DeleteAdgroupConfirmComponent {
  @Input()
  public modalOpen: boolean = false;

  @Output()
  public modalClosed: EventEmitter<any> = new EventEmitter<any>();

  public close(): void {
    this.modalClosed.emit(false);
  }

  @HostListener('body:keyup.enter')
  public closeWithData(): void {
    this.modalClosed.emit(true);
  }
}
