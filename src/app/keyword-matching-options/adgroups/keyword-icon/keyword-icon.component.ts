import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { KeywordModifiers } from '../../keywords/keyword-modifier-enum';

@Component({
  selector: 'app-keyword-icon',
  templateUrl: './keyword-icon.component.html',
  styleUrls: ['./keyword-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KeywordIconComponent {
  public keywordModifiers = KeywordModifiers;

  @Input()
  public modifier: KeywordModifiers;

  @Output()
  public change: EventEmitter<KeywordModifiers> = new EventEmitter();

  public onModifierChanged(modifier: KeywordModifiers): void {
    this.change.emit(modifier);
  }
}
