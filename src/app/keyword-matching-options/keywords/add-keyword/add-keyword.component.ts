import {
  ChangeDetectionStrategy,
  Component, ElementRef,
  EventEmitter,
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

@Component({
  selector: 'app-add-keyword',
  templateUrl: './add-keyword.component.html',
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
  providers: [ResetModalService]
})
export class AddKeywordComponent implements OnDestroy, OnChanges {
  private unsubscribe$: Subject<void> = new Subject<void>();

  public modalForm: FormGroup;

  @ViewChild('textInput')
  public textInput: ElementRef;

  public keywordModifiers: any = KeywordModifiers;

  constructor(
    private resetModalService: ResetModalService
  ) {
    this.setupForm();

    this.resetModalService.setFormGroup(this.modalForm);
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



  // public newKeywordText: string = '';
  //
  // @Input()
  // public selectedMatchOption: KeywordModifiers;
  //
  // @Output()
  // public selectedMatchOptionChanged: EventEmitter<KeywordModifiers> = new EventEmitter<KeywordModifiers>();
  //
  // @Output()
  // public addKeyword: EventEmitter<string> = new EventEmitter<string>();
  //
  // public setAddKeywordText(text: string) {
  //   this.newKeywordText = text;
  // }
  //
  // public onNewKeywordMatchOptionChanged(modifier: KeywordModifiers): void {
  //   this.selectedMatchOptionChanged.emit(modifier);
  // }
  //
  // public onAddKeyword(event: KeyboardEvent): void {
  //   const input: HTMLInputElement = event.target as HTMLInputElement;
  //   const value: string = input.value.trim();
  //
  //   if (value) {
  //     this.addKeyword.emit(value);
  //
  //     this.setAddKeywordText('');
  //   }
  // }
  //
  // public onAddKeywordButtonClicked(): void {
  //   this.addKeyword.emit(this.newKeywordText);
  //
  //   this.setAddKeywordText('');
  // }
}
