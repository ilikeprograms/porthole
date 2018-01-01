import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { KeywordModifiers } from '../../keyword-modifier-enum';

@Component({
  selector: 'app-add-keyword',
  templateUrl: './add-keyword.component.html',
  styles: [
    `
      .keyword-entry-container {
        display: flex;
        justify-content: space-between;
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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddKeywordComponent {
  public newKeywordText: string = '';

  @Input()
  public selectedMatchOption: KeywordModifiers;

  @Output()
  public selectedMatchOptionChanged: EventEmitter<KeywordModifiers> = new EventEmitter<KeywordModifiers>();

  @Output()
  public addKeyword: EventEmitter<string> = new EventEmitter<string>();

  public setAddKeywordText(text: string) {
    this.newKeywordText = text;
  }

  public onNewKeywordMatchOptionChanged(modifier: KeywordModifiers): void {
    this.selectedMatchOptionChanged.emit(modifier);
  }

  public onAddKeyword(event: KeyboardEvent): void {
    const input: HTMLInputElement = event.target as HTMLInputElement;
    const value: string = input.value.trim();

    if (value) {
      this.addKeyword.emit(value);

      this.setAddKeywordText('');
    }
  }

  public onAddKeywordButtonClicked(): void {
    this.addKeyword.emit(this.newKeywordText);

    this.setAddKeywordText('');
  }
}
