import {
  ChangeDetectionStrategy,
  Component, ElementRef,
  EventEmitter,
  Input, OnChanges,
  OnDestroy, Output, SimpleChange, ViewChild
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ICampaign } from '../../campaigns/campaign.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ResetModalService } from '../../../core/reset-modal.service';
import { IAdgroup } from '../adgroup-interface';

@Component({
  selector: 'app-adgroup-modal',
  template: `
    <clr-modal [(clrModalOpen)]="modalOpen" (clrModalAlternateClose)="close()">
      <h3 class="modal-title">{{ editModal ? 'Edit adgroup' : 'Add new adgroup' }}</h3>
      <div class="modal-body">
        <p *ngIf="!editModal">Once an Ad Group is created you can add Keywords to it and manage/change them.</p>

        <form [formGroup]="adgroupForm" clrForm clrLayout="horizontal">
          <clr-input-container>
            <label for="adgroupName">Name</label>
            <input clrInput type="text" id="adgroupName" name="adgroupName" formControlName="adgroupName" #adgroupNameInput (keyup.enter)="closeWithData()" required autofocus />
            
            <clr-control-error>A name must be provided</clr-control-error>
          </clr-input-container>

          <div class="clr-form-control clr-row">
              <label class="clr-control-label" for="campaignId">Campaign (Optional)</label>
              <div class="clr-control-container clr-col-md-10 clr-col-xs-12">
                <div class="clr-select-wrapper">
                  <select id="campaignId" name="campaignId" formControlName="campaignId">
                    <option value="" disabled readonly>None</option>
                    <option *ngFor="let campaign of (campaigns$ | async)" [ngValue]="campaign.id">{{ campaign.name }}</option>
                  </select>
                </div>
              </div>
          </div>
        </form>

        <p *ngIf="!editModal">Campaign can be added and/or changed later.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline" (click)="close()">Cancel</button>
        <button type="button" class="btn btn-primary" (click)="closeWithData()">Ok</button>
      </div>
    </clr-modal>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ResetModalService]
})
export class AdgroupModalComponent implements OnDestroy, OnChanges {
  private unsubscribe$: Subject<void> = new Subject<void>();
  public campaigns$: Observable<Array<ICampaign>>;

  public adgroupForm: FormGroup;

  @ViewChild('adgroupNameInput')
  public adgroupNameInput: ElementRef;

  constructor(
    private resetModalService: ResetModalService
  ) {
    this.setupForm();

    this.resetModalService.setFormGroup(this.adgroupForm);
  }

  public setupForm(): void {
    this.adgroupForm = new FormGroup({
      adgroupName: new FormControl('', Validators.required),
      campaignId: new FormControl('')
    });
  }

  public ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
    this.resetModalService.reset(changes, this.adgroupNameInput);

    if (changes.editModal && changes.editModal.currentValue) {
      this.adgroupForm.patchValue({
        adgroupName: changes.editModal.currentValue.name,
        campaignId: changes.editModal.currentValue.campaignId
      }, {
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
  public editModal: boolean | IAdgroup = false;

  @Output()
  public modalClosed: EventEmitter<any> = new EventEmitter<any>();

  public close(): void {
    this.modalClosed.emit(false);
  }

  public closeWithData(): void {
    this.adgroupForm.controls.adgroupName.updateValueAndValidity();
    this.adgroupForm.updateValueAndValidity();

    if (this.adgroupForm.valid) {
      this.modalClosed.emit({name: this.adgroupForm.value.adgroupName, campaignId: this.adgroupForm.value.campaignId});
    }
  }
}
