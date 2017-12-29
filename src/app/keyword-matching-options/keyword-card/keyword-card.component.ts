import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { KeywordModifiers } from '../keyword-modifier-enum';
import { KeywordParser } from '../keyword-parser';
import { IKeyword } from '../keyword.interface';

interface IEditKeywordOutput {
  id: string;
  text: string;
}

interface IEditKeywordModifierOutput {
  id: string;
  modifier: KeywordModifiers;
}

@Component({
  selector: 'app-keyword-card',
  templateUrl: './keyword-card.component.html',
  styles: [
    `
      .keyword-card {
        margin-bottom: 10px;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KeywordCardComponent {
  @Input()
  public keyword: IKeyword;

  @Output()
  public editKeywordText: EventEmitter<IEditKeywordOutput> = new EventEmitter<IEditKeywordOutput>();

  @Output()
  public removeKeyword: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public toggleKeywordSelected: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public editKeywordModifier: EventEmitter<IEditKeywordModifierOutput> = new EventEmitter<IEditKeywordModifierOutput>();

  public get hintText(): string {
    return KeywordParser.keywordToText(this.keyword);
  }

  public onEditKeywordText(text: string): void {
    this.editKeywordText.emit({ id: this.keyword.id, text: text });
  }

  public onRemoveKeyword(): void {
    this.removeKeyword.emit(this.keyword.id);
  }

  public onToggleKeywordSelected(): void {
    this.toggleKeywordSelected.emit(this.keyword.id);
  }

  public onModifierChanged(modifier: KeywordModifiers): void {
    this.editKeywordModifier.emit({ id: this.keyword.id, modifier: modifier });
  }
}
