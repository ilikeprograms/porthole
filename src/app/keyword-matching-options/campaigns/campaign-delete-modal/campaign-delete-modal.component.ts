import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-campaign-delete-modal',
  template: `
    <clr-modal [(clrModalOpen)]="modalOpen" (clrModalAlternateClose)="close()">
      <h3 class="modal-title">{{ 'Confirm delete campaign' }}</h3>
      <div class="modal-body">
        <p>Are you sure you want to remove this campaign?</p>
        <p>Use the below toggle to also remove all Add Groups and Keywords associated with this campaign.</p>

        <form>
          <section class="form-block">
            <div class="form-group">
              <div class="checkbox">
                <input type="checkbox" id="removeAdgroups" #removeAdgroups>
                <label for="removeAdgroups">Remove Ad Groups and Keywords?</label>
              </div>
            </div>
          </section>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline" (click)="close()">No</button>
        <button type="button" class="btn btn-primary" (click)="closeWithData(removeAdgroups.checked); removeAdgroups.checked = false">Yes</button>
      </div>
    </clr-modal>
  `,
})
export class CampaignDeleteModalComponent implements OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  @Input()
  public modalOpen: boolean = false;

  @Output()
  public modalClosed: EventEmitter<any> = new EventEmitter<any>();

  public close(): void {
    this.modalClosed.emit({ deleteCampaign: false });
  }

  public closeWithData(shouldDeleteAdgroups: boolean): void {
    this.modalClosed.emit({ shouldDeleteAdgroups, deleteCampaign: true });
  }
}
