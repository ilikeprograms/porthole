import { Pipe, PipeTransform } from '@angular/core';
import { KeywordModifiers } from '../keyword-modifier-enum';

@Pipe({
  name: 'keywordModifier',
  pure: true
})
export class KeywordModifierPipe implements PipeTransform {
  public transform(modifier: KeywordModifiers): string {
    switch (modifier) {
      case KeywordModifiers.BroadMatch:
        return 'Broad Match';
      case KeywordModifiers.PhraseMatch:
        return 'Phrase Match';
      case KeywordModifiers.BroadMatchModifier:
        return 'Broad Match Modifier';
      case KeywordModifiers.ExactMatch:
        return 'Exact Match';
      case KeywordModifiers.NegativeMatch:
        return 'Negative Match';
    }
  }
}
