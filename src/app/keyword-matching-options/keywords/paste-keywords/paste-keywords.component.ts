import {
  ChangeDetectionStrategy,
  Component, ElementRef,
  EventEmitter, HostListener, Inject,
  Input, OnChanges,
  Output,
  SimpleChange, ViewChild
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/common';

import { ResetModalService } from '../../../core/reset-modal.service';

@Component({
  selector: 'app-paste-keywords',
  templateUrl: './paste-keywords.component.html',
  providers: [ResetModalService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasteKeywordsComponent implements OnChanges {
  public modalForm: FormGroup;

  @ViewChild('textInput')
  public textInput: ElementRef;

  constructor(
    private resetModalService: ResetModalService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.setupForm();

    this.resetModalService.setFormGroup(this.modalForm);
  }

  private setupForm(): void {
    this.modalForm = new FormGroup({
      keywords: new FormControl('', Validators.required),
      negative: new FormControl('')
    });
  }

  public ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
    this.resetModalService.reset(changes, this.textInput);
  }

  @Input()
  public modalOpen: boolean = false;

  @Output()
  public modalClosed: EventEmitter<any> = new EventEmitter<any>();

  public close(): void {
    this.modalClosed.emit(false);
  }

  @HostListener('body:keyup.enter')
  public closeWithData(): void {
    this.modalForm.controls.keywords.updateValueAndValidity();
    this.modalForm.updateValueAndValidity();

    if (this.document.activeElement.tagName === 'TEXTAREA') {
      return;
    }

    if (this.modalForm.valid) {
      this.modalClosed.emit({keywords: this.modalForm.value.keywords, negative: this.modalForm.value.negative});
    }
  }
}
