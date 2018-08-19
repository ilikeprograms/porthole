import {
  ChangeDetectionStrategy,
  Component, ElementRef,
  EventEmitter,
  Input, OnChanges,
  OnDestroy, OnInit,
  Output,
  SimpleChange, ViewChild
} from '@angular/core';

import { KeywordModifiers } from '../keyword-modifier-enum';
import { ResetModalService } from '../../../core/reset-modal.service';
import { Subject } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-add-keyword',
  templateUrl: './add-keyword.component.html',
  providers: [ResetModalService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddKeywordComponent implements OnDestroy, OnInit, OnChanges {
  private unsubscribe$: Subject<void> = new Subject<void>();

  public modalForm: FormGroup;

  @ViewChild('textInput')
  public textInput: ElementRef;

  public modifierStateChange: string = 'VALID';

  public keywordModifiers: any = KeywordModifiers;

  constructor(
    private resetModalService: ResetModalService
  ) {
    this.setupForm();

    this.resetModalService.setFormGroup(this.modalForm);
  }

  public ngOnInit(): void {
    this.modalForm.controls.modifier.statusChanges.pipe(takeUntil(this.unsubscribe$)).subscribe((result) => {
      this.modifierStateChange = result;
    });
  }

  private setupForm(): void {
    this.modalForm = new FormGroup({
      keyword: new FormControl('', Validators.required),
      modifier: new FormControl('', Validators.required)
    });
  }

  public ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
    this.resetModalService.reset(changes, this.textInput);

    if (changes.editModal && changes.editModal.currentValue) {
      this.modalForm.patchValue({
        keyword: changes.editModal.currentValue.text,
        modifier: changes.editModal.currentValue.modifier
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
  public editModal: boolean = false;

  @Output()
  public modalClosed: EventEmitter<any> = new EventEmitter<any>();

  public close(): void {
    this.modalClosed.emit(false);
  }

  public closeWithData(): void {
    this.modalForm.controls.keyword.updateValueAndValidity();
    this.modalForm.controls.modifier.updateValueAndValidity();

    if (this.modalForm.valid) {
      this.modalClosed.emit({keyword: this.modalForm.value.keyword, modifier: this.modalForm.value.modifier});
    }
  }
}
