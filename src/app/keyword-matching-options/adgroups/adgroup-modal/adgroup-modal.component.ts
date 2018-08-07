import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy, Output
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { ICampaign } from '../../campaigns/campaign.interface';
import { KeywordMatchingOptionsFacade } from '../../ngrx/keyword-matching-options.facade';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ResetModalService } from '../../../core/reset-modal.service';

@Component({
  selector: 'app-adgroup-modal',
  template: `
    <clr-modal [(clrModalOpen)]="modalOpen" (clrModalAlternateClose)="close()">
      <h3 class="modal-title">{{ editAdgroup ? 'Change name' : 'Add new client' }}</h3>
      <div class="modal-body">
        <p *ngIf="!editAdgroup">Once an Ad Group is created you can add Keywords to it and manage/change them.</p>

        <form [formGroup]="adgroupForm" clrForm>
          <clr-input-container>
            <label for="adgroupName">Ad group name</label>
            <input clrInput type="text" id="adgroupName" name="adgroupName" formControlName="adgroupName" autofocus />
          </clr-input-container>

          <div class="form-block">
            <!--<label>Select Boxes</label>-->
            <div class="form-group">
              <label for="campaignId">Campaign (Optional)</label>
              <div class="select">
                <select id="campaignId" name="campaignId" formControlName="campaignId">
                  <option value="" disabled readonly>None</option>
                  <option *ngFor="let campaign of (campaigns$ | async)" [ngValue]="campaign.id">{{ campaign.name }}</option>
                </select>
              </div>
            </div>
          </div>
        </form>

        <p *ngIf="!editAdgroup">Campaign can be added and/or changed later.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline" (click)="close()">Cancel</button>
        <button type="button" class="btn btn-primary" (click)="closeWithData()">Ok</button>
      </div>
    </clr-modal>
  `,
  styles: [`
    .mat-form-field, input, select {
      width: 100%;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ResetModalService]
})
export class AdgroupModalComponent implements OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  public campaigns$: Observable<Array<ICampaign>>;

  public adgroupForm: FormGroup;
  public editAdgroup: boolean = false;

  constructor(
    private keywordMatchingOptionsFacade: KeywordMatchingOptionsFacade,
    private resetModalService: ResetModalService
  ) {
    this.campaigns$ = this.keywordMatchingOptionsFacade.campaigns$.pipe(takeUntil(this.unsubscribe$));

    this.adgroupForm = new FormGroup({
      adgroupName: new FormControl('', Validators.required),
      campaignId: new FormControl('', Validators.required)
    });

    this.resetModalService.setFormGroup(this.adgroupForm);
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  @Input()
  public modalOpen: boolean = false;

  @Output()
  public modalClosed: EventEmitter<any> = new EventEmitter<any>();

  public close(): void {
    this.modalClosed.emit(false);
  }

  public closeWithData(): void {
    this.modalClosed.emit({ name: this.adgroupForm.value.adgroupName, campaignId: this.adgroupForm.value.campaignId });
  }
}
