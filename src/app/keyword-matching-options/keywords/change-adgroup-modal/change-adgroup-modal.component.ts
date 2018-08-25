import {
  ChangeDetectionStrategy,
  Component, ElementRef,
  EventEmitter,
  Input,
  Output, ViewChild
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';

import { KeywordMatchingOptionsFacade } from '../../ngrx/keyword-matching-options.facade';
import { IAdgroup } from '../../adgroups/adgroup-interface';

@Component({
  selector: 'app-change-adgroup-modal',
  template: `
    <clr-modal [(clrModalOpen)]="modalOpen" (clrModalOpenChange)="close()">
      <h3 class="modal-title">Move keywords</h3>
      <div class="modal-body">
        <p>Choose below to move the selected keywords to a different adgroup.</p>

        <form [formGroup]="modalForm" clrForm clrLayout="horizontal">
          <div class="clr-form-control clr-row">
              <label class="clr-control-label" for="adgroupId">Adgroup</label>
              <div class="clr-control-container clr-col-md-10 clr-col-xs-12">
                <div class="clr-select-wrapper">
                  <select id="adgroupId" name="adgroupId" formControlName="adgroupId" #adgroupSelect>
                    <option [value]="''" disabled readonly>Please select</option>
                    <option *ngFor="let adgroup of (addgroups$ | async)" [ngValue]="adgroup.id">{{ adgroup.name }}</option>
                  </select>
                </div>
              </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline" (click)="close()">Cancel</button>
        <button type="button" class="btn btn-primary" (click)="closeWithData()">Ok</button>
      </div>
    </clr-modal>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangeAdgroupModalComponent {
  public addgroups$: Observable<Array<IAdgroup>>;

  public modalForm: FormGroup;

  @ViewChild('adgroupSelect')
  public adgroupSelect: ElementRef;

  constructor(
    private keywordMatchingOptionsFacade: KeywordMatchingOptionsFacade
  ) {
    this.addgroups$ = this.keywordMatchingOptionsFacade.addgroups$;

    this.setupForm();
  }

  public setupForm(): void {
    this.modalForm = new FormGroup({
      adgroupId: new FormControl('', Validators.required)
    });
  }

  @Input()
  public modalOpen: boolean = false;

  @Output()
  public modalClosed: EventEmitter<any> = new EventEmitter<any>();

  public close(): void {
    this.modalClosed.emit(false);
  }

  public closeWithData(): void {
    this.modalForm.controls.adgroupId.updateValueAndValidity();
    this.modalForm.updateValueAndValidity();

    if (this.modalForm.valid) {
      this.modalClosed.emit({adgroupId: this.modalForm.value.adgroupId});
    }
  }
}
