import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { KeywordModifiers } from '../../keywords/keyword-modifier-enum';
import { KeywordParser } from '../../keyword-parser';
import { IKeyword } from '../../keywords/keyword.interface';

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
      :host {
        display: block;
      }
      
      .keyword-card {
        margin-bottom: 10px;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // animations: [
  //   trigger('keywordAnimation', [
  //     transition(':enter', [
  //       style({ opacity: 0, transform: 'translateY(-50px)' }),
  //       animate('300ms ease-in', style({ opacity: 1, transform: 'none', offset: 1 }))
  //     ]),
  //     transition(':leave', [
  //       animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(-50px)', offset: 1 }))
  //     ])
  //   ])
  // ]
})
export class KeywordCardComponent {
  @Input()
  public keyword: IKeyword;

  @Input()
  public selected: boolean;

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