import { IKeyword } from './keyword.interface';
import { KeywordModifiers } from './keyword-modifier-enum';

export class KeywordParser {
  public static keywordToText(keyword: IKeyword): string {
    switch (keyword.modifier) {
      case KeywordModifiers.BroadMatch:
        return keyword.text;
      case KeywordModifiers.Negative:
        return `-${keyword.text}`;
      case KeywordModifiers.PhraseMatch:
        return `"${keyword.text}"`;
      case KeywordModifiers.BroadMatchModifier:
        return `+${keyword.text}`;
      case KeywordModifiers.ExactMatch:
        return `[${keyword.text}]`;
    }
  }
}
