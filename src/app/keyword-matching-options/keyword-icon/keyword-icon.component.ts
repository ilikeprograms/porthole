import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { KeywordModifiers } from '../keyword-modifier-enum';

@Component({
  selector: 'app-keyword-icon',
  templateUrl: './keyword-icon.component.html',
  styleUrls: ['./keyword-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KeywordIconComponent {
  @Input()
  public modifier: KeywordModifiers;

  public keywordModifiers = KeywordModifiers;
}
