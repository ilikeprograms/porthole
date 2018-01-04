import { IKeyword } from './keywords/keyword.interface';
import { KeywordModifiers } from './keywords/keyword-modifier-enum';

export interface IParseKeywordTextModifier {
  text: string;
  modifier: KeywordModifiers;
}

export class KeywordParser {
  public static keywordToText(keyword: IKeyword): string {
    switch (keyword.modifier) {
      case KeywordModifiers.BroadMatch:
        return keyword.text;
      case KeywordModifiers.PhraseMatch:
        return `"${keyword.text}"`;
      case KeywordModifiers.BroadMatchModifier:
        return keyword.text.replace(/^|\s+/g, ` +`);
      case KeywordModifiers.ExactMatch:
        return `[${keyword.text}]`;
    }
  }

  public static textToKeywordTextAndModifier(keyword: string): IParseKeywordTextModifier {
    if (keyword.charAt(0) === '"' && keyword.charAt(keyword.length - 1) === '"') {
        return {
        text: keyword.slice(1, -1),
        modifier: KeywordModifiers.PhraseMatch
      };
    }

    if (keyword.match(/^(\+\w+\s*)+$/g) !== null) { // Broad match modifier
      return {
        text: keyword.replace(/\+/g, ''),
        modifier: KeywordModifiers.BroadMatchModifier
      };
    }

    if (keyword.charAt(0) === '[' && keyword.charAt(keyword.length - 1) === ']') {
      return {
        text: keyword.slice(1, -1),
        modifier: KeywordModifiers.ExactMatch
      };
    }

    return {
      text: keyword,
      modifier: KeywordModifiers.BroadMatch
    };
  }
}
