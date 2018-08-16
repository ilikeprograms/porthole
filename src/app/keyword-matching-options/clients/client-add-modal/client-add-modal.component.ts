import {
  ChangeDetectionStrategy,
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
  selector: 'app-client-add-modal',
  template: `
    <clr-modal [(clrModalOpen)]="modalOpen" (clrModalOpenChange)="close()">
      <h3 class="modal-title">{{ editClient ? 'Rename client' : 'Add new client' }}</h3>
      <div class="modal-body">
        <form [formGroup]="clientForm" clrForm clrLayout="horizontal">
          <clr-input-container>
            <label for="client">Name</label>
            <input clrInput type="text" id="client" name="client" formControlName="client" #clientInput (keyup.enter)="closeWithData()" required autofocus />

            <clr-control-error>A name must be provided</clr-control-error>
          </clr-input-container>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline" (click)="close()">Cancel</button>
        <button type="button" class="btn btn-primary" (click)="closeWithData()">Ok</button>
      </div>
    </clr-modal>
  `,
  providers: [ResetModalService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientAddModalComponent implements OnChanges {
  public clientForm: FormGroup;

  @ViewChild('clientInput')
  public clientInput: ElementRef;

  constructor(
    private resetModalService: ResetModalService
  ) {
    this.setupForm();

    this.resetModalService.setFormGroup(this.clientForm);
  }

  public setupForm(): void {
    this.clientForm = new FormGroup({
      client: new FormControl('', Validators.required)
    });
  }

  public ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
    this.resetModalService.reset(changes, this.clientInput);

    if (changes.editClient && changes.editClient.currentValue) {
      this.clientForm.patchValue({ client: changes.editClient.currentValue.name }, {
        emitEvent: false
      });
    }
  }

  @Input()
  public modalOpen: boolean = false;

  @Input()
  public editClient: any = false;

  @Output()
  public modalClosed: EventEmitter<any> = new EventEmitter<any>();

  public close(): void {
    this.modalClosed.emit(false);
  }

  public closeWithData(): void {
    this.clientForm.controls.client.updateValueAndValidity();

    if (this.clientForm.valid) {
      this.modalClosed.emit({client: this.clientForm.value.client});
    }
  }
}
