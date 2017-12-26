import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { KeywordMatchingOptionsFacade } from '../ngrx/keyword-matching-options.facade';
import { KeywordModifiers } from '../keyword-modifier-enum';
import { KeywordParser } from '../keyword-parser';

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
  public id: string;

  @Input()
  public text: string;

  @Input()
  public modifier: KeywordModifiers;

  @Input()
  public selected: boolean;

  constructor(
    private keywordMatchingOptionsFacade: KeywordMatchingOptionsFacade
  ) {}

  public get hintText(): string {
    return KeywordParser.keywordToText({
      text: this.text,
      modifier: this.modifier,
      selected: this.selected
    });
  }

  public onEditKeywordText(text: string): void {
    this.keywordMatchingOptionsFacade.editKeywordText(this.id, text);
  }

  public onRemoveKeyword(): void {
    this.keywordMatchingOptionsFacade.removeKeyword(this.id);
  }

  public onToggleKeywordSelected(): void {
    this.keywordMatchingOptionsFacade.toggleKeywordSelected(this.id);
  }

  public onModifierChanged(modifier: KeywordModifiers): void {
    this.keywordMatchingOptionsFacade.editKeywordModifier(this.id, modifier);
  }
}
