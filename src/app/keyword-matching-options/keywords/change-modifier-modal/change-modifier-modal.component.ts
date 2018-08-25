import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { KeywordModifiers } from '../keyword-modifier-enum';

@Component({
  selector: 'app-change-modifier-modal',
  template: `
    <clr-modal [(clrModalOpen)]="modalOpen" (clrModalOpenChange)="close()">
      <h3 class="modal-title">Change keywords modifier</h3>
      <div class="modal-body">
        <p>Choose below to change the modifier of  the selected keywords.</p>

        <form [formGroup]="modalForm" clrForm clrLayout="horizontal">
          <div class="clr-form-control clr-row">
              <label class="clr-control-label" for="modifier">Modifier</label>
              <div class="clr-control-container clr-col-md-10 clr-col-xs-12">
                <div class="clr-select-wrapper">
                  <select id="modifier" name="modifier" formControlName="modifier" #modifierSelect>
                    <option value="" disabled readonly>Please select</option>

                    <option [ngValue]="keywordModifiers.BroadMatch">
                      <span class="keyword-icon">Broad match</span>
                    </option>
                    <option [ngValue]="keywordModifiers.PhraseMatch">
                      <span class="keyword-icon">Phrase match</span>
                    </option>
                    <option [ngValue]="keywordModifiers.BroadMatchModifier">
                      <span class="keyword-icon">Broad match modifier</span>
                    </option>
                    <option [ngValue]="keywordModifiers.ExactMatch">
                      <span class="keyword-icon">Exact match</span>
                    </option>
                    <option [ngValue]="keywordModifiers.NegativeMatch">
                      <span class="keyword-icon">Negative</span>
                    </option>
                  </select>

                  <clr-icon class="clr-validate-icon" shape="exclamation-circle"></clr-icon>
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
export class ChangeModifierModalComponent {
  public modalForm: FormGroup;

  public keywordModifiers: any = KeywordModifiers;

  @ViewChild('modifierSelect')
  public modifierSelect: ElementRef;

  constructor() {
    this.setupForm();
  }

  public setupForm(): void {
    this.modalForm = new FormGroup({
      modifier: new FormControl('', Validators.required)
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
    this.modalForm.controls.modifier.updateValueAndValidity();
    this.modalForm.updateValueAndValidity();

    if (this.modalForm.valid) {
      this.modalClosed.emit({modifier: this.modalForm.value.modifier});
    }
  }
}
