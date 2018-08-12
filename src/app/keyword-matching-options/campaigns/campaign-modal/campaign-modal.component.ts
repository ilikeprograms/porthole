import {
  Component, ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChange,
  ViewChild
} from '@angular/core';
import { Subject } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ResetModalService } from '../../../core/reset-modal.service';

@Component({
  selector: 'app-campaign-modal',
  template: `
    <clr-modal [(clrModalOpen)]="modalOpen" (clrModalAlternateClose)="close()">
      <h3 class="modal-title">{{ editCampaign ? 'Rename campaign' : 'Add new campaign' }}</h3>
      <div class="modal-body">
        <form [formGroup]="campaignForm" clrForm>
          <clr-input-container>
            <label for="campaign">Name</label>
            <input #campaignInput clrInput type="text" id="campaign" name="campaign" formControlName="campaign" required autofocus (keyup.enter)="closeWithData()" />
            
            <clr-control-error>A name is required</clr-control-error>
          </clr-input-container>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline" (click)="close()">Cancel</button>
        <button type="button" class="btn btn-primary" (click)="closeWithData()">Ok</button>
      </div>
    </clr-modal>
  `,
  providers: [ResetModalService]
})
export class CampaignModalComponent implements OnDestroy, OnChanges {
  private unsubscribe$: Subject<void> = new Subject<void>();

  public campaignForm: FormGroup;

  @ViewChild('campaignInput')
  public campaignInput: ElementRef;

  constructor(
    private resetModalService: ResetModalService
  ) {
    this.setupForm();

    this.resetModalService.setFormGroup(this.campaignForm);
  }

  public setupForm(): void {
    this.campaignForm = new FormGroup({
      campaign: new FormControl('', Validators.required)
    });
  }

  public ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
    this.resetModalService.reset(changes, this.campaignInput);

    if (changes.editCampaign && changes.editCampaign.currentValue) {
      this.campaignForm.patchValue({ campaign: changes.editCampaign.currentValue.name }, {
        emitEvent: false
      });
    }
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  @Input()
  public modalOpen: boolean = false;

  @Input()
  public editCampaign: any;

  @Output()
  public modalClosed: EventEmitter<any> = new EventEmitter<any>();

  public close(): void {
    this.modalClosed.emit(false);
  }

  public closeWithData(): void {
    this.campaignForm.controls.campaign.updateValueAndValidity();

    if (this.campaignForm.valid) {
      this.modalClosed.emit({campaign: this.campaignForm.value.campaign});
    }
  }
}
