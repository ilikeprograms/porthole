import {
  ChangeDetectionStrategy,
  Component, ElementRef,
  EventEmitter, HostBinding, HostListener, Inject,
  Input, OnChanges,
  OnDestroy,
  Output,
  SimpleChange, ViewChild
} from '@angular/core';

import { KeywordModifiers } from '../../keywords/keyword-modifier-enum';
import { ResetModalService } from '../../../core/reset-modal.service';
import { Observable, Subject } from 'rxjs';
import { ICampaign } from '../../campaigns/campaign.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { KeywordMatchingOptionsFacade } from '../../ngrx/keyword-matching-options.facade';
import { takeUntil } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-paste-keywords',
  templateUrl: './paste-keywords.component.html',
  styles: [
    `
      .keyword-entry-container {
        display: flex;
        justify-content: space-between;
        margin-bottom:  12px;
      }

      .keyword-entry-card {
        width: 100%;
        display: flex;
        padding: 10px 10px 10px 20px;
      }

      .keyword-entry-card input {
        border: 0;
        flex-grow: 1;
        font-size: 20px;
      }

      app-keyword-icon {
        margin-top: 4px;
      }
    `
  ],
  providers: [ResetModalService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasteKeywordsComponent implements OnDestroy, OnChanges {
  private unsubscribe$: Subject<void> = new Subject<void>();

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
